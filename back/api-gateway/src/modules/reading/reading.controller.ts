import { Controller, Logger, Post, Param, Put, Body, Request, UseGuards, Get, UseFilters } from "@nestjs/common";
import { AuthGuard } from "src/guards/auth.guard";

import { ReadingService } from "./reading.service";
import { UserExeptionFilter } from "../../exeption_filters/user-exeption.filter";
import { Reading } from "./dto/reading";

@Controller('reading')
@UseFilters(new UserExeptionFilter())
export class ReadingController {
  private readonly logger = new Logger(ReadingController.name);

  constructor(private readonly readingService: ReadingService) {}

  @Post()
  @UseGuards(AuthGuard) 
  async createReading(@Body() reading: Reading) {
    this.logger.log('Creating reading');
    return this.readingService.createReading(reading);
  }

  @Get(':userId')
  async findReadings(@Param('id') user_id: string) {
    this.logger.log(`Finding readings`);
    return this.readingService.findReadings(user_id);
  }

  @Put(':id')
  @UseGuards(AuthGuard)
  async udateReading(@Param('id') id: string, @Body() reading: Reading) {
    this.logger.log(`Updating reading ${id}`);
    return this.readingService.updateReading(id, reading);
  }

}