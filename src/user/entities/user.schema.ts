import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Exclude } from 'class-transformer';
import { HydratedDocument } from 'mongoose';

export type UserType = HydratedDocument<User>;

@Schema({ timestamps: true, collection: 'users' })
export class User {
  @Prop({ type: String })
  fullName: string;

  @Prop({ type: String, unique: true })
  email: string;

  @Prop({ type: String })
  @Exclude()
  password: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
