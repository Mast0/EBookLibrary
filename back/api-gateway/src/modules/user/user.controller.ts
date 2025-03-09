import { Controller, Logger, Post, Body, Request, UseGuards, Get } from "@nestjs/common";
import { AuthGuard } from "src/guards/auth.guard";

import { UserService } from "./user.service";
import { User } from "./dto";

@Controller('user')
export class UserController {
  private readonly logger = new Logger(UserController.name);

  constructor(private readonly userService: UserService) {}

  @Post('register')
  async createUser(@Body() user: User) {
    this.logger.log('Creating user');
    return this.userService.createUser(user);
  }

  @UseGuards(AuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}