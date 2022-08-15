import { Inject, Injectable } from '@nestjs/common';
import { CreateItemInput } from './dto/create-item.input';
import { UpdateItemInput } from './dto/update-item.input';
import { Item } from './entities/item.entity';
import { ITEM_PROVIDER } from './items.constants';

@Injectable()
export class ItemsService {
  constructor(
    @Inject(ITEM_PROVIDER)
    private readonly item: typeof Item,
  ) {}

  async create({ title }: CreateItemInput, userId: number) {
    const item = await this.item.create({ title, userId });
    return item;
  }

  findAll() {
    return this.item.findAll();
  }

  update(id: number, updateItemInput: UpdateItemInput) {
    return `This action updates a #${id} item`;
  }

  remove(id: number) {
    return `This action removes a #${id} item`;
  }
}
