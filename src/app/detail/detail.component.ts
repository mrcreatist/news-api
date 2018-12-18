import { Component        , OnInit, HostBinding, Input, Output, EventEmitter } from '@angular/core'                   ;
import { NewsDetailService                                                   } from '../_services/news-detail.service';
import { Router                                                              } from '@angular/router'                 ;
import { Location                                                            } from '@angular/common'                 ;
import { NewsCarryService } from '../_services/news-carry.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html'
})
export class DetailComponent implements OnInit {
  @HostBinding('class') DetailComponentClass = 'app-detail';

  @Input() inSearchMode;
  @Output() returnPreviousEvent = new EventEmitter<any>();

  detail: any;
  moreNews: any;

  constructor(
    private _newsDetail: NewsDetailService,
    private _newsCarry: NewsCarryService,

    private _router: Router,
    private _location: Location
  ) { }

  ngOnInit() {
    window.scroll(0, 0);
    this.detail = this._newsDetail.getNewsDetail();
    this.moreNews = this._newsCarry.excludeNewsFromArray(this.detail);

    // if no data then redirect home
    if (this.detail.source.name === '') {
      this.gotoFeed();
    }
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
    this._router.navigateByUrl('/feed/top-headlines');
  }

  doIntentOnNewsClick(value: any) {
    if (value.clicked) {
      this._newsDetail.setNewsDetail(value.data);
      this.ngOnInit();
    }

  }
}
