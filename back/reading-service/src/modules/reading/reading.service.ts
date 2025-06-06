import { BadRequestException, ConflictException, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Reading } from 'src/entity/reading.entity';
import { QueryFailedError, Repository } from 'typeorm';
import { ReadingDto } from './dto/reading.dto';
import { Book } from 'src/entity/book.entity';
import { RpcException } from '@nestjs/microservices';
import { read } from 'fs';

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

    if (current_page > book.pages)
      throw new RpcException(new BadRequestException('Current page is higher than pages in book'));
    const percentage_read = Math.round(current_page/book.pages*100);

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
    return await this.readingRepository.findBy({ user_id: user_id });
  }

  async getReading(user_id: string, book_id: string){
    return await this.readingRepository.findOneBy({ user_id, book_id });
  }

  async updateReading(user_id: string, book_id: string, curPage: number) {
    const reading = await this.readingRepository.findOne({
      where: { user_id, book_id },
      relations: { book: true },
    });
    if (!reading){
      throw new RpcException(new NotFoundException('Reading Not Found'));
    }

    if (curPage > reading.book.pages)
      throw new RpcException(new BadRequestException('Current page is higher than pages in book'));
    const percentage_read = Math.round(curPage/reading.book.pages*100);

    try{
      reading.current_page = curPage;
      reading.percentage_read = percentage_read;
      return await this.readingRepository.save(reading);
    }
    catch {
      throw new RpcException(new BadRequestException('Ops, we have some error while updating reading.'))
    }
  }
}
