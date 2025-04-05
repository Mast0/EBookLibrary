import { Controller, Logger, Post, Body, Request, UseGuards, Get, UseFilters } from "@nestjs/common";
import { AuthGuard } from "src/guards/auth.guard";

import { UserService } from "./user.service";
import { User } from "./dto";
import { UserExeptionFilter } from "../../exeption_filters/user-exeption.filter";
import { Login } from "./dto/login";
import { log } from "console";

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
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  } 
}