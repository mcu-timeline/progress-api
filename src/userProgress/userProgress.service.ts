import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { MongoUserProgress, UserProgressDocument } from './userProgress.schema';
import { UpdateCurrentMovieInput, UpsertActiveTimelineInput, UserProgress } from '../graphql.schema';

@Injectable()
export class UsersProgressService {
  constructor(
    @InjectModel(MongoUserProgress.name)
    private userProgressModel: Model<UserProgressDocument>,
  ) {}

  async updateCurrentMovie(userId: string, updateCurrentMovieInput: UpdateCurrentMovieInput): Promise<UserProgress> {
    const { activeTimelineId, currentMovieId } = updateCurrentMovieInput;

    const userProgress = await this.userProgressModel.findOneAndUpdate(
      { userId },
      {
        $set: {
          [`progress.${activeTimelineId}`]: {
            timelineId: activeTimelineId,
            currentMovieId,
          }
        }
      },
      { new: true, upsert: true },
    );

    if (!userProgress) {
      throw new Error('User progress does not exits')
    }

    const movieProgress = userProgress.get('progress').get(userProgress.activeTimeline);
    const movieId = movieProgress ? movieProgress.currentMovieId : null;

    return {
      id: userProgress._id.toString(),
      userId: userProgress.userId,
      activeTimeline: userProgress.activeTimeline,
      currentMovieId: movieId,
    }
  }

  async upsertActiveTimeline(
    userId: string,
    upsertActiveTimelineInput: UpsertActiveTimelineInput,
  ): Promise<UserProgress> {
    const { activeTimelineId } = upsertActiveTimelineInput;

    const userProgress = await this.userProgressModel.findOneAndUpdate(
      { userId },
      {
        $set: {
          activeTimeline: activeTimelineId,
          progress: {}
        },
      },
      { new: true, upsert: true },
    );

    const movieProgress = userProgress.get('progress').get(activeTimelineId);
    const movieId = movieProgress ? movieProgress.currentMovieId : null;

    return {
      id: userProgress._id.toString(),
      activeTimeline: userProgress.activeTimeline,
      userId: userProgress.userId,
      currentMovieId: movieId,
    }
  }

  async getUserProgress(userId: string): Promise<UserProgress> {
    const userProgress = await this.userProgressModel.findOne({
      userId,
    });

    const movieProgress = userProgress.get('progress').get(userProgress.activeTimeline);
    const movieId = movieProgress ? movieProgress.currentMovieId : null;

    return {
      id: userProgress._id.toString(),
      userId: userProgress.userId,
      activeTimeline: userProgress.activeTimeline,
      currentMovieId: movieId,
    };
  }

  async deleteUserProgress(userId: string): Promise<string> {
    const result = await this.userProgressModel.findOneAndDelete({ userId });
    return result._id.toString();
  }
}
