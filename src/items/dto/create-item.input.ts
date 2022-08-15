import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateItemInput {
  @Field(() => String, { description: 'item title' })
  title: string;
}
