import { NewsApiService } from './../common/news-api.service';
import { Component, OnInit, HostBinding } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NewsParamsService } from '../common/news-params.service';
import { Router } from '../../../node_modules/@angular/router';
import { IpService } from '../common/ip.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html'
})
export class NavComponent implements OnInit {
  @HostBinding('class') NavComponentClass = 'app-nav';

  menuToggle = false;
  filterToggle = false;

  newsSource: string;
  sources = [];

  country: string;
  sourceCountries = [];
  sourceListByCountry = [];

  selectedParams: any = {
    search: '',
    source: 'the-verge',
    language: 'en',
    sortBy: 'publishedAt',
    pageSize: this._newsParams.pageSize,
    page: this._newsParams.page
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
    }
  ];

  constructor(
    private _http: HttpClient,
    private _newsapi: NewsApiService,
    private _newsParams: NewsParamsService,
    private _ipService: IpService,
    private _router: Router
  ) {}

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

          // getting user location details
          this._ipService.getUserLocationDetails();
          this._ipService.countryCode.subscribe(
            (resp: any) => {
              // setting user's location country code
              this.country = this.countryExists(String(resp).toLowerCase()) ? String(resp).toLowerCase() : 'in';
              this.setCountry( { target: { value: this.country } } );
            }
          );

          // passing the source[0] to the BehaviourSubject service
          this.setSource( { target: { value: this.sourceListByCountry[0].id } } );
          this._newsParams.setNewsSource(this.selectedParams);
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


  // called through HTML
  setCountry(event): void {
    this.selectedParams.country = event.target.value;
    this.country = event.target.value;

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
    this.setSource({target: {value: this.sourceListByCountry[0].id}});
  }

  public setSource(event): void {
    this.selectedParams.source = event.target.value;
  }

  gotoSocialLink(icon: any) {
    window.open(icon.redirectTo, '_blank');
  }

  updateNewsParams() {
    this._newsParams.setNewsSource(this.selectedParams);
    if (this._router.url !== '/') {
      this._router.navigateByUrl('/');
      this.filterToggle = !this.filterToggle;
    } else {
      this.filterToggle = !this.filterToggle;
    }
  }
}
