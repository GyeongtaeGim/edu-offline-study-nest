import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import AppModule from './app.module';

import fastifyCookie from '@fastify/cookie';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import AllExceptionsFilter from 'common/all-exceptions.fillter';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(AppModule, new FastifyAdapter());

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  const { httpAdapter } = app.get(HttpAdapterHost);
  app.useGlobalFilters(new AllExceptionsFilter(httpAdapter));

  app.register(fastifyCookie, { secret: '' });

  app.enableCors({ origin: 'https://localhost:3000', credentials: true });

  app.listen(4000, '0.0.0.0');
}

bootstrap();
