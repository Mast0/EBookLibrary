import { Module } from "@nestjs/common";
import { AuthModule } from "./auth/auth.module";
import { OrmModule } from "./orm/orm.module";

@Module({
  imports: [AuthModule, OrmModule],
})
export class ModulesModule {}