import { Injectable } from '@nestjs/common';
import { Product } from './schemas/product.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { FileMngService } from 'src/file-mng/file-mng.service';
import { time } from 'console';

@Injectable()
export class ProductService {

  constructor(
    @InjectModel(Product.name)
    private productModel: Model<Product>,

    private fileMng: FileMngService
  ) { }


  // ========================================= create =========================================
  async create(product: CreateProductDto, imgFile?: any): Promise<{ data?: Product, status?: boolean, error?: any }> {
    try {

      const imgPath = this.fileMng.saveImage(imgFile, './src/img/products');

      const { name, description, categoryId, subctgId } = product;
      const newProduct = await this.productModel.create({
        name, description, categoryId, subctgId, imgUrl: imgPath
      });
      return {
        status: true,
        data: newProduct
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
      const products = await this.productModel.find().exec();
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


  // ==================================== get by id ====================================
  async getById(productId: string):
    Promise<{ data?: any, status?: boolean, error?: any, message?: string }> {
    try {
      const product = await this.productModel.findById(productId);
      if (!product) {
        return {
          status: false,
          message: 'Product with this ID is not found.'
        }
      }
      return {
        status: true,
        data: product
      }
    } catch (error) {
      return {
        status: false,
        error: error
      }
    }
  }


  // ==================================== update by id ====================================
  async updateById(productId: string, newProduct: UpdateProductDto, newImg?: any):
    Promise<{ data?: any, status?: boolean, error?: any, message?: string }> {
    try {

      const existedProduct = await this.productModel.findById(productId);
      if (!existedProduct) {
        return {
          status: false,
          message: 'Product with this ID is not found.'
        }
      }

      // save new image
      let newImgPath: string;
      if (newImg) {
        newImgPath = this.fileMng.saveImage(newImg, './src/img/products');
      }

      // delete old image
      if (existedProduct.imgUrl) {
        this.fileMng.deleteFile(existedProduct.imgUrl);
      }

      const { name, description, categoryId, subctgId } = newProduct;

      const updatedProduct = await this.productModel.findByIdAndUpdate(
        productId, {
          name, description, categoryId, subctgId, imgUrl: newImgPath
        }, { new: true });

      return {
        status: true,
        message: 'Updated successfully!',
        data: updatedProduct
      }
    } catch (error) {
      return {
        status: false,
        error: error
      }
    }
  }


    // ==================================== delete by id ====================================
    async deleteById(productId: string):
    Promise<{ data?: any, status?: boolean, error?: any, message?: string }> {
    try {
      const deletedProduct = await this.productModel.findByIdAndDelete(productId);

      if (!deletedProduct) {
        return {
          status: false,
          message: 'Product with this ID is not found.'
        }
      }

      // delete img from storage
      this.fileMng.deleteFile(deletedProduct.imgUrl);

      return {
        status: true,
        message: 'Deleted successfully!',
        data: deletedProduct
      }
    } catch (error) {
      return {
        status: false,
        error: error
      }
    }
  }


  // ====================================
  async listPrice(productId: string) {
    try {
      const productPrices = await this.productModel.aggregate([
        {
          $match: { _id: new Types.ObjectId(productId) },
          // if you didn't add this, it will match all those 2 table and retrun as array
        },
        {
          $lookup: {
            from: "prices",
            localField: "_id",
            foreignField: "productId",
            as: "prices"
          }
        },
        {
          $project: {
            _id: 1,
            name: 1,
            description: 1,
            imgUrl: 1,
            subctgId: 1,
            categoryId: 1,
            prices: {
              _id: 1,
              price: 1,
              store: 1
            }

          }
        }
      ])
      return {
        status: true,
        data: productPrices
      }
    } catch (error) {
      return {
        status: false,
        error: error
      }
    }
  }


}
