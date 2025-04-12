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

  @MessagePattern(patterns.READING.FIND_ALL)
  async findReadings(user_id: string) {
    this.logger.log('Finding readings');
    return await this.readingService.getAllReadings(user_id);
  }

  @MessagePattern(patterns.READING.UPDATE)
  async updateReading(id: string, dto: ReadingDto){
    this.logger.log('Updating reading');
    return await this.readingService.updateReading(id, dto);
  }
}
