import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ChatGPTService } from './chat-gpt/chat-gpt.service';
import configuration from './config/configuration';
import { NewsController } from './news/news.controller';
import { NewsService } from './news/news.service';

@Module({
  imports: [
    HttpModule,
    ConfigModule.forRoot({
      load: [configuration],
      isGlobal: true,
    }),
    MongooseModule.forRoot(process.env.DB_URL),
  ],
  controllers: [AppController, NewsController],
  providers: [AppService, NewsService, ChatGPTService],
})
export class AppModule { }
