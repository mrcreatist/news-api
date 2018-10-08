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

  sourceName: any;
  country: any;

  posts = [];
  paginationList = [];
  newsPageSizeArray = [];

  totalNumberOfNews = 0;
  selectedPage = 1;
  currentNewsPerPage = 10;
  paginationArray = 0;

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
    // adding value for the newsPageSizeArray list
    let i = 0;
    while (i !== 20) {
      // this.paginationList.push(i + 1);
      this.newsPageSizeArray.push(i + 1);
      i++;
    }

    // setting up the initial config for the news service
    this._newsParams.newsSource.subscribe(
      (res: any) => {
        if (res.source !== '') {
          this.showNews = false;
          this._newsapi.resetRequestParameter();
          this._newsapi.setParam('q', res.search);
          this._newsapi.setParam('sources', res.source);
          this._newsapi.setParam('language', res.language);
          this._newsapi.setParam('sortBy', res.sortBy);
          this._newsapi.setParam('pageSize', this.currentNewsPerPage);
          this._newsapi.setParam('page', this.selectedPage);

          // assigning value to variables
          this.country = res.country;
          this.sourceName = res.sourceName;

          // get the parametrised news
          this.getPosts();
        }
      }
    );
  }

  getPosts() {
    this._newsapi.getNewsFromAPI().subscribe(
      (res: any) => {
        this.totalNumberOfNews = res.totalResults;
        this.posts = res.articles;
        this.posts.length === 0 ? this.displayErrorMessage() : this.showNews = true;

        // calculating total number of pages
        this.paginationArray = Math.ceil(this.totalNumberOfNews / this.currentNewsPerPage);

        // resetting PaginationList
        this.paginationList = [];

        // adding values to the paginationList array from 0 to 'n'
        for (let i = 0; i < this.paginationArray; i++) {
          this.paginationList.push(i + 1);
        }
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

  showNewsAccordingToSelectedPage(event): void {
    this.selectedPage = event.target.value;
    this._newsapi.setParam('page', this.selectedPage);
    this.getPosts();
  }

  setNewsLimitPerPage(event): void {
    this.currentNewsPerPage = event.target.value;
    this._newsapi.setParam('pageSize', event.target.value);
    this.getPosts();
  }
}
