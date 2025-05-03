import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Transport } from '@nestjs/microservices';
import { join } from 'path';
import { UserExeptionFilter } from './exeption_filters/user-exeption.filter';
import { NestExpressApplication } from '@nestjs/platform-express';
import "dotenv/config"

const pack = require('./../package.json');

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.setGlobalPrefix('api');
  app.enableCors();
  app.useGlobalFilters(new UserExeptionFilter())

  app.connectMicroservice({
    transport: Transport.RMQ,
    options: {
      urls: [process.env.BROCKER_URI],
      queue: pack.name,
      queueOptions: { durable: false },
    },
  });

  app.useStaticAssets(join(__dirname, '..', 'uploads'), {
    prefix: '/uploads/',
  });

  app.startAllMicroservices();
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
