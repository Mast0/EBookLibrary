import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { configService } from './config';
import { Transport } from '@nestjs/microservices';

const pack = require('./../package.json');

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.connectMicroservice({
    transport: Transport.RMQ,
    options: {
      urls: [configService.getBrockerUri()],
      queue: pack.name,
      queueOptions: { durable: false }, 
    },
  },
  { inheritAppConfig: true });

  await app.startAllMicroservices();

  await app.listen(configService.getPort());
}
bootstrap();
