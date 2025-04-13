import { Module } from "@nestjs/common";
import { ClientProxyFactory, Transport } from "@nestjs/microservices"
import { ReadingController } from "./reading.controller";
import { ReadingService } from "./reading.service";
import "dotenv/config"
import { UserModule } from "../user/user.module";

@Module({
  imports: [UserModule],
  controllers: [ReadingController],
  providers: [
    ReadingService,
    {
      provide: 'READING_SERVICE',
      useFactory: () =>
        ClientProxyFactory.create({
          transport: Transport.RMQ as any,
          options: {
            urls: [process.env.BROCKER_URI],
            queue: 'reading-service',
            queueOptions: { durable: false },
          },
        }),
    },
  ],
})
export class ReadingModule {}