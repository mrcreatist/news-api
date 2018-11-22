import { Component, HostBinding, OnInit } from '@angular/core';
import { SwUpdate } from '../../node_modules/@angular/service-worker';
import { Router, NavigationEnd } from '@angular/router';
import { MessagingService } from './_services/messaging.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  @HostBinding('class') AppComponentClass = 'app-root';

  message: any;

  constructor(
    private _router: Router,
    private swUpdate: SwUpdate,
    // private msgService: MessagingService
  ) {
    this._router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        (<any>window).ga('set', 'page', event.urlAfterRedirects);
        (<any>window).ga('send', 'pageview');
      }
    });
  }

  ngOnInit() {
    if (this.swUpdate.isEnabled) {
      this.swUpdate.available.subscribe(() => {
        if (confirm('New version available. Load New Version?')) {
          window.location.reload();
        }
      });

      Notification.requestPermission( function (status) {
        console.log('Notification Permission status: ', status);
        this.displayNotification();
      });
    }

    // this.msgService.getPermission();
    // this.msgService.receiveMessage();
    // this.message = this.msgService.currentMessage;
  }

  displayNotification() {
    if ((Notification as any).permission === 'granted') {
      navigator.serviceWorker.getRegistration()
        .then( function(reg) {
          reg.showNotification('Hello World!');
        });
    }
  }
}
