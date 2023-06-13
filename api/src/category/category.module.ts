import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { CategoryController } from './category.controller';
import { CategoryService } from './category.service';
import { CategorySchema } from './schemas/category.schema';
import { MongooseModule } from '@nestjs/mongoose'
import { EnsureSignedInMiddleware } from 'src/auth/middlewares/ensure-signed-in.middleware';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Category', schema: CategorySchema }])],
  controllers: [CategoryController],
  providers: [CategoryService]
})
export class CategoryModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(EnsureSignedInMiddleware)
      .forRoutes(
        { path: 'category/new', method: RequestMethod.POST },
        { path: 'category/delete/:id', method: RequestMethod.POST },
        { path: 'category/update/:id', method: RequestMethod.POST }
      );
  }
}
