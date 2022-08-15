import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { ModuleRef } from '@nestjs/core';
import { DataLoaders } from './dataloader';
import { GqlExecutionContext } from '@nestjs/graphql';
import { Observable } from 'rxjs/internal/Observable';

@Injectable()
export class DataLoaderInterceptor implements NestInterceptor {
  constructor(private readonly moduleRef: ModuleRef) {}

  public intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<unknown> {
    const ctx = GqlExecutionContext.create(context).getContext();

    if (ctx && !ctx.typeormDataLoaders) {
      ctx.typeormDataLoaders = new DataLoaders(this.moduleRef);
    }

    return next.handle();
  }
}
