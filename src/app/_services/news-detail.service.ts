import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NewsDetailService {

  newsDetail = {
    auhtor: '',
    description: '',
    publishedAt: '',
    source: {
      id: '',
      name: ''
    },
    title: '',
    url: '',
    urlToImage: ''
  };

  constructor() { }

  getNewsDetail() {
    return this.newsDetail;
  }

  setNewsDetail(news) {
    this.newsDetail = news;
  }
}
