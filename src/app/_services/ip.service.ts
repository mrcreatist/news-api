import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NewsParamsService } from './news-params.service';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class IpService {

  // readonly GET_IP_URL = 'https://jsonip.com';
  readonly USER_LOCATION_URL = 'http://ip-api.com/json/?callback';

  private countrySource = new BehaviorSubject('IN'.toLowerCase());
  countryCode = this.countrySource.asObservable();

  constructor(
    private _http: HttpClient
  ) { }

  getUserLocationDetails() {
    this._http.get(this.USER_LOCATION_URL).subscribe(
      (res: any) => {
        this.setCountrySource(res.countryCode);
      }
    );
  }

  setCountrySource(countryCode: any) {
    this.countrySource.next(countryCode);
  }
}
