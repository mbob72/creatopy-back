import { config } from 'dotenv';

config();

/**
 * Содержимое краткосрочного jwt-токена
 * $module {Модуль аутентификации}
 */
export interface JwtAccessPayload {
  // Идентификатор пользователя
  id: number;
}

/**
 * Секретный ключ для jwt-токенов
 * $module {Модуль аутентификации}
 */
export const jwtSecretKey = process.env.JWT_SECRET_KEY;
if (!jwtSecretKey) {
  throw new Error('JWT_SECRET_KEY is not found in the environment');
}

/**
 * Время действия jwt-токена
 * $module {Модуль аутентификации}
 */
export const jwtExpiration = +process.env.JWT_EXPIRATION || 3600;
