import { Module } from '@nestjs/common';
import { ReadingService } from './reading.service';
import { ReadingController } from './reading.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Reading } from 'src/entity/reading.entity';
import { Book } from 'src/entity/book.entity';
import { User } from 'src/entity/user.entity';
import { Role } from 'src/entity/role.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Reading, Book, User, Role]),
  ],
  providers: [ReadingService],
  controllers: [ReadingController]
})
export class ReadingModule {}
