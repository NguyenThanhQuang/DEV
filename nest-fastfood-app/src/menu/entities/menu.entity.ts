import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({optimisticConcurrency:true})
export class Menu extends Document {
  @Prop({ required: true })
  name: string;
  @Prop({ required: true })
  price: number;
  @Prop({ type: Types.ObjectId, ref: 'Category' })
  category: Types.ObjectId;
}

export const MenuSchema = SchemaFactory.createForClass(Menu);
