import { SwPush } from '@angular/service-worker';
import { Component, OnInit, HostBinding } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NewsApiService } from '../common/news-api.service';
import { Router } from '@angular/router';
import { NewsDetailService } from '../common/news-detail.service';
import { NewsParamsService } from '../common/news-params.service';
import { IpService } from '../common/ip.service';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html'
})
export class FeedComponent implements OnInit {
  @HostBinding('class') FeedComponentClass = 'app-feed';

  readonly VAPID_PUBLIC_KEY = 'BIjq7HbZjhwdlkdzIb1SCYG3a9YEyxwN22A3S_PTWcZQSNppM0_TrLe0QGm_t39j4QVJBJe-Yg6jD2z29yuLY6k';

  source: any;
  country: any;

  posts = [];
  showNews = false;

  constructor(
    private _newsParams: NewsParamsService,
    private _newsapi: NewsApiService,
    private _newsDetail: NewsDetailService,
    private _ipService: IpService,
    private _router: Router,
    private swPush: SwPush
  ) { }

  ngOnInit() {
    this._newsParams.newsSource.subscribe(
      (res: any) => {
        if (res.source !== '') {
          this.showNews = false;
          this._newsapi.resetrequestParameter();
          this._newsapi.setParam('q', res.search);
          this._newsapi.setParam('sources', res.source);
          this._newsapi.setParam('language', res.language);
          this._newsapi.setParam('sortBy', res.sortBy);
          this._newsapi.setParam('pageSize', res.pageSize);
          this._newsapi.setParam('page', res.page);

          // assigning value to variables
          this.country = res.country;

          // get the parametrised news
          this.getPosts();
        }
      }
    );
  }

  getPosts() {
    this._newsapi.getNewsFromAPI().subscribe(
      (res: any) => {
        this.posts = res.articles;
        this.posts.length === 0 ? this.displayErrorMessage() : this.showNews = true;
      },
      (err: any) => {
        this.displayErrorMessage();
      }
    );
  }

  displayErrorMessage() {
    this.showNews = false;
    document.getElementById('load_text').innerHTML = 'An Error occured <br> try different source or country';
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
