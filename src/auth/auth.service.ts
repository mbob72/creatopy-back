import { JwtService } from '@nestjs/jwt';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtAccessPayload } from './jwt';
import { UsersService } from '../users/users.service';
import { User } from '../users/entities/user.entity';

/**
 * Сервис аутентификации
 * $module {Модуль аутентификации}
 */
@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UsersService,
  ) {}

  /**
   * Получает пользователя из проверенного jwt-токена
   */
  async getUserFromJwtPayload(payload: JwtAccessPayload) {
    const user = await this.userService.findOne(payload.id);
    return this.requireUser(user);
  }

  /**
   * Выбрасывает ошибку авторизации, если передано пустое значение
   */
  async requireUser(user: User) {
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }

  /**
   * Создает access-токен для пользователя
   */
  async createAccessToken(user: User) {
    const payload: JwtAccessPayload = {
      id: user.id,
    };

    return this.jwtService.sign(payload);
  }
}
