import { NewsApiService } from './../common/news-api.service';

import { Component, OnInit, HostBinding } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html'
})
export class NavComponent implements OnInit {
  @HostBinding('class') NavComponentClass = 'app-nav';

  readonly COUNTRY_API_URL = `https://restcountries.eu/rest/v2/alpha`;
  private _COUNTRY_URL_TYPE = `codes`;

  private _source = 'the-verge';

  menuToggle = false;
  filterToggle = false;

  sources = [];
  sourceCountries = [];
  sourceListByCountry = [];

  constructor(
    private _http: HttpClient,
    private _newsapi: NewsApiService,
  ) {}

  ngOnInit() {
    this.getSourceList();
  }

  openMenu() {
    this.menuToggle = !this.menuToggle;
    this.filterToggle = false;
  }

  openFilter() {
    this.filterToggle = !this.filterToggle;
    this.menuToggle = false;
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
  }

  public setSource(event): void {
    this._source = event.target.value;
    // this.getPosts();
  }
}
