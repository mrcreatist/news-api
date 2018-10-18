import { Component, OnInit, HostBinding } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent implements OnInit {
  @HostBinding('class') LandingComponentClass = 'app-landing';

  constructor(
    private _router: Router
  ) { }

  ngOnInit() {
  }

  gotoFeed() {
    this._router.navigateByUrl('/feed');
  }

}
