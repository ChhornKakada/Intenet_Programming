import { Injectable } from '@nestjs/common';
import { Product } from './schemas/product.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductService {

  constructor(
    @InjectModel(Product.name)
    private productModel: Model<Product>
  ) { }


  // ========================================= create =========================================
  async create(product: CreateProductDto): Promise<{ data?: Product, status?: boolean, error?: any }> {
    try {
      const newProduct = await this.productModel.create(product);
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
  async updateById(productId: string, newProduct: UpdateProductDto):
    Promise<{ data?: any, status?: boolean, error?: any, message?: string }> {
    try {
      const updatedProduct = await this.productModel.findByIdAndUpdate(
        productId, newProduct, { new: true });

      if (!updatedProduct) {
        return {
          status: false,
          message: 'Product with this ID is not found.'
        }
      }
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


}
