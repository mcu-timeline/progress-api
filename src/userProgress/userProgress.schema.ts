import * as mongoose from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserProgressDocument = HydratedDocument<MongoUserProgress>;

@Schema({ collection: 'user_progress' })
export class MongoUserProgress {
  @Prop({ type: mongoose.Schema.Types.String, required: true, unique: true })
  userId: string;

  @Prop({ type: mongoose.Schema.Types.String, required: true })
  activeTimeline: string;

  @Prop({ type: mongoose.Schema.Types.Map })
  progress: {
    [timelineID in string]: {
      timelineId: string;
      currentMovieId: string;
    };
  };
}

export const UserProgressSchema =
  SchemaFactory.createForClass(MongoUserProgress);
