import { Body, Controller, Get, Param, Post, UploadedFile, UseInterceptors, UsePipes, ValidationPipe } from '@nestjs/common';
import { ProductModule } from './product.module';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('product')
export class ProductController {
  constructor(
    private productService: ProductService
  ) { }

  // ====================================== create new ======================================
  @Post('/new')
  @UsePipes(ValidationPipe)
  @UseInterceptors(FileInterceptor('image'))
  async create(@Body() product: CreateProductDto, @UploadedFile() img: any) {
    return this.productService.create(product, img);
  }


  // ========================================= list =========================================
  @Get('/list')
  async list() {
    return this.productService.list();
  }


  // ========================================= get vie id =========================================
  @Get('/:id')
  async getById(@Param('id') id: any) {
    return this.productService.getById(id);
  }


  // ========================================= update by id =========================================
  @Post('/update/:id')
  @UseInterceptors(FileInterceptor('image'))
  async updateById(@Param('id') id: any, @Body() newProduct: UpdateProductDto, @UploadedFile() newImg?: any) {
    return this.productService.updateById(id, newProduct, newImg);
  }


  // ========================================= delete by id =========================================
  @Post('/delete/:id')
  async deleteById(@Param('id') id: any) {
    return this.productService.deleteById(id);
  }

  
  // ========================================= list prices =========================================
  @Get('/:productId/price')
  async getListPriceOfProduct(@Param('productId') productId: any) {
    return this.productService.listPrice(productId);
  }

}
