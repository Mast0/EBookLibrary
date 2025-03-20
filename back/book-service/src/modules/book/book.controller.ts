import { Controller, Logger } from '@nestjs/common';
import { BookService } from './book.service';
import { MessagePattern } from '@nestjs/microservices';
import { patterns } from '../patterns';
import { BookDto } from './dto';
import { strict } from 'assert';

@Controller('book')
export class BookController {
    private readonly logger = new Logger(BookController.name);

    constructor(private readonly bookService: BookService) {}

    @MessagePattern(patterns.BOOK.CREATE)
    async createBook(dto: BookDto) {
        this.logger.log('Creating book');
        return await this.bookService.createBook(dto);
    }

    @MessagePattern(patterns.BOOK.UPDATE)
    async updateBook(id: string, dto: BookDto) {
        this.logger.log(`Update book with id: ${id}`);
        return await this.bookService.updateBook(id, dto);
    }

    @MessagePattern(patterns.BOOK.FIND_ALL)
    async getAllBooks() {
        this.logger.log('Getting all books');
        return await this.bookService.getAllBooks();
    }

    @MessagePattern(patterns.BOOK.FIND_BY_ID)
    async getBookById(id: string) {
        this.logger.log(`Getting book by id: ${id}`);
        return await this.bookService.getBookById(id);
    }

    @MessagePattern(patterns.BOOK.FIND_BY_TITLE)
    async getBooksByTitle(title: string) {
        this.logger.log(`Getting books by title: ${title}`);
        return await this.bookService.getBooksByTitle(title);
    }

    @MessagePattern(patterns.BOOK.FIND_BY_AUTHOR)
    async getBooksByAuthor(author: string) {
        this.logger.log(`Getting books by author: ${author}`);
        return await this.bookService.getBooksByAuthor(author);
    }
}
