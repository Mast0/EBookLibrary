import { Controller, Logger, Post, Param, Put, Body, UseGuards, Get, UseFilters, UploadedFile, UseInterceptors, Req, Header, Res } from "@nestjs/common";
import { Response } from "express";
import { AuthGuard } from "src/guards/auth.guard";
import { FileInterceptor } from "@nestjs/platform-express";
import { diskStorage } from "multer";

import * as fs from 'fs';
import * as path from 'path';
import * as pdfParse from 'pdf-parse';

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
  @UseInterceptors(FileInterceptor('file', {
    storage: diskStorage({
      destination: './uploads',
      filename: (req, file, callback) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        callback(null, `${uniqueSuffix}${path.extname(file.originalname)}`);
      }
    })
  }))
  async createBook(
    @Req() req,
    @UploadedFile() file: Express.Multer.File) {
    const { filename, path: filePath } = file;

    const pdfBuffer = fs.readFileSync(filePath);
    const pdfData = await pdfParse(pdfBuffer);
    const pages = pdfData.numpages;

    const bookDto = {
      title: req.body.title,
      author: req.body.author,
      genre: req.body.genre,
      description: req.body.description,
      publication_year: Number(req.body.publication_year),
      file_url: `/uploads/${filename}`,
      pages: pages
    };

    this.logger.log('Adding a new book with file');
    return this.bookService.createBook(bookDto);
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

  @Get(':id/pdf')
  @Header('Content-Type', 'application/pdf')
  @Header('Content-Disposition', 'inline; filename="book.pdf"')
  async getBookPdf(@Param('id') id: string, @Res() res: Response) {
    const stream = await this.bookService.getBookPdfStream(id);

    stream.on('error', err => {
      res.status(404).send('File not found');
    });
    
    stream.pipe(res);
  }

  @Put(':id')
  @UseGuards(AuthGuard)
  async updateBook(@Param('id') id: string, @Body() book: Book) {
    this.logger.log(`Updating book with id ${id}`);
    return this.bookService.updateBook(id, book);
  }
    
}