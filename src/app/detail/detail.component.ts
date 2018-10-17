import { Component, OnInit, HostBinding, Input, Output, EventEmitter } from '@angular/core';
import { NewsDetailService } from '../common/news-detail.service';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html'
})
export class DetailComponent implements OnInit {
  @HostBinding('class') DetailComponentClass = 'app-detail';

  @Input() inSearchMode;
  @Output() returnPreviousEvent = new EventEmitter<any>();

  detail: any;

  constructor(
    private _newsDetail: NewsDetailService,
    private _router: Router,
    private _location: Location
  ) { }

  ngOnInit() {
    window.scroll(0, 0);
    this.detail = this._newsDetail.getNewsDetail();
  }

  goBack() {
    if (this.inSearchMode) {
      this.returnPreviousEvent.emit({
        backButtonClicked: true
      });
    } else {
      this._location.back();
    }
  }

  gotoSource() {
    window.open(this.detail.url, '_blank');
  }

  gotoFeed() {
    this._router.navigateByUrl('/');
  }
}
