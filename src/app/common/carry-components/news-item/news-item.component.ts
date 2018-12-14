import { Component, OnInit, HostBinding, Input, Output, EventEmitter } from '@angular/core';
import { NewsDetailService } from '../../../_services/news-detail.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-news-item',
  templateUrl: './news-item.component.html'
})
export class NewsItemComponent implements OnInit {
  @HostBinding('class') NewsItemComponentClass = 'app-news-item';

  @Input() miniCard;

  @Input() data;
  @Input() getClickEvent;
  @Output() catchClickEvent = new EventEmitter<any>();

  constructor(
    private _newsDetail: NewsDetailService,
    private _router: Router
  ) { }

  ngOnInit() {
  }

  setNewsDetailIntoService() {
    this._newsDetail.setNewsDetail(this.data);
    if (this.getClickEvent) {
      this.catchClickEvent.emit({
        clicked: true,
        data: this.data
      });
    } else {
      this._router.navigateByUrl('/detail');
    }
  }

}
