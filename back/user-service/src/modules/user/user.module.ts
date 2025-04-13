import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from './user.controller';
import { UserService } from './user.service';

import { User } from '../../entity/user.entity';
import { Role } from '../../entity/role.entity';
import { AuthService } from '../auth/auth.service';
import { JwtService } from '@nestjs/jwt';
import { Reading } from 'src/entity/reading.entity';
import { Book } from 'src/entity/book.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Role, Reading, Book]),
  ],
  controllers: [UserController],
  providers: [UserService, AuthService, JwtService],
})
export class UserModule {}