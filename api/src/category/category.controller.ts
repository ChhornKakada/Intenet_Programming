import { Body, Controller, Get, HttpStatus, Param, Post, Res, UploadedFile, UseInterceptors, UsePipes, ValidationPipe } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategroyDto } from './dto/create-category.dto';
import { UpdateCategroyDto } from './dto/update-category.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import * as path from 'path';
// import path, { extname, join } from 'path';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { FileMngService } from 'src/file-mng/file-mng.service';

@Controller('category')
export class CategoryController {

  constructor(
    private ctgService: CategoryService,
    private fileMng: FileMngService
  ) { }


  // ========================================= create category =========================================
  @Post('/new')
  @UseInterceptors(FileInterceptor('image'))
  @UsePipes(ValidationPipe)
  async create(@Body() ctg: CreateCategroyDto, @UploadedFile() file: any) {
    return this.ctgService.create(ctg, file);
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
  @UseInterceptors(FileInterceptor('image'))
  async updateById(@Param('id') id: any, @Body() newCtg: UpdateCategroyDto, @UploadedFile() newImgFile: any) {
    return this.ctgService.updateById(id, newCtg, newImgFile);
  }


  // ========================================= delete by id =========================================
  @Post('/delete/:id')
  async deleteById(@Param('id') id: any) {
    return this.ctgService.deleteById(id);
  }

  // @Post('/deleteFile')
  // async deleteFIle() {
  //   return this.fileMng.deleteFile('./src/img/categories/wallpaper_1688451712524.png');
  // }

  // @Post('/replaceFile')
  // @UseInterceptors(FileInterceptor('image'))
  // async replaceFile(@UploadedFile() file: any) {
  //   return this.fileMng.replaceFile('./src/img/categories/code_1688388245967.png', file, './src/img/categories');
  // }

  // ======================================== upload file ========================================
  // @Post('/uploadFile')
  // @UseInterceptors(FileInterceptor('image', {
  //   storage: diskStorage({
  //     destination: './src/img/categories',
  //     filename: (req, file, callBack) => {
  //       const fileName = path.parse(file.originalname).name.replace(/\s/g, '/') + Date.now();
  //       const extension = extname(file.originalname);
  //       callBack(null, `${fileName}${extension}`);
  //     }
  //   })
  // }))
  // uploadFile(@Res() res, @UploadedFile() file) {
  //   return res.status(HttpStatus.OK).json({
  //     success: true,
  //     data: file.path.replace(/\\/g, '/')
  //   });
  // }
  // ===============================================================================================


  // @Post('/uploadFile')
  // @UseInterceptors(FileInterceptor('image'))
  // register(@UploadedFile() file: any) {
  //   return this.fileMng.SaveImage(file, './src/img/categories')
  // }

}

