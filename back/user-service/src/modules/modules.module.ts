import { Module } from "@nestjs/common";
import { AuthModule } from "./auth/auth.module";
import { OrmModule } from "./orm/orm.module";
import { UserModule } from './user/user.module';

@Module({
  imports: [UserModule, AuthModule, OrmModule],
})
export class ModulesModule {}