import { Component, OnInit, HostBinding } from '@angular/core';
import { NewsParamsService } from '../_services/news-params.service';
import { NewsApiService } from '../_services/news-api.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  @HostBinding('class') SearchComponentClass = 'app-search';

  searchResult: any;

  constructor(
    private _newsParams: NewsParamsService,
    private _newsapi: NewsApiService,
  ) { }

  ngOnInit() {
  }

  searchNews(value: string) {
    this._newsParams.newsSource.subscribe(
      (res: any) => {
        this._newsapi.resetRequestParameter();
        this._newsapi.setParam('q', value);
        this._newsapi.getNewsFromAPI().subscribe(
          (response: any) => {
            console.log(response);
            this.searchResult = response.articles.length > 0 ? response.articles : null;
          }
        );
      }
    );
  }

}
