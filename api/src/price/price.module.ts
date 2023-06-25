import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { PriceController } from './price.controller';
import { PriceService } from './price.service';
import { PriceSchema } from './schemas/price.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { EnsureSignedInMiddleware } from 'src/auth/middlewares/ensure-signed-in.middleware';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Price', schema: PriceSchema}])],
  controllers: [PriceController],
  providers: [PriceService]
})

// uses middleware here
export class PriceModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
      consumer
        .apply(EnsureSignedInMiddleware)
        .forRoutes(
          {path: "price/new", method: RequestMethod.POST},
          {path: "price/delete/:id", method: RequestMethod.POST},
          {path: "price/update/:id", method: RequestMethod.POST}
        )
  }
}
