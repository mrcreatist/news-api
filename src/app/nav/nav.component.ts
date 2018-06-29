import { NewsApiService } from './news-api.service';
import { Component, OnInit, HostBinding } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {
  @HostBinding('class') NavComponentClass = 'app-nav';

  posts = [];
  sources = [];
  showNews = false;

  private _search = '';
  private _source = 'the-verge';
  private _language = 'en';
  private _sortBy = 'publishedAt';
  private _pageSize = 20;
  private _page = 1;

  constructor(
    private _http: HttpClient,
    private _newsapi: NewsApiService
  ) { }

  ngOnInit() {
    this.getSourceList();
    this.getPosts();
  }


  getPosts() {
    this._newsapi.resetrequestParameter();

    this._newsapi.setParam('q', this.getSearch());
    this._newsapi.setParam('sources', this.getSource());
    this._newsapi.setParam('language', this.getLanguage());
    this._newsapi.setParam('sortBy', this.getSortBy());
    this._newsapi.setParam('pageSize', this.getPageSize());
    this._newsapi.setParam('page', this.getPage());

    const url = this._newsapi.requestUrl();
    this._http.get(url).subscribe(
      (res: any) => {
        this.posts = res.articles;
        this.showNews = true;
      },
      (err: any) => {
        console.log('GENERATING ERROR REPORT');
        console.log('Content-type:', this._newsapi.getContentType());
        console.log('Params', this._newsapi.getParam());
        console.log('Parameters', this._newsapi.getRequestParameter());
        console.log(err);
      }
    );
  }

  getSourceList() {
    this._http.get(this._newsapi.getSourcesList()).subscribe(
      (res: any) => {
        for (const src of res.sources) {
          this.sources.push({
            name: src.name,
            id: src.id,
            category: src.category,
            language: src.language,
            country: src.country
          });
        }
        // console.log(this.sources);
      },
      (error: any) => {}
    );
  }

  public getSearch() {
    return this._search;
  }
  public setSearch(value) {
    this._search = value;
  }

  public getSource() {
    return this._source;
  }
  public setSource(event): void {
    this._source = event.target.value;
    this.getPosts();
  }

  public getLanguage() {
    return this._language;
  }
  public setLanguage(value) {
    this._language = value;
  }

  public getSortBy() {
    return this._sortBy;
  }
  public setSortBy(value) {
    this._sortBy = value;
  }

  public getPageSize() {
    return this._pageSize;
  }
  public setPageSize(value) {
    this._pageSize = value;
  }

  public getPage() {
    return this._page;
  }
  public setPage(value) {
    this._page = value;
  }

  gotoLink(link) {
    // window.location.href = link;
  }

  showPost(post, index) {
    return post.title !== null ?
      ((index > 0) ? !(this.posts[index - 1].title === post.title) : true) :
      false;
  }
}
