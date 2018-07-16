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

  menuToggle = false;
  filterToggle = false;

  sources = [];
  sourceCountries = [];
  sourceListByCountry = [];

  sociaIcons = [
    {
      name: 'Facebook',
      location: 'assets/social-media/facebook.svg',
      redirectTo: 'https://www.facebook.com/MrCreatist/'
    },
    {
      name: 'Twitter',
      location: 'assets/social-media/twitter.svg',
      redirectTo: 'https://twitter.com/mrcreatist'
    },
    {
      name: 'Instagram',
      location: 'assets/social-media/instagram.svg',
      redirectTo: 'https://www.instagram.com/mrcreatist/'
    },
    {
      name: 'LinkedIn',
      location: 'assets/social-media/linkedin.svg',
      redirectTo: 'https://www.linkedin.com/in/mrcreatist/'
    }
  ];

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

          // setting custom sources array
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

        // one step is left for sorting

        // Updating sourceCountries[i].name
        this._newsapi.setCountryQuery(this.sourceCountries);
        this._newsapi.getCountryList().subscribe((response: any) => {
          for (let i = 0; i < response.length; i++) {
            this.sourceCountries[i].name = response[i].name;
          }
        });
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


  // called from HTML
  setCountry(event): void {
    this.sourceListByCountry = [];

    for (const src of this.sources) {
      if (event.target.value === src.country) {
        // console.log(src);
        this.sourceListByCountry.push({
          id: src.id,
          name: src.name
        });
      }
    }
    // console.log(this.sourceListByCountry);
  }

  public setSource(event): void {
    const newsSource = event.target.value;
    // this.getPosts();
  }

  gotoSocialLink(icon: any) {
    window.open(icon.redirectTo, '_blank');
  }
}
