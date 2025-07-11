import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import 'dotenv/config';
import { ValidationPipe } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';

const PORT = Number(process.env.PORT) || 3000;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: process.env.CLIENT_ORIGIN || 'http://localhost:3000', // Specific origin
    credentials: true,
  });

  app.use(cookieParser());
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // remove properties that don't have decorators
      forbidNonWhitelisted: true, // throw an error for extra fields
      transform: true, // convert payloads to DTO instances
    }),
  );
  await app.listen(PORT);
  console.log(`server running on http://localhost:${PORT}`);
}
bootstrap();
