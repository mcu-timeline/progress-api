
import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { MongoUserProgress, UserProgressDocument } from './userProgress.schema';
import { UpsertUserProgressInput, UserProgress } from '../graphql.schema'

@Injectable()
export class UsersProgressService {
  constructor(@InjectModel(MongoUserProgress.name) private userProgressModel: Model<UserProgressDocument>) {}

  async upsertUserProgress(upsertUserProgressInput: UpsertUserProgressInput): Promise<UserProgress> {
    const { userId, timelineId, lastWatched, activeTimeline } = upsertUserProgressInput;
    const existingUserProgress = await this.userProgressModel.findOne({ userId }).exec();

    const existingProgressKeys = existingUserProgress.get('progress').keys()
    let oldProgress = {};

    for (const key of existingProgressKeys) {
      oldProgress = {
        ...oldProgress,
        [key]: existingUserProgress.get('progress').get(key),
      }
    }

    const newProgress = {
      ...oldProgress,
      [timelineId]: {
        lastWatched,
        timelineId
      }
    }

    await this.userProgressModel.updateOne(
      { userId },
      {
        activeTimeline,
        progress: newProgress,
      },
      { upsert: true }
    );

    const newUserProgress = await this.userProgressModel.findOne({ userId }).exec();
    const progressForGivenTimeline = newUserProgress.get('progress').get(newUserProgress.activeTimeline);

    if (!progressForGivenTimeline) {
      throw new Error("Progress for given timeline does not exist")
    }

    return {
      id: newUserProgress._id.toString(),
      userId: newUserProgress.userId,
      activeTimeline: newUserProgress.activeTimeline,
      progress: {
        ...progressForGivenTimeline
      }
    }
  }

  async getUserProgress(userId: string): Promise<UserProgress> {
    const mongoUserProgress = await this.userProgressModel.findOne({ userID: userId });

    const progressForGivenTimeline = mongoUserProgress.progress[mongoUserProgress.activeTimeline];

    return {
      id: mongoUserProgress._id.toString(),
      userId: mongoUserProgress.userId,
      activeTimeline: mongoUserProgress.activeTimeline,
      progress: {
        ...progressForGivenTimeline
      }
    }
  }
}


