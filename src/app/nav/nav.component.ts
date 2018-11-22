import { NewsApiService } from '../_services/news-api.service';
import { Component, OnInit, HostBinding, PipeTransform } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NewsParamsService } from '../_services/news-params.service';
import { Router } from '../../../node_modules/@angular/router';
import { IpService } from '../_services/ip.service';
import { SortPipe } from '../common/sort.pipe';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html'
})
export class NavComponent implements OnInit {
  @HostBinding('class') NavComponentClass = 'app-nav';

  searchResult: any;

  menuToggle = false;
  filterToggle = false;
  searchView = false;
  showSearchResultDetail = false;
  showSwitcher = false;

  newsSource: string;
  country: string;

  sources = [];
  sourceCountries = [];
  sourceListByCountry = [];

  selectedParams: any = {
    search: '',
    source: '',
    language: 'en',
    sortBy: 'publishedAt',
    pageSize: this._newsParams.pageSize,
    page: this._newsParams.page,
    country: '',
    sourceName: ''
  };

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
    },
    {
      name: 'GitHub',
      location: 'assets/social-media/github.svg',
      redirectTo: 'https://github.com/MrCreatist'
    },
  ];

  constructor(
    private _http: HttpClient,
    private _newsapi: NewsApiService,
    private _newsParams: NewsParamsService,
    private _ipService: IpService,
    private _router: Router,
    private _sort: SortPipe
  ) { }

  ngOnInit() {
    this.getSourceList();
  }

  menuToggler() {
    this.menuToggle = !this.menuToggle;
    this.filterToggle = false;
  }

  filterToggler() {
    this.filterToggle = !this.filterToggle;
    this.menuToggle = false;
  }

  getSourceList() {
    this._newsapi.getSourcesList().subscribe(
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

          // setting sourceList from response
          for (let i = 0; i < response.length; i++) {
            this.sourceCountries[i].name = response[i].name;
          }

          // Sorting countries in ascending order
          this.sourceCountries = this._sort.transform(this.sourceCountries, 'asc');

          // getting user location details
          this._ipService.getUserLocationDetails();
          this._ipService.countryCode.subscribe(
            (resp: any) => {
              // setting user's location country code
              this.country = this.countryExists(String(resp).toLowerCase()) ? String(resp).toLowerCase() : 'in';

              // mapping country name againt selectedParams.country
              for (const country of this.sourceCountries) {
                if (country.code === this.country) {
                  this.selectedParams.country = country.name;
                }
              }
              this.setCountry({ target: { value: this.country } });
            }
          );

          // sorting source by country in ascending order
          this.sourceListByCountry = this._sort.transform(this.sourceListByCountry, 'asc');

          // passing the source[0] to the BehaviourSubject service
          this.setSource({ target: { value: this.sourceListByCountry[0].id } });
          // this._newsParams.setNewsSource(this.selectedParams);
        });
      },
      (error: any) => { }
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

  // called through HTML
  setCountry(event): void {
    this.selectedParams.country = event.target.value;
    this.country = event.target.value;

    // mapping country name againt selectedParams.country
    for (const country of this.sourceCountries) {
      if (country.code === this.country) {
        this.selectedParams.country = country.name;
      }
    }

    // getting sourceList
    this.sourceListByCountry = [];
    for (const src of this.sources) {
      if (event.target.value === src.country) {
        this.sourceListByCountry.push({
          id: src.id,
          name: src.name
        });
      }
    }
    this.setSource({ target: { value: this.sourceListByCountry[0].id } });
  }

  public setSource(event): void {
    this.selectedParams.source = event.target.value;
    for (let i = 0; i < this.sources.length; i++) {
      if (this.sources[i].id === event.target.value) {
        this.selectedParams.sourceName = this.sources[i].name;
        break;
      }
    }
  }

  gotoSocialLink(icon: any) {
    window.open(icon.redirectTo, '_blank');
  }

  updateNewsParams() {
    this._newsParams.setNewsSource(this.selectedParams);
    if (this._router.url !== '/feed') {
      this.gotoFeed();
      this.filterToggle = !this.filterToggle;
    } else {
      this.filterToggle = !this.filterToggle;
    }
  }

  searchNews(value: string) {
    if (value !== '') {
      this.searchView = true;
      this.showSwitcher = true;
      this._newsParams.newsSource.subscribe(
        (res: any) => {
          this._newsapi.resetRequestParameter();
          this._newsapi.setParam('q', value);
          this._newsapi.getNewsFromAPI().subscribe(
            (response: any) => {
              this.searchResult = response;
            }
          );
        }
      );
    }
  }

  newsItemClicked(clickEvent: any) {
    if (clickEvent.clicked) {
      this.showSearchResultDetail = true;
    }
  }

  exitDetail(clickEvent: any) {
    if (clickEvent.backButtonClicked) {
      this.showSearchResultDetail = false;
    }
  }

  gotoFeed() {
    this._router.navigateByUrl('/feed');
  }
}
