import { ObjectType, Field } from '@nestjs/graphql';
import { UserType } from '../../users/dto/user.type';

@ObjectType()
export class TokenType {
  @Field(() => String)
  token: string;
  @Field(() => UserType)
  user: UserType;
}
