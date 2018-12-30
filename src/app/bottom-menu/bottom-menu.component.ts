import { Component, OnInit, HostBinding } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-bottom-menu',
  templateUrl: './bottom-menu.component.html',
  styleUrls: ['./bottom-menu.component.scss']
})
export class BottomMenuComponent implements OnInit {
  @HostBinding('class') BottomMenuComponentClass = 'app-bottom-menu';

  menu = [
    {
      id: 1,
      name: 'Top Headlines',
      icon: 'line_style',
      url: '/feed/top-headlines',
      active: false
    },
    {
      id: 2,
      name: 'Everything',
      icon: 'waves',
      url: '/feed/everything',
      active: false
    },
    {
      id: 3,
      name: 'Search',
      icon: 'search',
      url: '/search',
      active: false
    },
    {
      id: 4,
      name: 'About',
      icon: 'info',
      url: '/about',
      active: false
    }
  ];

  constructor(
    private _router: Router
  ) { }

  ngOnInit() {
    // for (let i = 0; i < this.menu.length; i++) {
    //   this.menu[i].active = this.menu[i].url === this._router.url;
    // }
    // console.log(this._router.url, this.menu);
  }

  gotoPage(item: any) {
    for (let i = 0; i < this.menu.length; i++) {
      this.menu[i].active = this.menu[i].id === item.id;
    }
    this._router.navigateByUrl(item.url);
  }

}
