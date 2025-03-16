import { ConflictException, Inject, Injectable, Logger, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RpcException } from '@nestjs/microservices';
import { QueryFailedError, Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

import { UserDTO } from './dto';
import { User } from '../../entity/user.entity';
import { Role } from '../../entity/role.entity';
import { AuthService } from '../auth/auth.service';
import { TokenPayload, Tokens } from '../auth/dto';

@Injectable()
export class UserService {
  private readonly logger = new Logger(UserService.name);

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>,
    @Inject(AuthService)
    private readonly authService: AuthService
  ) {}

  async createUser(dto: UserDTO) {
    this.logger.log(`Creating user: ${JSON.stringify(dto)}`);
    const { email, username, password, role } = dto;
    const userPassword = await bcrypt.hash(password, 10);

    const roleEntity = await this.roleRepository.findOneBy({ name: role });
    if (!roleEntity) {
      throw new RpcException(`Role ${role} not found`);
    }

    const userData = {
      email,
      username,
      password: userPassword,
    };

    const user = this.userRepository.create({
      ...userData,
      role_id: roleEntity.id,
    });

    try{
      return await this.userRepository.save(user);
    }
    catch (error){
      if (error instanceof QueryFailedError) {
        throw new RpcException(new ConflictException('User already exists with this email or username'));
      }
    }
  }

  async loginUser(email: string, password: string): Promise<Tokens>  {
    this.logger.log(`Start logining user with emal ${email}`);

    const user = await this.findUserByEmail(email);

    if (!user) {
      throw new RpcException(new UnauthorizedException('Invalid email'))
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new RpcException(new UnauthorizedException('Invalid email or password'))
    }

    const tokenPayload: TokenPayload = {
      member_id: user.id,
      role_id: user.role_id,
    }

    return await this.authService.generateToken(tokenPayload);
  }

  async findAllUsers() {
    return await this.userRepository.find();
  }

  async findUserById(id: string) {
    return await this.userRepository.findOne({ where: { id } });
  }

  async updateUser(id: string, dto: UserDTO) {
    const user = await this.findUserById(id);
    if (!user) {
      throw new RpcException('User not found');
    }

    const roleEntity = await this.roleRepository.findOneBy({ name: dto.role });
    if (!roleEntity) {
      throw new NotFoundException(`Role ${dto.role} not found`);
    }

    const { role: _, ...updateData } = dto;
    return await this.userRepository.save({
      ...user,
      ...updateData,
      role_id: roleEntity.id,
    });
  }

  async deleteUser(id: string) {
    const user = await this.findUserById(id);
    if (!user) {
      throw new RpcException('User not found');
    }
    return await this.userRepository.delete(id);
  }

  async findUserByEmail(email: string) {
    return await this.userRepository.findOne({ where: { email } });
  }

  async resetPassword(email: string) {
    const user = await this.findUserByEmail(email);
    if (!user) {
      throw new RpcException('User not found');
    }
    return await this.userRepository.save({ ...user, password: '123456' });
  }
}