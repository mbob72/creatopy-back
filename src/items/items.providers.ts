import { ITEM_PROVIDER } from './items.constants';
import { Item } from './entities/item.entity';

export const itemsProviders = [
  {
    provide: ITEM_PROVIDER,
    useValue: Item,
  },
];
