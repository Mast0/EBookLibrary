import { Module } from "@nestjs/common";
import { AuthModule } from "./auth/auth.module";
import { OrmModule } from "./orm/orm.module";
import { UserModule } from './user/user.module';
import { InitModule } from "./init/init.module";

@Module({
  imports: [UserModule, AuthModule, OrmModule, InitModule],
})
export class ModulesModule {}