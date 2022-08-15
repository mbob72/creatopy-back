import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { TokenService } from './token.service';
import { TokenType } from './dto/token.type';
import { CreateTokenInput } from './dto/create-token.input';

@Resolver(() => TokenType)
export class TokenResolver {
  constructor(private readonly tokenService: TokenService) {}

  @Mutation(() => TokenType)
  createToken(@Args('createTokenInput') createTokenInput: CreateTokenInput) {
    return this.tokenService.create(createTokenInput);
  }
}
