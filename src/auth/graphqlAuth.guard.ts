import {
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GqlExecutionContext } from '@nestjs/graphql';
import { STRATEGY_JWT } from './jwtStrategy.service';

@Injectable()
export class GraphqlAuthGuard extends AuthGuard(STRATEGY_JWT) {
  getRequest(context: ExecutionContext) {
    const ctx = GqlExecutionContext.create(context);
    const gcontext = ctx.getContext();
    return gcontext.req;
  }

  handleRequest(err, user) {
    if (err || !user) {
      throw err || new UnauthorizedException('Invalid Token');
    }
    return user;
  }
}
