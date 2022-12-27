import {
  Args,
  Mutation,
  Query,
  Resolver,
  ResolveReference,
  Context,
} from '@nestjs/graphql';

import { UsersProgressService } from './userProgress.service';
import { UpsertActiveTimelineInput, UpdateCurrentMovieInput , UserProgress } from '../graphql.schema';
import { AuthContext } from '../auth.types';

@Resolver('users')
export class UserProgressResolver {
  constructor(private readonly usersProgressService: UsersProgressService) {}

  @Query('getUserProgress')
  async getUserProgress(
    @Context('userId') userId: string,
  ): Promise<UserProgress> {
    return this.usersProgressService.getUserProgress(userId);
  }

  @ResolveReference()
  resolveGetUserProgressReference(
    _: {
      __typename: string;
    },
    context: AuthContext,
  ) {
    return this.usersProgressService.getUserProgress(context.userId);
  }

  @Mutation('upsertActiveTimeline')
  async upsertActiveTimeline(
    @Args('upsertActiveTimelineInput')
      upsertActiveTimelineInput: UpsertActiveTimelineInput,
    @Context('userId') userId: string,
  ): Promise<UserProgress> {
    return this.usersProgressService.upsertActiveTimeline(
      userId,
      upsertActiveTimelineInput,
    );
  }

  @ResolveReference()
  resolveUpsertActiveTimeline(
    reference: {
      __typename: string;
      upsertActiveTimelineInput: UpsertActiveTimelineInput;
    },
    context: AuthContext,
  ) {
    return this.usersProgressService.upsertActiveTimeline(
      context.userId,
      reference.upsertActiveTimelineInput,
    );
  }

  @Mutation('updateCurrentMovie')
  async updateCurrentMovie(
    @Args('updateCurrentMovieInput')
      updateCurrentMovieInput: UpdateCurrentMovieInput,
    @Context('userId') userId: string,
  ): Promise<UserProgress> {
    return this.usersProgressService.updateCurrentMovie(
      userId,
      updateCurrentMovieInput,
    );
  }

  @ResolveReference()
  resolveUpdateCurrentMovie(
    reference: {
      __typename: string;
      updateCurrentMovieInput: UpdateCurrentMovieInput;
    },
    context: AuthContext,
  ) {
    return this.usersProgressService.updateCurrentMovie(
      context.userId,
      reference.updateCurrentMovieInput,
    );
  }

  @Mutation('deleteUserProgress')
  async deleteUserProgress(
    @Context('userId')
    userId: string,
  ): Promise<string> {
    return this.usersProgressService.deleteUserProgress(userId);
  }

  @ResolveReference()
  resolveDeleteUserProgress(_: { __typename: string }, context: AuthContext) {
    return this.usersProgressService.deleteUserProgress(context.userId);
  }
}
