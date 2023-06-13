import { Body, Controller, Get, Param, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { ProductModule } from './product.module';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Controller('product')
export class ProductController {
  constructor(
    private productService: ProductService
  ) { }

  // ====================================== create new ======================================
  @Post('/new')
  @UsePipes(ValidationPipe)
  async create(@Body() product: CreateProductDto) {
    return this.productService.create(product);
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
  async updateById(@Param('id') id: any, @Body() newProduct: UpdateProductDto) {
    return this.productService.updateById(id, newProduct);
  }


  // ========================================= delete by id =========================================
  @Post('/delete/:id')
  async deleteById(@Param('id') id: any) {
    return this.productService.deleteById(id);
  }

}
