import { Module } from '@nestjs/common';
import { ReadingService } from './reading.service';
import { ReadingController } from './reading.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Reading } from 'src/entity/reading.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Reading]),
  ],
  providers: [ReadingService],
  controllers: [ReadingController]
})
export class ReadingModule {}
