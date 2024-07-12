// src/chatgpt.service.ts
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { OpenAI } from 'openai';

@Injectable()
export class ChatGPTService {
    private readonly openai: OpenAI;

    constructor (
        private configService: ConfigService
    ) {
        const apiKey = this.configService.get<string>('openAiApiKey');
        this.openai = new OpenAI({ apiKey });
    }

    async summarizeText(articles: any): Promise<string> {
        const response = await this.openai.chat.completions.create({
            model: 'gpt-4',
            messages: [
                { role: 'system', content: 'Go to the URLs of every item in the array and summarize the page. Return a JSON object consisting of summarized title, summarized content under 150 words, URL to article and article image URL' },
                { role: 'user', content: JSON.stringify(articles) },
            ],
        });
        return response.choices[0].message.content;
    }
}
