import { SwPush } from '@angular/service-worker';
import { Component, OnInit, HostBinding } from '@angular/core';
import { NewsApiService } from '../_services/news-api.service';
import { Router } from '@angular/router';
import { NewsDetailService } from '../_services/news-detail.service';
import { NewsParamsService } from '../_services/news-params.service';
import { IpService } from '../_services/ip.service';
import { NewsCarryService } from '../_services/news-carry.service';

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
  headingText = {
    topHeadline: 'Top Headlines',
    everything: 'Everything'
  };

  totalNumberOfNews = 0;
  selectedPage = 1;
  currentNewsPerPage = 40;
  paginationArray = 0;
  headingTextToShow: string;

  showNews = false;

  constructor(
    private _newsParams: NewsParamsService,
    private _newsapi: NewsApiService,
    private _newsCarry: NewsCarryService,

    private swPush: SwPush
  ) { }

  ngOnInit() {
    // setting up the initial config for the news service
    this._newsParams.newsSource.subscribe(
      (res: any) => {
        this.headingTextToShow = res.source !== '' ? this.headingText.everything : this.headingText.topHeadline;
        this.sourceName = res.sourceName;

        this.showNews = false;
        this._newsapi.resetRequestParameter();
        this._newsapi.setParam('q', res.search);
        this._newsapi.setParam('sources', res.source);
        this._newsapi.setParam('language', res.language);
        this._newsapi.setParam('sortBy', res.sortBy);
        this._newsapi.setParam('pageSize', this.currentNewsPerPage);
        this._newsapi.setParam('page', this.selectedPage);

        // only for top-headlines
        if (this.headingTextToShow === this.headingText.topHeadline) {
          this._newsapi.setParam('country', res.countryCode);
        }

        // assigning value to variables
        this.country = res.country;

        // get the parametrised news
        this.getPosts();
      }
    );
  }

  getPosts() {
    this._newsapi.getNewsFromAPI().subscribe(
      (res: any) => {
        this.totalNumberOfNews = res.totalResults;
        this.posts = res.articles;
        this.posts.length === 0 ? this.displayErrorMessage() : this.showNews = true;

        // setting data into news carry
        this._newsCarry.resetNewsArray();
        for (let i = 0; i < (this.posts.length > this._newsCarry.newsToCarry ? this._newsCarry.newsToCarry : this.posts.length); i++) {
          this._newsCarry.addNewsInArray(this.posts[i]);
        }

        // calculating total number of pages
        this.paginationArray = Math.ceil(this.totalNumberOfNews / this.currentNewsPerPage);

        // resetting PaginationList
        this.paginationList = [];

        // adding news per page as consecutive list
        this.setNewsPerPageList();

        // adding values to the paginationList array from 0 to 'n'
        this.addPaginationArrayValues();
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

  setNewsPerPageList() {
    this.newsPageSizeArray = [];
    let x = 0;
    while (x !== (this.totalNumberOfNews > 20 ? 20 : this.totalNumberOfNews)) {
      this.newsPageSizeArray.push(x + 1);
      x++;
    }
  }

  addPaginationArrayValues() {
    for (let i = 0; i < this.paginationArray; i++) {
      this.paginationList.push(i + 1);
    }
  }

  getMiniCardStatus(value: any) {
    return value % 10 === 0 ? false : value === 1 ? false : !(value % 11 === 0);
  }
}
