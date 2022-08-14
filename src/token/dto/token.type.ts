import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class TokenType {
  @Field(() => String, { description: 'email/phone/login' })
  login: string;
  @Field(() => String, { description: 'password' })
  password: string;
}
