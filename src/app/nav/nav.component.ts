import { NewsApiService } from './news-api.service';
import { Component, OnInit, HostBinding } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SwPush } from '@angular/service-worker';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {
  @HostBinding('class') NavComponentClass = 'app-nav';

  readonly VAPID_PUBLIC_KEY = 'BIjq7HbZjhwdlkdzIb1SCYG3a9YEyxwN22A3S_PTWcZQSNppM0_TrLe0QGm_t39j4QVJBJe-Yg6jD2z29yuLY6k';

  readonly COUNTRY_API_URL = `https://restcountries.eu/rest/v2/alpha`;
  private _COUNTRY_URL_TYPE = `codes`;

  posts = [];
  sources = [];
  sourceCountries = [];
  sourceListByCountry = [];
  showNews = false;

  private _search = 'microsoft';
  private _source = '';
  private _language = 'en';
  private _sortBy = 'publishedAt';
  private _pageSize = 10;
  private _page = 1;

  constructor(
    private _http: HttpClient,
    private _newsapi: NewsApiService,
    private swPush: SwPush,
  ) {}

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
          if (src.country === 'zh') {
            continue;
          }
          this.sources.push({
            name: src.name,
            id: src.id,
            category: src.category,
            language: src.language,
            country: src.country
          });

          // SETTING COUNTRY LIST
          if (!this.countryExists(src.country)) {
            this.sourceCountries.push({
              name: '',
              code: src.country
            });
          }
        }
        this.updateCountryNames();
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
    window.open(link, '_blank');
  }

  showPost(post, index) {
    return post.title !== null
      ? index > 0
        ? !(this.posts[index - 1].title === post.title)
        : true
      : false;
  }

  countryExists(countryCode): boolean {
    for (const country of this.sourceCountries) {
      if (country.code === countryCode) {
        return true;
      }
    }
    return false;
  }

  updateCountryNames() {
    let query = '';
    let url = '';
    for (let i = 0; i < this.sourceCountries.length; i++) {
      query +=
        this.sourceCountries[i].code +
        (i + 1 === this.sourceCountries.length ? '' : ';');
    }

    url = this.COUNTRY_API_URL + '?' + this._COUNTRY_URL_TYPE + '=' + query;

    this._http.get(url).subscribe((response: any) => {
      for (let res = 0; res < response.length; res++) {
        this.sourceCountries[res].name = response[res].name;
      }
    });
  }

  setCountry(event): void {
    // console.log(event.target.value);
    this.sourceListByCountry = [];
    for (const src of this.sources) {
      if (event.target.value === src.country) {
        console.log(src);
        this.sourceListByCountry.push({
          id: src.id,
          code: src.id,
          name: src.name
        });
      }
    }
    console.log(this.sourceListByCountry);
    // this.getPosts();
  }

  subscribeToNotifications() {
    // this.swPush.requestSubscription({
    //   serverPublicKey: this.VAPID_PUBLIC_KEY
    // })
    //   .then(sub => this.newsletterService.addPushSubscriber(sub).subscribe())
    //   .catch(err => console.error('Could not subscribe to notifications', err));
  }
}
