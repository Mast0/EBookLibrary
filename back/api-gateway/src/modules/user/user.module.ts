import { Module } from "@nestjs/common";
import { ClientProxyFactory, Transport } from "@nestjs/microservices"
import { UserController } from "./user.controller";
import { UserService } from "./user.service";
import "dotenv/config"

@Module({
  controllers: [UserController],
  providers: [
    UserService,
    {
      provide: 'USER_SERVICE',
      useFactory: () =>
        ClientProxyFactory.create({
          transport: Transport.RMQ as any,
          options: {
            urls: [process.env.BROCKER_URI],
            queue: 'user-service',
            queueOptions: { durable: false },
          },
        }),
    },
  ],
  exports: ['USER_SERVICE', UserService],
})
export class UserModule {}