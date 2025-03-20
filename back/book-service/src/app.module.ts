import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { ModulesModule } from './modules/modules.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import appDataSource from './modules/orm/config/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env'
    }),
    ModulesModule,
    TypeOrmModule.forRoot(appDataSource.options)
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
