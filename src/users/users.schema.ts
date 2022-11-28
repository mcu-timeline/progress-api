import * as mongoose from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<MongoUser>;

@Schema({ collection: 'users' })
export class MongoUser {
  @Prop({ type: mongoose.Schema.Types.String, required: true, unique: true })
  email: string;


}

export const UserSchema = SchemaFactory.createForClass(MongoUser);
