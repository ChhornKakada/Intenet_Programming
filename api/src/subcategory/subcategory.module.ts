import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { SubcategoryController } from './subcategory.controller';
import { SubcategoryService } from './subcategory.service';
import { MongooseModule } from '@nestjs/mongoose';
import { SubcategorySchema } from './schemas/subcategory.schema';
import { EnsureSignedInMiddleware } from 'src/auth/middlewares/ensure-signed-in.middleware';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Subcategory', schema: SubcategorySchema }])],
  controllers: [SubcategoryController],
  providers: [SubcategoryService]
})

// user middleware here
export class SubcategoryModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(EnsureSignedInMiddleware)
      .forRoutes(
        { path: "/subcategory/new", method: RequestMethod.POST },
        { path: "/subcategory/update/:id", method: RequestMethod.POST },
        { path: "/subcategory/delete/:id", method: RequestMethod.POST }
      )
  }
}
