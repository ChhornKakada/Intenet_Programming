import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { CategoryModule } from './category/category.module';
import { SubcategoryModule } from './subcategory/subcategory.module';
import { ProductModule } from './product/product.module';
import { PriceModule } from './price/price.module';
import { FileMngService } from './file-mng/file-mng.service';
import { FileMngModule } from './file-mng/file-mng.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true
    }),
    MongooseModule.forRoot(process.env.DB_URI),
    AuthModule,
    CategoryModule,
    SubcategoryModule,
    ProductModule,
    PriceModule,
    FileMngModule
  ],
  controllers: [AppController],
  providers: [AppService, FileMngService],
})

export class AppModule {}