import { Component, OnInit, HostBinding } from '@angular/core';
import { Router } from '@angular/router';
import * as global from '../globals';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html'
})
export class LandingComponent implements OnInit {
  @HostBinding('class') LandingComponentClass = 'app-landing';

  appName = global.appName;
  developerName = global.appDeveloper;
  designation = global.designation;
  workingPlace = global.worksAt;

  featureList = [
    {
      id: 1,
      feature: '100% trusted sources',
      description: 'News from all the trusted sources',
      rtl: false,
      icon: 'address-card',
      iconType: 'fas'
    },
    {
      id: 2,
      feature: 'Latest News',
      description: 'stay updated with latest news',
      rtl: false,
      icon: 'mail-bulk',
      iconType: 'fas'
    },
    {
      id: 3,
      feature: 'Small App Size',
      description: 'Only big news not the app size',
      rtl: false,
      icon: 'sort-amount-down',
      iconType: 'fas'
    },
    {
      id: 4,
      feature: 'Favourite sources',
      description: 'all sources at one place',
      rtl: false,
      icon: 'heart',
      iconType: 'fas'
    },
    {
      id: 5,
      feature: 'Dark Theme',
      description: 'Read anytime',
      rtl: false,
      icon: 'palette',
      iconType: 'fas'
    },
    {
      id: 6,
      feature: 'All Screen, same news',
      description: 'News on all screens',
      rtl: false,
      icon: 'laptop',
      iconType: 'fas'
    }
  ];
  sociaIcons = global.socialMedia;

  constructor(
    private _router: Router
  ) { }

  ngOnInit() {
  }

  gotoFeed() {
    this._router.navigateByUrl('/feed');
  }

  gotoSocialLink(icon: any) {
    window.open(icon.redirectTo, '_blank');
  }

}
