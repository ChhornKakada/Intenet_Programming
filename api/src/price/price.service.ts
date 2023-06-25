import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { createPriceDto } from './dto/create-price.dto';
import { Price } from './schemas/price.schema';
import { updatePriceDto } from './dto/update-price.dto';

@Injectable()
export class PriceService {

  constructor(
    @InjectModel(Price.name)
    private priceModel: Model<Price>
  ) {}

  // ========================================= add a price to a product =========================================
  async addNew(price: createPriceDto): Promise<{}> {
    try {
      const newPrice = await this.priceModel.create(price);
      return {
        status: true,
        data: newPrice
      }
    } catch (error) {
      return {
        status: false,
        error: error
      }
    }
  }


  // ========================================= list by productID =========================================
  async listAll(): Promise<{}> {
    try {
      const prictList = await this.priceModel.find().exec();
      return {
        status: true,
        data: prictList
      }
    } catch (error) {
      return {
        status: false,
        error: error
      }
    }
  }


  // ========================================= delete by Id =========================================
  async deleteById(priceId: string): Promise<{}> {
    try {
      const priceDeleted = await this.priceModel.findByIdAndDelete(priceId);
      if (!priceDeleted) {
        throw new HttpException('Price not found', HttpStatus.NOT_FOUND);
      }
      return {
        status: true,
        message: "The price of this Id was deleted successfully!",
        data: priceDeleted

      }
    } catch (error) {
      return {
        status: false,
        error: error
      }
    }
  }


  // ========================================= update by id =========================================
  async updateById(priceId: string, newPrice: updatePriceDto): Promise <{}> {
    try {
      const priceUpdated = await this.priceModel.findByIdAndUpdate(
        priceId, newPrice, {new: true}
      );
      if (!priceUpdated) {
        throw new HttpException('Product not found', HttpStatus.NOT_FOUND);
      }
      return {
        status: true,
        message: "Price updated successfully!",
        data: priceUpdated
      }
    } catch (error) {
      return {
        status: false,
        error: error
      }
    }
  }

  // ========================================= find by ID =========================================
  async findById(priceId: string ): Promise <{}> {
    try {
      const price = await this.priceModel.findById(priceId);
      if (!price) {
        throw new HttpException('Product not found', HttpStatus.NOT_FOUND);
      }
      return {
        status: true,
        data: price
      }
    } catch (error) {
      return {
        status: false,
        error: error
      }
    }
  }

}
