
import { Component, OnInit, HostBinding } from '@angular/core';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html'
})
export class NavComponent implements OnInit {
  @HostBinding('class') NavComponentClass = 'app-nav';

  menuToggle = false;
  filterToggle = false;

  constructor(
  ) {}

  ngOnInit() {
  }

  openMenu() {
    this.menuToggle = !this.menuToggle;
    this.filterToggle = false;
  }

  openFilter() {
    this.filterToggle = !this.filterToggle;
    this.menuToggle = false;
  }
}
