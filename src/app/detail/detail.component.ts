import { Component, OnInit, HostBinding } from '@angular/core';
import { NewsDetailService } from '../common/news-detail.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html'
})
export class DetailComponent implements OnInit {
  @HostBinding('class') DetailComponentClass = 'app-detail';

  detail: any;

  constructor(
    private _newsDetail: NewsDetailService,
    private _router: Router
  ) { }

  ngOnInit() {
    window.scroll(0, 0);
    this.detail = this._newsDetail.getNewsDetail();
  }

  gotoSource() {
    window.open(this.detail.url, '_blank');
  }

  gotoFeed() {
    this._router.navigateByUrl('/');
  }
}
