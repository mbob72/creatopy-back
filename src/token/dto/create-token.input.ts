import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateTokenInput {
  @Field(() => String, { description: 'email/phone/login' })
  login: string;
  @Field(() => String, { description: 'password' })
  password: string;
}
