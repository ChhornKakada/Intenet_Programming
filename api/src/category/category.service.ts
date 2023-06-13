import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Category } from './schemas/category.schema';
import { ObjectId, Types } from 'mongoose';
import { Model } from 'mongoose';
import { CreateCategroyDto } from './dto/create-category.dto';
import { UpdateCategroyDto } from './dto/update-category.dto';

@Injectable()
export class CategoryService {

  constructor(
    @InjectModel(Category.name)
    private categroyModel: Model<Category>,
  ) { }


  // =================================== create new categroy  ===================================
  async create(category: CreateCategroyDto): Promise<{ data?: Category, status?: boolean, error?: any }> {
    try {
      const { name, description } = category;
      const newCtg = await this.categroyModel.create({
        name, description
      });
      return {
        status: true,
        data: newCtg
      }
    } catch (error) {
      return {
        status: false,
        error: error
      }
    }
  }


  // ==================================== list all categories ====================================
  async list(): Promise<{ data?: any, status?: boolean, error?: any }> {
    try {
      const ctgs = await this.categroyModel.find().exec();
      return {
        status: true,
        data: ctgs
      }
    } catch (error) {
      return {
        status: false,
        error: error
      }
    }
  }


  // ==================================== get by id ====================================
  async getById(ctgId: string):
    Promise<{ data?: any, status?: boolean, error?: any, message?: string }> {
    try {
      const ctg = await this.categroyModel.findById(ctgId);
      if (!ctg) {
        return {
          status: false,
          message: 'Categroy with this ID is not found.'
        }
      }
      return {
        status: true,
        data: ctg
      }
    } catch (error) {
      return {
        status: false,
        error: error
      }
    }
  }


  // ==================================== update by id ====================================
  async updateById(ctgId: string, newCtg: UpdateCategroyDto):
    Promise<{ data?: any, status?: boolean, error?: any, message?: string }> {
    try {
      const { name, description } = newCtg;
      const updateCtg = await this.categroyModel.findByIdAndUpdate(
        ctgId, { name, description }, { new: true });

      if (!updateCtg) {
        return {
          status: false,
          message: 'Categroy with this ID is not found.'
        }
      }
      return {
        status: true,
        message: 'Updated successfully!',
        data: updateCtg
      }
    } catch (error) {
      return {
        status: false,
        error: error
      }
    }
  }


  // ==================================== delete by id ====================================
  async deleteById(ctgId: string):
    Promise<{ data?: any, status?: boolean, error?: any, message?: string }> {
    try {
      const deletedCtg = await this.categroyModel.findByIdAndDelete(ctgId);

      if (!deletedCtg) {
        return {
          status: false,
          message: 'Categroy with this ID is not found.'
        }
      }
      return {
        status: true,
        message: 'Deleted successfully!',
        data: deletedCtg
      }
    } catch (error) {
      return {
        status: false,
        error: error
      }
    }
  }


  // ==================================== show all subcategory ====================================
  async listSubcategories(categoryId: string) {
    try {
      const subctgs = await this.categroyModel.aggregate([
        {
          $match: { _id: new Types.ObjectId(categoryId) },
        },
        {
          $lookup: {
            from: "subcategories" ,
            localField: "_id",
            foreignField: "categoryId",
            as: "items"
          }
        },
        {
          $project: {
            _id: 1,
            name: 1,
            description: 1,
            items: {
              _id: 1,
              name: 1,
              description: 1,
            }
            
          }
        }
      ])
      return {
        status: true,
        data: subctgs
      }
    } catch (error) {
      return {
        status: false,
        error: error
      }
    }
  }


}
