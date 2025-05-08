import { Controller, Logger, Post, Body, Request, UseGuards, Get, UseFilters } from "@nestjs/common";
import { AuthGuard } from "src/guards/auth.guard";

import { UserService } from "./user.service";
import { User, Login, GetRole } from "./dto";
import { UserExeptionFilter } from "../../exeption_filters/user-exeption.filter";

@Controller('user')
@UseFilters(new UserExeptionFilter())
export class UserController {
  private readonly logger = new Logger(UserController.name);

  constructor(private readonly userService: UserService) {}

  @Post('register')
  async createUser(@Body() user: User) {
    this.logger.log('Creating user');
    return this.userService.createUser(user);
  }

  @Post('login')
  async loginUser(@Body() login: Login){
    this.logger.log(`Log in user with email ${login.email}`);
    return this.userService.loginUser(login);
  }

  @UseGuards(AuthGuard)
  @Post('role')
  async getUserRoleByEmail(@Body() getRole: GetRole){
    this.logger.log(`Getting User Role By Email ${getRole.email}`);
    return this.userService.getUSerRoleByEmail(getRole.email);
  }

  @UseGuards(AuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  } 
}