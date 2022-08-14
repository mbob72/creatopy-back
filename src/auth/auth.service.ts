import { JwtService } from '@nestjs/jwt';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtAccessPayload } from './jwt';
import { UsersService } from '../users/users.service';
import { User } from '../users/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UsersService,
  ) {}

  async getUserFromJwtPayload(payload: JwtAccessPayload) {
    const user = await this.userService.findOne(payload.id);
    return this.requireUser(user);
  }

  async requireUser(user: User) {
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }

  async createAccessToken(user: User) {
    const payload: JwtAccessPayload = {
      id: user.id,
    };

    return this.jwtService.sign(payload);
  }
}
