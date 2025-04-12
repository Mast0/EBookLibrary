import { BadRequestException, ConflictException, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Reading } from 'src/entity/reading.entity';
import { QueryFailedError, Repository } from 'typeorm';
import { ReadingDto } from './dto/reading.dto';
import { Book } from 'src/entity/book.entity';
import { RpcException } from '@nestjs/microservices';

@Injectable()
export class ReadingService {
  private readonly logger = new Logger(ReadingService.name);

  constructor(
    @InjectRepository(Reading)
    private readonly readingRepository: Repository<Reading>,
    @InjectRepository(Book)
    private readonly bookRepository: Repository<Book>,
  ) {}

  async createReading(dto: ReadingDto) {
    this.logger.log(`Creating Reading: ${JSON.stringify(dto)}`);
    const { user_id, book_id, current_page } = dto;

    const book = await this.bookRepository.findOne({ where: { id: book_id } });
    if (!book)
      throw new RpcException(new NotFoundException('Book not found'));

    const percentage_read = current_page/book.pages*100;

    const readingData = {
      user_id,
      book_id, 
      current_page,
      percentage_read,
    };

    try{
      const reading = this.readingRepository.create(readingData);
      return await this.readingRepository.save(reading);
    }
    catch (error){
      if (error instanceof QueryFailedError) {
        throw new RpcException(new ConflictException('Reading already exists'));
      }
      throw new RpcException(new BadRequestException('Ops, we have some error while creating reading.'));
    }
  }

  async getAllReadings(user_id: string) {
    return await this.readingRepository.findBy({ user_id });
  }

  async updateReading(id: string, dto: ReadingDto) {
    const reading = this.readingRepository.findOne({ where: { id } })
    if (!reading){
      throw new RpcException(new NotFoundException('Reading Not Found'));
    }
    const { user_id, book_id, current_page } = dto;

    const book = await this.bookRepository.findOne({ where: { id: book_id } });
    if (!book)
      throw new RpcException(new NotFoundException('Book not found'));

    const percentage_read = current_page/book.pages*100;

    const readingData = {
      user_id,
      book_id, 
      current_page,
      percentage_read,
    };

    try{
      return await this.readingRepository.save(readingData);
    }
    catch {
      throw new RpcException(new BadRequestException('Ops, we have some error while updating reading.'))
    }
  }
}
