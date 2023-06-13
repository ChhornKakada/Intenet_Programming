import { Body, Controller, Get, Param, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategroyDto } from './dto/create-category.dto';
import { UpdateCategroyDto } from './dto/update-category.dto';

@Controller('category')
export class CategoryController {

  constructor(
    private ctgService: CategoryService
  ) { }


  // ========================================= create category =========================================
  @Post('/new')
  @UsePipes(ValidationPipe)
  async create(@Body() ctg: CreateCategroyDto) {
    return this.ctgService.create(ctg);
  }


  // ========================================= list =========================================
  @Get('/list')
  async list() {
    return this.ctgService.list();
  }


  // ========================================= list =========================================
  @Get('/subcategory/list/:ctgId')
  async listAllSubcategories(@Param('ctgId') ctgId: any) {
    return this.ctgService.listSubcategories(ctgId);
  }


  // ========================================= get vie id =========================================
  @Get('/:id')
  async getById(@Param('id') id: any) {
    return this.ctgService.getById(id);
  }


  // ========================================= update by id =========================================
  @Post('/update/:id')
  async updateById(@Param('id') id: any, @Body() newCtg: UpdateCategroyDto) {
    return this.ctgService.updateById(id, newCtg);
  }

  
  // ========================================= delete by id =========================================
  @Post('/delete/:id')
  async deleteById(@Param('id') id: any) {
    return this.ctgService.deleteById(id);
  }

}
