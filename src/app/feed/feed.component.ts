import { SwPush } from '@angular/service-worker';
import { Component, OnInit, HostBinding } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NewsApiService } from '../common/news-api.service';
import { Router } from '@angular/router';
import { NewsDetailService } from '../common/news-detail.service';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html'
})
export class FeedComponent implements OnInit {
  @HostBinding('class') FeedComponentClass = 'app-feed';

  readonly VAPID_PUBLIC_KEY = 'BIjq7HbZjhwdlkdzIb1SCYG3a9YEyxwN22A3S_PTWcZQSNppM0_TrLe0QGm_t39j4QVJBJe-Yg6jD2z29yuLY6k';

  posts = [];
  showNews = false;

  private _search = '';
  private _source = 'the-verge';
  private _language = 'en';
  private _sortBy = 'publishedAt';
  private _pageSize = 10;
  private _page = 1;

  constructor(
    private _http: HttpClient,
    private _router: Router,
    private _newsapi: NewsApiService,
    private _newsDetail: NewsDetailService,

    private swPush: SwPush
  ) { }

  ngOnInit() {
    // this.getSourceList();
    this.getPosts();
  }

  getPosts() {
    this._newsapi.resetrequestParameter();

    this._newsapi.setParam('q', this._search);
    this._newsapi.setParam('sources', this._source);
    this._newsapi.setParam('language', this._language);
    this._newsapi.setParam('sortBy', this._sortBy);
    this._newsapi.setParam('pageSize', this._pageSize);
    this._newsapi.setParam('page', this._page);

    this._newsapi.getNewsFromAPI().subscribe(
      (res: any) => {
        this.posts = res.articles;
        this.showNews = true;
      },
      (err: any) => {
        console.log('GENERATING ERROR REPORT');
        console.log('Content-type:', this._newsapi.CONTENT_TYPE);
        console.log('Params', this._newsapi.getFinalParam());
        console.log('Parameters', this._newsapi.requestParameter);
        console.log(err);
      }
    );
  }

  newsDetail(news: any) {
    // console.log(news);
    this._newsDetail.setNewsDetail(news);
    this._router.navigateByUrl('/detail');
  }

  showPost(post, index) {
    return post.title !== null
      ? index > 0
        ? !(this.posts[index - 1].title === post.title)
        : true
      : false;
  }

  subscribeToNotifications() {
    // this.swPush.requestSubscription({
    //   serverPublicKey: this.VAPID_PUBLIC_KEY
    // })
    //   .then(sub => this.newsletterService.addPushSubscriber(sub).subscribe())
    //   .catch(err => console.error('Could not subscribe to notifications', err));
  }
}
