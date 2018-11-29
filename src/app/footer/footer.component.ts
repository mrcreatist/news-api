import { Component, OnInit, HostBinding } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html'
})
export class FooterComponent implements OnInit {
  @HostBinding('class') FooterComponentClass = 'app-footer';

  pages = [
    {
      name: 'Welcome',
      url: '/'
    },
    {
      name: 'Feed',
      url: '/feed'
    }
  ];

  constructor(
    private _router: Router
  ) { }

  ngOnInit() {
  }

  gotoPage(page: any) {
    this._router.navigateByUrl(page.url);
  }

}
