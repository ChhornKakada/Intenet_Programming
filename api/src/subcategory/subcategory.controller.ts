import { Body, Controller, Get, Param, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { SubcategoryService } from './subcategory.service';
import { CreateSubCtgDto } from './dto/create-subctg.dto';
import { UpdateSubCtgDto } from './dto/update-subctg.dto';

@Controller('subcategory')
export class SubcategoryController {

  constructor(
    private subCtgService: SubcategoryService
  ) { }

  // ====================================== create new ======================================
  @Post('/new')
  @UsePipes(ValidationPipe)
  async create(@Body() subCtg: CreateSubCtgDto) {
    return this.subCtgService.create(subCtg);
  }


  // ========================================= list =========================================
  @Get('/list')
  async list() {
    return this.subCtgService.list();
  }


  // ========================================= list =========================================
  @Get('/product/list/:ctgId')
  async listAllSubcategories(@Param('ctgId') subctgId: any) {
    return this.subCtgService.listProducts(subctgId);
  }


  // ========================================= get vie id =========================================
  @Get('/:id')
  async getById(@Param('id') id: any) {
    return this.subCtgService.getById(id);
  }


  // ========================================= update by id =========================================
  @Post('/update/:id')
  async updateById(@Param('id') id: any, @Body() newSubctg: UpdateSubCtgDto) {
    return this.subCtgService.updateById(id, newSubctg);
  }


  // ========================================= delete by id =========================================
  @Post('/delete/:id')
  async deleteById(@Param('id') id: any) {
    return this.subCtgService.deleteById(id);
  }
}
