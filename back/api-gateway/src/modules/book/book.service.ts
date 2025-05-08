import { Injectable, Logger, Inject } from "@nestjs/common";
import { ClientProxy, RpcException } from "@nestjs/microservices";
import { timeout, catchError, throwError, firstValueFrom } from "rxjs";
import { Book } from "./dto";
import { patterns } from "../patterns";
import { Readable } from "stream";
import { createReadStream } from "fs";
import * as path from "path";

@Injectable()
export class BookService {
  private readonly logger = new Logger(BookService.name);

  constructor(
    @Inject('BOOK_SERVICE') private readonly userClient: ClientProxy,
  ) {}

  private send(pattern: any, data: any): Promise<any> {
    const res$ = this.userClient.send(pattern, data).pipe(
      timeout(3000),
      catchError((e: Error) => {
        this.logger.error(e);
        return throwError(() => new RpcException(e));
      }),
    );

    return firstValueFrom(res$);
  }

  async createBook(dto: Book) {
    this.logger.log('Creating book');
    return this.send(patterns.BOOK.CREATE, dto);
  }

  async findAllBooks() {
    this.logger.log('Finding all books');
    return this.send(patterns.BOOK.FIND_ALL, {});
  }

  async findBookById(id: string) {
    this.logger.log(`Finding book by id: ${id}`);
    return this.send(patterns.BOOK.FIND_BY_ID, { id });
  }

  async updateBook(id: string, dto: Book) {
    this.logger.log(`Updating book with id: ${id}`);
    return this.send(patterns.BOOK.UPDATE, { id, dto });
  }

  async findBookByTitle(title: string) {
    this.logger.log(`Finding book by title: ${title}`);
    return this.send(patterns.BOOK.FIND_BY_TITLE, { title });
  }

  async findBookByAuthor(author: string) {
    this.logger.log(`Finding book by title: ${author}`);
    return this.send(patterns.BOOK.FIND_BY_AUTHOR, { author });
  }

  async getBookPdfStream(id: string): Promise<Readable> {
    this.logger.log(`Finding book path by book id: ${id}`);

    const book: Book = await this.send(patterns.BOOK.FIND_BY_ID, { id });
    const file_url = path.join(process.cwd(), book.file_url)

    this.logger.log(`Resolved file path: ${file_url}`);

    return createReadStream(file_url);
  }
}