import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';

import * as connectRedis from "connect-redis"
import * as session from "express-session"
import { createClient } from "redis"

async function bootstrap() {

  const app = await NestFactory.create(AppModule, { cors: true });

  // Initialize client.
  let redisClient = createClient({ url: 'redis://localhost:6379', legacyMode: true })
  redisClient.connect().catch(console.error)

  // Initialize store.
  let RedisStore = connectRedis(session);
  const store = new RedisStore({ client: redisClient })
  app.use(cookieParser());

  app.use(
    session({
      store,
      secret: process.env.JWT_SECRET || 'your-secret-key',
      resave: false,
      saveUninitialized: false,
      name: 'token'
    }),
  );
  
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(3002);
}

bootstrap();
