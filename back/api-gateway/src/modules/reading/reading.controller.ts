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
  async findReadings(@Param('userId') user_id: string) {
    this.logger.log(`Finding readings`);
    return this.readingService.findReadings(user_id);
  }

  @Post('/get')
  async findReading(@Body() data: { user_id: string, book_id: string }){
    this.logger.log(`Finding reading by user and book ids`);
    return this.readingService.findReading(data.user_id, data.book_id);
  }

  @Put()
  @UseGuards(AuthGuard)
  async udateReading(@Body() data: { user_id: string, book_id: string, curPage: number }) {
    this.logger.log(`Updating reading`);
    return this.readingService.updateReading(data.user_id, data.book_id, data.curPage);
  }

}