import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { ProductSchema } from './schemas/product.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { EnsureSignedInMiddleware } from 'src/auth/middlewares/ensure-signed-in.middleware';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Product', schema: ProductSchema}])],
  controllers: [ProductController],
  providers: [ProductService]
})


// uses middleware here
export class ProductModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
      consumer
        .apply(EnsureSignedInMiddleware)
        .forRoutes(
          {path: "product/new", method: RequestMethod.POST},
          {path: "product/delete/:id", method: RequestMethod.POST},
          {path: "product/update/:id", method: RequestMethod.POST}
        )
  }
}
