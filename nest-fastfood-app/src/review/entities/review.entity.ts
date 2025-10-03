import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Menu } from 'src/menu/entities/menu.entity';

@Schema({ timestamps: true })
export class Review extends Document {
  @Prop({ required: true })
  userId: string;
  @Prop({ type: Types.ObjectId, ref: Menu.name, required: true })
  item: Types.ObjectId;
  @Prop({ required: true })
  rating: number;
  @Prop({ required: true })
  comment: string;
}

export const ReviewSchema = SchemaFactory.createForClass(Review);
