import { Controller, Logger, Post, Param, Put, Body, Request, UseGuards, Get, UseFilters } from "@nestjs/common";
import { AuthGuard } from "src/guards/auth.guard";

import { BookService } from "./book.service";
import { UserExeptionFilter } from "../../exeption_filters/user-exeption.filter";
import { Book } from "./dto";


@Controller('book')
@UseFilters(new UserExeptionFilter())
export class BookController {
  private readonly logger = new Logger(BookController.name);

  constructor(private readonly bookService: BookService) {}

  @Post()
  @UseGuards(AuthGuard) 
  async createBook(@Body() book: Book) {
    this.logger.log('Adding a new book');
    return this.bookService.createBook(book);
  }

  @Get()
  async getAllBooks() {
    this.logger.log('Getting all books');
    return this.bookService.findAllBooks();
  }

  @Get(':id')
  async getBookById(@Param('id') id: string) {
    this.logger.log(`Getting book by id: ${id}`);
    return this.bookService.findBookById(id);
  }

  @Put(':id')
  @UseGuards(AuthGuard)
  async updateBook(@Param('id') id: string, @Body() book: Book) {
    this.logger.log(`Updating book with id ${id}`);
    return this.bookService.updateBook(id, book);
  }
    
}