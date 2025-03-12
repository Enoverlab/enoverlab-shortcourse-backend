import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Types } from 'mongoose';

// --------------------
// 📌 Author Schema
// --------------------
@Schema({ timestamps: true })
export class Author extends Document {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  image: string;
}

export const AuthorSchema = SchemaFactory.createForClass(Author);

// --------------------
// 📌 Blog Schema
// --------------------
@Schema({ timestamps: true })
export class Blog extends Document {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  content: string;

  @Prop({ required: true, maxlength: 100 })
  description: string;

  @Prop({ required: true })
  image: string;

  @Prop({ required: true, enum: ['Learning', 'Salary', 'Interview', 'Product', 'Job', 'Tech'] })
  tag: string;

  @Prop({ required: true, enum: ['Published', 'Pending'] })
  status: string;

  @Prop({ type: Types.ObjectId, ref: 'Author' })
  author: Author;
}

export const BlogSchema = SchemaFactory.createForClass(Blog);