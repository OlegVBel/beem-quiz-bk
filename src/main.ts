import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { join } from 'path';
import { NestExpressApplication } from '@nestjs/platform-express';
import { json, urlencoded } from 'express';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.enableCors();

  app.use(json({ limit: '50mb' }));
  app.use(
    urlencoded({ extended: true, limit: '50mb', parameterLimit: 1000000 }),
  );
  app.useStaticAssets(join(__dirname, '..', 'assets'));
  await app.listen(3000);
}
bootstrap();
