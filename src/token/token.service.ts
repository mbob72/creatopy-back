import { Injectable } from '@nestjs/common';
import { CreateTokenInput } from './dto/create-token.input';
import { UsersService } from '../users/users.service';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class TokenService {
  constructor(
    private readonly usersService: UsersService,
    private readonly authService: AuthService,
  ) {}

  async create({ login, password }: CreateTokenInput) {
    const user = await this.usersService.findByLoginAndPassword(
      login,
      password,
    );

    if (!user) {
      throw new Error('invalid username or password');
    }

    const token = await this.authService.createAccessToken(user);

    return {
      token,
      user,
    };
  }
}
