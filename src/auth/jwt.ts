import { config } from 'dotenv';

config();

export interface JwtAccessPayload {
  // Идентификатор пользователя
  id: number;
}

export const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;
if (!JWT_SECRET_KEY) {
  throw new Error('JWT_SECRET_KEY is not found in the environment');
}

export const JWT_EXPIRATION = 3_600_000;
