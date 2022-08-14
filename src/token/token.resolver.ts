import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { TokenService } from './token.service';
import { TokenType } from './dto/token.type';
import { CreateTokenInput } from './dto/create-token.input';
import { UseGuards } from '@nestjs/common';
import { GraphqlAuthGuard } from '../auth/graphqlAuth.guard';

@Resolver(() => TokenType)
export class TokenResolver {
  constructor(private readonly tokenService: TokenService) {}

  @Mutation(() => TokenType)
  createToken(@Args('createTokenInput') createTokenInput: CreateTokenInput) {
    return this.tokenService.create(createTokenInput);
  }

  @Query(() => TokenType, { name: 'token' })
  findOne(@Args('token', { type: () => String }) token: string) {
    return this.tokenService.findOne(token);
  }

  @UseGuards(GraphqlAuthGuard)
  @Mutation(() => TokenType)
  removeToken(@Args('id', { type: () => Int }) id: number) {
    return this.tokenService.remove(id);
  }
}
