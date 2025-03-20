import { Module } from "@nestjs/common";
import { OrmModule } from "./orm/orm.module";
import { BookModule } from "./book/book.module";

@Module({
  imports: [BookModule, OrmModule],
})
export class ModulesModule {}