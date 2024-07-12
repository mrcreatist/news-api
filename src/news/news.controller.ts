import { Controller, Get } from '@nestjs/common';
import { NewsService } from './news.service';

@Controller('news')
export class NewsController {
    constructor (private readonly newsService: NewsService) { }

    @Get()
    async getNews() {
        return await this.newsService.getNews();
    }

    @Get('summarized')
    async getSummarizedNews() {
        return await this.newsService.getSummarizedNews();
    }
}
