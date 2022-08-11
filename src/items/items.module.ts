import { Module } from '@nestjs/common';
import { ItemsService } from './items.service';
import { ItemsResolver } from './items.resolver';
import { itemsProviders } from './items.providers';
import { DatabaseModule } from '../database/database.module';

@Module({
  imports: [DatabaseModule],
  providers: [ItemsResolver, ItemsService, ...itemsProviders],
})
export class ItemsModule {}
