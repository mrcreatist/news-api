import { Component, OnInit, HostBinding } from '@angular/core';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html'
})
export class AboutComponent implements OnInit {
  @HostBinding('class') AboutComponentClass = 'app-about';

  constructor() { }

  ngOnInit() {
  }

}
