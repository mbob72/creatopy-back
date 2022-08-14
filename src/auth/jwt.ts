import { config } from 'dotenv';

config();

export interface JwtAccessPayload {
  // Идентификатор пользователя
  id: number;
}

export const jwtSecretKey = process.env.JWT_SECRET_KEY;
if (!jwtSecretKey) {
  throw new Error('JWT_SECRET_KEY is not found in the environment');
}

export const jwtExpiration = +process.env.JWT_EXPIRATION || 3600;
