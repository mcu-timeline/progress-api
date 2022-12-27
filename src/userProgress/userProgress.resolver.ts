import {
  Args,
  Mutation,
  Query,
  Resolver,
  ResolveReference,
  Context,
} from '@nestjs/graphql';

import { UsersProgressService } from './userProgress.service';
import { UpsertUserProgressInput, UserProgress } from '../graphql.schema';
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

  @Mutation('upsertUserProgress')
  async upsertUserProgress(
    @Args('upsertUserProgressInput')
    upsertUserProgressInput: UpsertUserProgressInput,
    @Context('userId') userId: string,
  ): Promise<UserProgress> {
    return this.usersProgressService.upsertUserProgress(
      userId,
      upsertUserProgressInput,
    );
  }

  @ResolveReference()
  resolveUpsertUserProgress(
    reference: {
      __typename: string;
      upsertProgressInput: UpsertUserProgressInput;
    },
    context: AuthContext,
  ) {
    return this.usersProgressService.upsertUserProgress(
      context.userId,
      reference.upsertProgressInput,
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
