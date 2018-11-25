import { Component, OnInit, HostBinding } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html'
})
export class FooterComponent implements OnInit {
  @HostBinding('class') FooterComponentClass = 'app-footer';

  constructor() { }

  ngOnInit() {
  }

}
