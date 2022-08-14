import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { JwtStrategy, STRATEGY_JWT } from './jwtStrategy.service';
import { jwtExpiration, jwtSecretKey } from './jwt';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: STRATEGY_JWT }),
    JwtModule.register({
      secret: jwtSecretKey,
      signOptions: {
        expiresIn: jwtExpiration,
      },
    }),
    UsersModule,
  ],
  providers: [AuthService, JwtStrategy],
  exports: [AuthService],
})
export class AuthModule {}
