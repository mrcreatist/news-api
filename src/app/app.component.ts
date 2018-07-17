import { Component, HostBinding, OnInit } from '@angular/core';
import { SwUpdate } from '../../node_modules/@angular/service-worker';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  @HostBinding('class') AppComponent = 'app-root';
  // title = 'app';

  constructor(
    private swUpdate: SwUpdate
  ) { }

  ngOnInit() {
    if (this.swUpdate.isEnabled) {
      this.swUpdate.available.subscribe(() => {
        if (confirm('New version available. Load New Version?')) {
          window.location.reload();
        }
      });
    }
  }
}
