import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { TokenService } from './token.service';
import { Token } from './entities/token.entity';
import { CreateTokenInput } from './dto/create-token.input';
import { UseGuards } from '@nestjs/common';
import { GraphqlAuthGuard } from '../auth/graphqlAuth.guard';

@Resolver(() => Token)
export class TokenResolver {
  constructor(private readonly tokenService: TokenService) {}

  @Mutation(() => Token)
  createToken(@Args('createTokenInput') createTokenInput: CreateTokenInput) {
    return this.tokenService.create(createTokenInput);
  }

  @Query(() => Token, { name: 'token' })
  findOne(@Args('token', { type: () => String }) token: string) {
    return this.tokenService.findOne(token);
  }

  @UseGuards(GraphqlAuthGuard)
  @Mutation(() => Token)
  removeToken(@Args('id', { type: () => Int }) id: number) {
    return this.tokenService.remove(id);
  }
}
