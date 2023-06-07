import { registerAs } from '@nestjs/config';

export default registerAs('app', () => ({
  environment: process.env.NODE_ENV,
  port: parseInt(process.env.APP_PORT, 10) || 3000,
  passwordHashingRounds: parseInt(process.env.PASSWORD_HASHING_ROUNDS) || 10,
  corsAllowOrigin: process.env.CORS_ALLOW_ORIGIN,
  jwtSecret: process.env.JWT_SECRET,
}));
