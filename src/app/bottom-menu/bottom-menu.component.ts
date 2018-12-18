import { Component, OnInit, HostBinding } from '@angular/core';

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
      icon: 'line_style'
    },
    {
      id: 2,
      name: 'Everything',
      icon: 'waves'
    },
    {
      id: 3,
      name: 'Search',
      icon: 'search'
    }
  ];

  constructor() { }

  ngOnInit() {
  }

}
