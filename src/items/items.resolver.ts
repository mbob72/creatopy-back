import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { ItemsService } from './items.service';
import { ItemType } from './dto/item.type';
import { CreateItemInput } from './dto/create-item.input';
import { UpdateItemInput } from './dto/update-item.input';
import { UseGuards } from '@nestjs/common';
import { GraphqlAuthGuard } from '../auth/graphqlAuth.guard';

@Resolver(() => ItemType)
export class ItemsResolver {
  constructor(private readonly itemsService: ItemsService) {}

  @UseGuards(GraphqlAuthGuard)
  @Mutation(() => ItemType)
  createItem(@Args('createItemInput') createItemInput: CreateItemInput) {
    return this.itemsService.create(createItemInput);
  }

  @UseGuards(GraphqlAuthGuard)
  @Query(() => [ItemType], { name: 'items' })
  findAll() {
    return this.itemsService.findAll();
  }

  @UseGuards(GraphqlAuthGuard)
  @Query(() => ItemType, { name: 'item' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.itemsService.findOne(id);
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
}
