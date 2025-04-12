import { Module } from "@nestjs/common";
import { OrmModule } from "./orm/orm.module";
import { ReadingModule } from "./reading/reading.module";

@Module({
  imports: [OrmModule, ReadingModule],
})
export class ModulesModule {}