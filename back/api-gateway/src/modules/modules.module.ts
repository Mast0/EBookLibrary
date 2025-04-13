import { Module } from "@nestjs/common";
import { UserModule } from "./user/user.module";
import { AuthModule } from "./auth/auth.module";
import { BookModule } from "./book/book.module";
import { ReadingModule } from "./reading/reading.module";

@Module({
  imports: [UserModule, AuthModule, BookModule, ReadingModule],
})
export class ModulesModule {}