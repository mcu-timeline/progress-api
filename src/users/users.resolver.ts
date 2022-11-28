import { Args, Mutation, Query, Resolver, ResolveReference } from '@nestjs/graphql';

import { UsersService } from './users.service';
import { CreateUserInput, User } from '../graphql.schema'

@Resolver('users')
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Query('user')
  async getUsers(@Args('id') id: string): Promise<User> {
    return this.usersService.findOne(id);
  }

  @ResolveReference()
  resolveGetUserReference(reference: {
    __typename: string;
    id: string;
  }) {
    return this.usersService.findOne(reference.id);
  }

  @Mutation('createUser')
  async createUser(@Args('createUserInput') createUserInput: CreateUserInput): Promise<User> {
    const { email } = createUserInput;
    return this.usersService.create({ email });
  }

  @ResolveReference()
  resolveCreateUserReference(reference: {
    __typename: string;
    createUserInput: CreateUserInput;
  }) {
    const { email } = reference.createUserInput;
    return this.usersService.create({ email });
  }
}
