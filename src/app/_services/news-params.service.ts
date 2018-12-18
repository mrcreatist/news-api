import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class NewsParamsService {

  private _pageSize = 10;
  private _page = 1;

  initalParams = {
    search: '',
    source: '',
    language: 'en',
    sortBy: 'publishedAt',
    pageSize: this._pageSize,
    page: this._page,
    country: 'India',
    countryCode: 'in',
    sourceName: ''
  };

  private messageSource = new BehaviorSubject(this.initalParams);
  newsSource = this.messageSource.asObservable();

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
