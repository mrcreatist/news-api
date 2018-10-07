import { Component, OnInit, HostBinding, Input } from '@angular/core';
import { NewsDetailService } from '../../news-detail.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-news-item',
  templateUrl: './news-item.component.html'
})
export class NewsItemComponent implements OnInit {
  @HostBinding('class') NewsItemComponentClass = 'app-news-item';

  @Input() data;

  constructor(
    private _newsDetail: NewsDetailService,
    private _router: Router
  ) { }

  ngOnInit() {
  }

  setNewsDetailIntoService() {
    this._newsDetail.setNewsDetail(this.data);
    this._router.navigateByUrl('/detail');
  }

}