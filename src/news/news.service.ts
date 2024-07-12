import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { lastValueFrom } from 'rxjs';
import { ChatGPTService } from 'src/chat-gpt/chat-gpt.service';
import { News, NewsDocument } from 'src/schemas/news.schema';

@Injectable()
export class NewsService {
    constructor (
        private readonly httpService: HttpService,
        private readonly configService: ConfigService,
        private readonly chatGPTService: ChatGPTService,
        @InjectModel(News.name) private newsModel: Model<NewsDocument>,
    ) { }

    async getNews(): Promise<any> {
        const apiKey = this.configService.get<string>('newsApiKey');
        const url = `https://newsapi.org/v2/top-headlines?country=in&apiKey=${apiKey}`;

        const response = await lastValueFrom(this.httpService.get(url));
        response.data.articles = response.data.articles.map((article: any) => {
            return {
                title: article?.title,
                description: article?.description,
                url: article?.url,
                urlToImage: article?.urlToImage
            }
        });
        return response.data;
    }

    async getSummarizedNews() {
        const newsData = await this.getNews();
        const articles = newsData.articles;

        const summarizedArticles = await this.chatGPTService.summarizeText(articles);
        const summary = JSON.parse(summarizedArticles);
        this.storeNewsInDatabase(summary)
        return summary;
    }

    async storeNewsInDatabase(articles: any[]) {
        articles.forEach(async (article: any) => {
            const summarizedArticle = new this.newsModel({
                title: article.title,
                description: article.description,
                url: article.url,
                imageUrl: article.urlToImage,
            });
            await summarizedArticle.save();
        });
    }
}
