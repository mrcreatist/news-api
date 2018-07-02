import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NewsApiService {

  /*
   *   IN CASE IF YOU WANT TO REFER THE DOCUMNETATION.
   *   https://newsapi.org/docs/endpoints/everything
   */

  readonly API_KEY = '04e45108448f40bfb3f4dfbc5a639f8c';

  private _ROOT_URL = `https://newsapi.org/v2`;
  private _CONTENT_TYPE = 'everything';
  readonly TEST_URL = `https://newsapi.org/v2/everything?language=en&sources=google-news-in&apiKey=04e45108448f40bfb3f4dfbc5a639f8c`;

  private _requestParameter = [];

  constructor() { }

  public getContentType() {
    return this._CONTENT_TYPE;
  }
  public setContentType(value) {
    this._CONTENT_TYPE = value;
  }

  public getRequestParameter() {
    return this._requestParameter;
  }
  public resetrequestParameter() {
    this._requestParameter = [];
  }

  setParam(paramType: string, paramData: any) {
    this._requestParameter.push({
      type: paramType,
      data: paramData
    });
  }

  getParam() {
    // `q=${this._search}&` +
    let param = '';
    for (const request of this._requestParameter) {
      param += `${request.type}=${request.data}&`;
    }
    return param;
  }

  // CASTING FINAL REQUEST
  public requestUrl() {
    return `${this._ROOT_URL}/${this._CONTENT_TYPE}?${this.getParam()}apiKey=${this.API_KEY}`;
  }

  // GETTING NEWS SOURCES
  public getSourcesList() {
    return `${this._ROOT_URL}/sources?apiKey=${this.API_KEY}`;
  }

}
