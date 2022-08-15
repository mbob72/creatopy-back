import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import DataLoader = require('dataloader');
import { ModuleRef } from '@nestjs/core';
import { Op } from 'sequelize';

export function reorderObjects<MyObject, Key>(
  data: MyObject[],
  ids: Key[],
  key: (obj: MyObject) => Key,
): MyObject[] {
  const map = new Map<Key, MyObject>();
  for (const model of data) {
    map.set(key(model), model);
  }
  return ids.map((id) => map.get(id));
}

export class DataLoaders {
  entityLoaders = new Map<unknown, DataLoader<unknown, any>>();
  constructor(private readonly moduleRef: ModuleRef) {}

  getEntityLoader<T extends { id: unknown }>(Type): DataLoader<unknown, T> {
    let loader = this.entityLoaders.get(Type);
    if (!loader) {
      loader = new DataLoader(async (ids: unknown[]) => {
        const result = await Type.findAll({ where: { id: { [Op.in]: ids } } });
        return reorderObjects(result, ids, (m) => m.id);
      });
      this.entityLoaders.set(Type, loader);
    }

    return loader;
  }
}

export const InjectEntityLoader = (Entity) =>
  createParamDecorator((myData, ectx: ExecutionContext) => {
    const ctx = ectx.getArgByIndex(2);
    if (ctx.typeormDataLoaders) {
      const dl: DataLoaders = ctx.typeormDataLoaders;
      return dl.getEntityLoader(Entity);
    }
    throw new Error(
      `Variable 'typeormDataLoaders' is not found in the GraphQL context`,
    );
  })();
