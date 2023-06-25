
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, SchemaTypes, Types } from 'mongoose';
import { Category } from 'src/category/schemas/category.schema';
import { Product } from 'src/product/schemas/product.schema';

@Schema({
  timestamps: true
})
export class Price {

  @Prop({ required: true})
  price: number;

  @Prop({ required: true})
  store: string;

  @Prop({ type: SchemaTypes.ObjectId, ref: Product.name })
  productId: Types.ObjectId;

}

export const PriceSchema = SchemaFactory.createForClass(Price);
