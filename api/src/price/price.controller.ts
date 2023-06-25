import { Body, Controller, Get, Param, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { PriceService } from './price.service';
import { createPriceDto } from './dto/create-price.dto';
import { updatePriceDto } from './dto/update-price.dto';

@Controller('price')
export class PriceController {
  constructor(
    private priceService: PriceService
  ) { }

  // ====================================== create new ======================================
  @Post('/new')
  @UsePipes(ValidationPipe)
  async create(@Body() price: createPriceDto) {
    return this.priceService.addNew(price);
  }


  // ========================================= list by product Id =========================================
  @Get('/list')
  async list() {
    return this.priceService.listAll();
  }


  // ========================================= get vie id =========================================
  @Get('/:id')
  async getById(@Param('id') id: any) {
    return this.priceService.findById(id);
  }


  // ========================================= update by id =========================================
  @Post('/update/:id')
  async updateById(@Param('id') id: any, @Body() newPrice: updatePriceDto) {
    return this.priceService.updateById(id, newPrice);
  }


  // ========================================= delete by id =========================================
  @Post('/delete/:id')
  async deleteById(@Param('id') id: any) {
    return this.priceService.deleteById(id);
  }
}
