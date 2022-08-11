import { Sequelize } from 'sequelize-typescript';
import { User } from '../users/entities/user.entity';
import { Item } from '../items/entities/item.entity';

export const databaseProviders = [
  {
    provide: 'SEQUELIZE',
    useFactory: async () => {
      const sequelize = new Sequelize({
        dialect: 'sqlite',
        storage: 'database.sqlite',
      });
      sequelize.addModels([User, Item]);
      await sequelize.sync();
      return sequelize;
    },
  },
];
