import { Injectable } from '@angular/core';
import { BehaviorSubject } from '../../../node_modules/rxjs';

@Injectable()
export class NewsParamsService {

  initalParams = {
    search: '',
    source: '',
    language: 'en',
    sortBy: 'publishedAt',
    pageSize: this.pageSize,
    page: this.page,
    country: 'India'
  };

  private messageSource = new BehaviorSubject(this.initalParams);
  newsSource = this.messageSource.asObservable();

  private _pageSize = 10;
  private _page = 1;

  constructor() { }

  setNewsSource(message: any) {
    this.messageSource.next(message);
  }

  public get pageSize(): number {
    return this._pageSize;
  }
  public set pageSize(value: number) {
    this._pageSize = value;
  }

  public get page(): number {
    return this._page;
  }
  public set page(value: number) {
    this._page = value;
  }
}
