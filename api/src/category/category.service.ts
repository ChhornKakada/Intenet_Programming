import { Injectable, UploadedFile } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Category } from './schemas/category.schema';
import { ObjectId, Types } from 'mongoose';
import { Model } from 'mongoose';
import { CreateCategroyDto } from './dto/create-category.dto';
import { UpdateCategroyDto } from './dto/update-category.dto';
import { FileMngService } from 'src/file-mng/file-mng.service';

@Injectable()
export class CategoryService {

  constructor(
    @InjectModel(Category.name)
    private categroyModel: Model<Category>,

    private fileMng: FileMngService
  ) { }


  // =================================== create new categroy  ===================================
  async create(category: CreateCategroyDto, img?: any): Promise<{ data?: Category, status?: boolean, error?: any }> {
    try {
      const { name, description } = category;
      let newCtg: any;
      if (img) {
        const imgPath = this.fileMng.saveImage(img, './src/img/categories');
        newCtg = await this.categroyModel.create({
          name, description, imgUrl: imgPath
        });
      } else {
        newCtg = await this.categroyModel.create({
          name, description
        });
      }

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
  async updateById(ctgId: string, newCtg: UpdateCategroyDto, newImg?: any):
    Promise<{ data?: any, status?: boolean, error?: any, message?: string }> {
    try {
      const existedCtg = await this.categroyModel.findById(ctgId);
      if (!existedCtg) {
        return {
          status: false,
          message: 'Categroy with this ID is not found.'
        }
      }

      // delete file 
      if (!existedCtg.imgUrl) {
        this.fileMng.deleteFile(existedCtg.imgUrl)
      }

      // save new img
      let newImgPath: string;
      if (newImg) {
        newImgPath = this.fileMng.saveImage(newImg, './src/img/categories');
      }

      const { name, description } = newCtg;
      const updateCtg = await this.categroyModel.findByIdAndUpdate(
        ctgId, { name, description, newImgPath }, { new: true });

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

      // delete file in storage
      this.fileMng.deleteFile(deletedCtg.imgUrl);

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
            from: "subcategories",
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
