import { Module } from "@nestjs/common";
import { ClientProxyFactory, Transport } from "@nestjs/microservices"
import { BookController } from "./book.controller";
import { BookService } from "./book.service";
import "dotenv/config"
import { UserModule } from "../user/user.module";
import { UserService } from "../user/user.service";

@Module({
  imports: [UserModule],
  controllers: [BookController],
  providers: [
    BookService,
    {
      provide: 'BOOK_SERVICE',
      useFactory: () =>
        ClientProxyFactory.create({
          transport: Transport.RMQ as any,
          options: {
            urls: [process.env.BROCKER_URI],
            queue: 'book-service',
            queueOptions: { durable: false },
          },
        }),
    },
  ],
})
export class BookModule {}