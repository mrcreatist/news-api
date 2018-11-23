import { Component, OnInit, HostBinding } from '@angular/core';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html'
})
export class LoaderComponent implements OnInit {
  @HostBinding('class') LoaderComponentClass = 'app-loader';

  constructor() { }

  ngOnInit() {
  }

}
