
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, SchemaTypes, Types } from 'mongoose';
import { Category } from 'src/category/schemas/category.schema';
import { Subcategory } from 'src/subcategory/schemas/subcategory.schema';

@Schema({
  timestamps: true
})
export class Product {
  @Prop({ required: true })
  name: string

  @Prop()
  description: string;

  @Prop()
  imgUrl: string;

  @Prop({ type: SchemaTypes.ObjectId, ref: Subcategory.name })
  subctgId: Types.ObjectId;

  @Prop({ type: SchemaTypes.ObjectId, ref: Category.name })
  categoryId: Types.ObjectId;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
