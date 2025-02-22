/* eslint-disable prettier/prettier */
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Transport } from '@nestjs/microservices';
import { configService } from './modules/config/config.service';

// eslint-disable-next-line @typescript-eslint/no-var-requires
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
