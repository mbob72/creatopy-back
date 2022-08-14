import { Resolver, Query, Mutation, Args, Int, Context } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { UserType } from './dto/user.type';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { GraphqlAuthGuard } from '../auth/graphqlAuth.guard';
import { GraphQLContext } from '../types';

@Resolver(() => UserType)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Mutation(() => UserType)
  createUser(@Args('createUserInput') createUserInput: CreateUserInput) {
    return this.usersService.create(createUserInput);
  }

  @UseGuards(GraphqlAuthGuard)
  @Query(() => UserType, { name: 'user' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.usersService.findOne(id);
  }

  @UseGuards(GraphqlAuthGuard)
  @Mutation(() => UserType)
  updateUser(
    @Args('updateUserInput') updateUserInput: UpdateUserInput,
    @Context() context: GraphQLContext,
  ) {
    return this.usersService.update(context.req.user.id, updateUserInput);
  }

  @UseGuards(GraphqlAuthGuard)
  @Mutation(() => UserType)
  removeUser(@Context() context: GraphQLContext) {
    return this.usersService.remove(context.req.user.id);
  }
}
