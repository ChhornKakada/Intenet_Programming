import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Subcategory } from './schemas/subcategory.schema';
import { Model, Types } from 'mongoose';
import { CreateSubCtgDto } from './dto/create-subctg.dto';
import { UpdateSubCtgDto } from './dto/update-subctg.dto';

@Injectable()
export class SubcategoryService {

  constructor(
    @InjectModel(Subcategory.name)
    private subcategoryModel: Model<Subcategory>
  ) { }


  // ========================================= create =========================================
  async create(subCtg: CreateSubCtgDto): Promise<{ data?: Subcategory, status?: boolean, error?: any }> {
    try {
      const newSubCtg = await this.subcategoryModel.create(subCtg);
      return {
        status: true,
        data: newSubCtg
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
      const subCtgs = await this.subcategoryModel.find().exec();
      return {
        status: true,
        data: subCtgs
      }
    } catch (error) {
      return {
        status: false,
        error: error
      }
    }
  }

  // ==================================== get by id ====================================
  async getById(subCtgId: string):
    Promise<{ data?: any, status?: boolean, error?: any, message?: string }> {
    try {
      const subCtg = await this.subcategoryModel.findById(subCtgId);
      if (!subCtg) {
        return {
          status: false,
          message: 'Subcategory with this ID is not found.'
        }
      }
      return {
        status: true,
        data: subCtg
      }
    } catch (error) {
      return {
        status: false,
        error: error
      }
    }
  }


  // ==================================== update by id ====================================
  async updateById(subCtgId: string, newSubctg: UpdateSubCtgDto):
    Promise<{ data?: any, status?: boolean, error?: any, message?: string }> {
    try {
      const updateSubctg = await this.subcategoryModel.findByIdAndUpdate(
        subCtgId, newSubctg, { new: true });

      if (!updateSubctg) {
        return {
          status: false,
          message: 'Subcategory with this ID is not found.'
        }
      }
      return {
        status: true,
        message: 'Updated successfully!',
        data: updateSubctg
      }
    } catch (error) {
      return {
        status: false,
        error: error
      }
    }
  }


  // ==================================== delete by id ====================================
  async deleteById(subctgId: string):
    Promise<{ data?: any, status?: boolean, error?: any, message?: string }> {
    try {
      const deletedSubCtg = await this.subcategoryModel.findByIdAndDelete(subctgId);

      if (!deletedSubCtg) {
        return {
          status: false,
          message: 'Subcategroy with this ID is not found.'
        }
      }
      return {
        status: true,
        message: 'Deleted successfully!',
        data: deletedSubCtg
      }
    } catch (error) {
      return {
        status: false,
        error: error
      }
    }
  }


  // ==================================== show all products ====================================
  async listProducts(subctgId: string) {
    try {
      const products = await this.subcategoryModel.aggregate([
        {
          $match: { _id: new Types.ObjectId(subctgId) },
        },
        {
          $lookup: {
            from: "products",
            localField: "_id",
            foreignField: "subctgId",
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
              imgUrl: 1
            }

          }
        }
      ])
      return {
        status: true,
        data: products
      }
    } catch (error) {
      return {
        status: false,
        error: error
      }
    }
  }
}
