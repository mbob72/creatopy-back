import {
  Resolver,
  Query,
  Mutation,
  Args,
  Int,
  Context,
  Parent,
  ResolveField,
} from '@nestjs/graphql';
import { ItemsService } from './items.service';
import { ItemType } from './dto/item.type';
import { CreateItemInput } from './dto/create-item.input';
import { UpdateItemInput } from './dto/update-item.input';
import { UseGuards } from '@nestjs/common';
import { GraphqlAuthGuard } from '../auth/graphqlAuth.guard';
import { GraphQLContext } from '../types';
import { Item } from './entities/item.entity';
import { UserType } from '../users/dto/user.type';
import { User } from '../users/entities/user.entity';
import DataLoader from 'dataloader';
import { InjectEntityLoader } from '../dataloader';

@Resolver(() => ItemType)
export class ItemsResolver {
  constructor(private readonly itemsService: ItemsService) {}

  @UseGuards(GraphqlAuthGuard)
  @Mutation(() => ItemType)
  createItem(
    @Args('createItemInput') createItemInput: CreateItemInput,
    @Context() context: GraphQLContext,
  ) {
    return this.itemsService.create(createItemInput, context.req.user.id);
  }

  @UseGuards(GraphqlAuthGuard)
  @Query(() => [ItemType], { name: 'items' })
  findAll() {
    return this.itemsService.findAll();
  }

  @UseGuards(GraphqlAuthGuard)
  @Mutation(() => ItemType)
  updateItem(@Args('updateItemInput') updateItemInput: UpdateItemInput) {
    return this.itemsService.update(updateItemInput.id, updateItemInput);
  }

  @UseGuards(GraphqlAuthGuard)
  @Mutation(() => ItemType)
  removeItem(@Args('id', { type: () => Int }) id: number) {
    return this.itemsService.remove(id);
  }

  @ResolveField((returns) => UserType)
  user(
    @Parent() item: Item,

    @InjectEntityLoader(User)
    loader: DataLoader<number, User>,
  ) {
    return item.userId && loader.load(item.userId);
  }
}
