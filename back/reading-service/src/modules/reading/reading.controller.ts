import { Controller, Logger } from '@nestjs/common';
import { ReadingService } from './reading.service';
import { MessagePattern } from '@nestjs/microservices';
import { patterns } from '../patterns';
import { ReadingDto } from './dto/reading.dto';

@Controller('reading')
export class ReadingController {
  private readonly logger = new Logger(ReadingController.name);

  constructor(private readonly readingService: ReadingService) {}

  @MessagePattern(patterns.READING.CREATE)
  async createReading(dto: ReadingDto) {
    this.logger.log('Creating reading');
    return await this.readingService.createReading(dto);
  }

  @MessagePattern(patterns.READING.FIND_USER_ALL)
  async findReadings(data: { user_id: string }) {
    this.logger.log('Finding readings');
    return await this.readingService.getAllReadings(data.user_id);
  }

  @MessagePattern(patterns.READING.FIND_READING)
  async findReading(data: { user_id: string, book_id: string }){
    this.logger.log('Finding reading by user and book ids');
    return await this.readingService.getReading(data.user_id, data.book_id);
  }

  @MessagePattern(patterns.READING.UPDATE)
  async updateReading(data: {user_id: string, book_id: string, curPage: number}){
    this.logger.log('Updating reading');
    return await this.readingService.updateReading(data.user_id, data.book_id, data.curPage);
  }
}
