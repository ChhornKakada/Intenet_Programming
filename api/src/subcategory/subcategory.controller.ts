import { Body, Controller, Get, Param, Post, UploadedFile, UseInterceptors, UsePipes, ValidationPipe } from '@nestjs/common';
import { SubcategoryService } from './subcategory.service';
import { CreateSubCtgDto } from './dto/create-subctg.dto';
import { UpdateSubCtgDto } from './dto/update-subctg.dto';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('subcategory')
export class SubcategoryController {

  constructor(
    private subCtgService: SubcategoryService
  ) { }

  // ====================================== create new ======================================
  @Post('/new')
  @UsePipes(ValidationPipe)
  @UseInterceptors(FileInterceptor('image'))
  async create(@Body() subCtg: CreateSubCtgDto, @UploadedFile() imgFile: any) {
    return this.subCtgService.create(subCtg, imgFile);
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
  @UseInterceptors(FileInterceptor('image'))
  async updateById(@Param('id') id: any, @Body() newSubctg: UpdateSubCtgDto, @UploadedFile() newImgFile: any) {
    return this.subCtgService.updateById(id, newSubctg, newImgFile);
  }


  // ========================================= delete by id =========================================
  @Post('/delete/:id')
  async deleteById(@Param('id') id: any) {
    return this.subCtgService.deleteById(id);
  }
}
