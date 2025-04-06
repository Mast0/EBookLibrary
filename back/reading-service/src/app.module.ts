import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ReadingModule } from './modules/reading/reading.module';

@Module({
  imports: [ReadingModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
