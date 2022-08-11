import { ObjectType, Field } from '@nestjs/graphql';
import { UserType } from '../../users/dto/user.type';

@ObjectType()
export class ItemType {
  @Field(() => String, { description: 'item title' })
  title: string;
  @Field(() => UserType, { description: 'item creator' })
  user: UserType;
  @Field(() => String, { description: 'creation date and time' })
  createdAt: string;
}
