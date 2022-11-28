import { Args, Mutation, Query, Resolver, ResolveReference } from '@nestjs/graphql';

import { UsersProgressService } from './userProgress.service';
import { UpsertUserProgressInput, UserProgress } from '../graphql.schema'

@Resolver('users')
export class UserProgressResolver {
  constructor(private readonly usersProgressService: UsersProgressService) {}

  @Query('getUserProgress')
  async getUserProgress(@Args('userId') userId: string): Promise<UserProgress> {
    return this.usersProgressService.getUserProgress(userId);
  }

  @ResolveReference()
  resolveGetUserProgressReference(reference: {
    __typename: string;
    userId: string;
  }) {
    return this.usersProgressService.getUserProgress(reference.userId);
  }

  @Mutation('upsertUserProgress')
  async upsertUserProgress(@Args('upsertUserProgressInput') upsertUserProgressInput: UpsertUserProgressInput): Promise<UserProgress> {
    return this.usersProgressService.upsertUserProgress(upsertUserProgressInput);
  }

  @ResolveReference()
  resolveUpsertUserProgress(reference: {
    __typename: string;
    upsertProgressInput: UpsertUserProgressInput;
  }) {
    return this.usersProgressService.upsertUserProgress(reference.upsertProgressInput);
  }
}
