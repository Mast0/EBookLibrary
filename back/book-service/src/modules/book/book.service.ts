import { BadRequestException, ConflictException, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Book } from 'src/entity/book.entity';
import { QueryFailedError, Repository } from 'typeorm';
import { RpcException } from '@nestjs/microservices';
import { BookDto } from './dto';

@Injectable()
export class BookService {
    private readonly logger = new Logger(BookService.name);

    constructor(
        @InjectRepository(Book)
        private readonly bookRepository: Repository<Book>,
    ) {}

    async createBook(dto: BookDto) {
        this.logger.log(`Creating Book: ${JSON.stringify(dto)}`);
        const book = this.bookRepository.create(dto)

        try {
            return await this.bookRepository.save(book);
        }
        catch (error) {
            if (error instanceof QueryFailedError) {
                throw new RpcException(new ConflictException('Book already exists'));
            }
            throw new RpcException(new BadRequestException('Ops, we have some error while creating book.'));
        }
    }

    async updateBook(id: string, dto: BookDto) {
        const book = await this.getBookById(id);
        if (!book)
            throw new RpcException(new NotFoundException('Book Not Found'));
        try {
            book.author = dto.author;
            book.description = dto.description;
            book.file_url = dto.file_url;
            book.genre = dto.genre;
            book.publication_year = dto.publication_year;
            book.title = dto.title;
            return await this.bookRepository.save(book);
        }
        catch {
            throw new RpcException(new BadRequestException('Ops, we have some error while updating Book.'))
        }
    }

    async getAllBooks() {
        return await this.bookRepository.find();
    }

    async getBookById(id: string) {
        const book = await this.bookRepository.findOneBy({ id });
        if (!book)
            throw new RpcException(new NotFoundException('Book not found'));
        return book;
    }

    async getBooksByTitle(title: string) {
        return await this.bookRepository.findBy({ title });
    }

    async getBooksByAuthor(author: string) {
        return await this.bookRepository.findBy({ author })
    }
}
