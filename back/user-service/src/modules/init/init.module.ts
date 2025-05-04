import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Role } from 'src/entity/role.entity';
import { InitService } from './init.service';

@Module({
  imports: [TypeOrmModule.forFeature([Role])],
  providers: [InitService],
})
export class InitModule {}
