import { Injectable, Logger, Inject } from "@nestjs/common";
import { ClientProxy, RpcException } from "@nestjs/microservices";
import { timeout, catchError, throwError, firstValueFrom } from "rxjs";
import { Reading } from "./dto/reading";
import { patterns } from "../patterns";

@Injectable()
export class ReadingService {
  private readonly logger = new Logger(ReadingService.name);

  constructor(
    @Inject('READING_SERVICE') private readonly userClient: ClientProxy,
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

  async createReading(dto: Reading) {
    this.logger.log('Creating reading');
    return this.send(patterns.READING.CREATE, dto);
  }

  async findReadings(id: string) {
    this.logger.log('Finding readings');
    return this.send(patterns.READING.FIND_ALL, {});
  }

  async updateReading(id: string, dto: Reading) {
    this.logger.log('Updating reading');
    return this.send(patterns.READING.UPDATE, { id, dto });
  }
}