import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class UserType {
  @Field(() => Int)
  id: number;
  @Field(() => String, { description: 'login/email/phone' })
  login: string;
  @Field(() => String, { description: 'full name' })
  fullName: string;
}
