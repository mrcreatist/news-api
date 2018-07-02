
import { Component, OnInit, HostBinding } from '@angular/core';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html'
})
export class NavComponent implements OnInit {
  @HostBinding('class') NavComponentClass = 'app-nav';

  constructor(

  ) {}

  ngOnInit() {
  }
}
