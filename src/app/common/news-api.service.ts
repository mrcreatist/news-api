import { Injectable } from '@angular/core';
import { HttpClient } from '../../../node_modules/@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class NewsApiService {

  /*
   *   IN CASE IF YOU WANT TO REFER THE DOCUMNETATION.
   *   https://newsapi.org/docs/endpoints/everything
   */

  //  NEWS API
  readonly API_KEY = '04e45108448f40bfb3f4dfbc5a639f8c';
  private _ROOT_URL = `https://newsapi.org/v2`;
  private _CONTENT_TYPE = 'everything';

  private _requestParameter = [];


  // COUNTRY NAMES
  readonly COUNTRY_API_URL = `https://restcountries.eu/rest/v2/alpha`;
  private _COUNTRY_URL_TYPE = `codes`;

  private _country_query = '';


  constructor(
    private _http: HttpClient
  ) { }


  public get CONTENT_TYPE() {
    return this._CONTENT_TYPE;
  }
  public set CONTENT_TYPE(value) {
    this._CONTENT_TYPE = value;
  }

  public get requestParameter() {
    return this._requestParameter;
  }
  public set requestParameter(value) {
    this._requestParameter = value;
  }

  public getRequestParameter() {
    return this._requestParameter;
  }
  public resetRequestParameter() {
    this._requestParameter = [];
  }

  setParam(paramType: string, paramData: any) {
    let count = 0;
    this._requestParameter.filter((parameter: any) => (parameter.type === paramType ? parameter.data = paramData : count++));
    if (this._requestParameter.length === count) {
      this._requestParameter.push({
        type: paramType,
        data: paramData
      });
    }
  }

  getFinalParam() {
    let param = '';
    for (const request of this._requestParameter) {
      param += `${request.type}=${request.data}&`;
    }
    return param;
  }

  // PLACING FINAL NEWS API REQUEST
  public getNewsFromAPI() {
    return this._http.get(`${this._ROOT_URL}/${this._CONTENT_TYPE}?${this.getFinalParam()}apiKey=${this.API_KEY}`);
  }

  // GETTING NEWS API SOURCES
  public getSourcesList() {
    return this._http.get(`${this._ROOT_URL}/sources?apiKey=${this.API_KEY}`);
  }

  public setCountryQuery(sourceCountries: any) {
    for (let i = 0; i < sourceCountries.length; i++) {
      this._country_query +=
        sourceCountries[i].code +
        (i + 1 === sourceCountries.length ? '' : ';');
    }
  }

  public getCountryList() {
    return this._http.get(`${this.COUNTRY_API_URL}?${this._COUNTRY_URL_TYPE}=${this._country_query}`);
  }
}
