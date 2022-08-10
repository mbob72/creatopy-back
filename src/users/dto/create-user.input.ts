import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateUserInput {
  @Field(() => String, { description: 'login/email/phone' })
  login: string;
  @Field(() => String, { description: 'password' })
  password: string;
  @Field(() => String, { description: 'full name' })
  fullName: string;
}
