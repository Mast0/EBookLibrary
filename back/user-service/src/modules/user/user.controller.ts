import { Logger, Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';

import { UserService } from './user.service';
import { UserDTO } from './dto';
import { patterns } from '../patterns';
import { LoginDTO } from './dto/login.dto';

@Controller('user')
export class UserController {
  private readonly logger = new Logger(UserController.name);

  constructor(private readonly userService: UserService) {}

  @MessagePattern(patterns.USER.CREATE)
  async createUser(dto: UserDTO) {
    this.logger.log('Creating user');
    return this.userService.createUser(dto);
  }

  @MessagePattern(patterns.USER.LOGIN)
  async loginUser(dto: LoginDTO){
    this.logger.log(`Log in user with email ${dto.email}`);
    return this.userService.loginUser(dto.email, dto.password);
  }

  @MessagePattern(patterns.USER.FIND_ALL)
  async findAllUsers() {
    return this.userService.findAllUsers();
  }

  @MessagePattern(patterns.USER.FIND_BY_ID)
  async findUserById(data: { user_id: string }) {
    return this.userService.findUserById(data.user_id);
  }

  @MessagePattern(patterns.USER.UPDATE)
  async updateUser(id: string, dto: UserDTO) {
    return this.userService.updateUser(id, dto);
  }

  @MessagePattern(patterns.USER.DELETE)
  async deleteUser(id: string) {
    return this.userService.deleteUser(id);
  }

  @MessagePattern(patterns.USER.FIND_BY_EMAIL)
  async findUserByEmail(email: string) {
    return this.userService.findUserByEmail(email);
  }

  @MessagePattern(patterns.USER.RESET_PASSWORD)
  async resetPassword(email: string) {
    return this.userService.resetPassword(email);
  }

  @MessagePattern(patterns.USER.GET_ROLE_BY_EMAIL)
  async getRoleByEmail(email: string) {
    return this.userService.getUserPermissionsByEmail(email);
  }
}