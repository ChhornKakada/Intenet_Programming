// subcategory.model.ts

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { SchemaTypes, Types } from 'mongoose';
import { Category } from 'src/category/schemas/category.schema';

@Schema({
  timestamps: true
})
export class Subcategory {
  @Prop({ required: true })
  name: string;

  @Prop()
  description: string;

  @Prop()
  imgUrl: string

  @Prop({ type: SchemaTypes.ObjectId, ref: Category.name, require: true })
  categoryId: Types.ObjectId;

}

export const SubcategorySchema = SchemaFactory.createForClass(Subcategory);
