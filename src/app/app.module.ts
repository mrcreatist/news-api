import { NewsApiService } from './common/news-api.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { HttpClientModule } from '@angular/common/http';
import { EllipsisPipe } from './common/ellipsis';
import { FeedComponent } from './feed/feed.component';
import { DetailComponent } from './detail/detail.component';
import { NewsParamsService } from './common/news-params.service';
import { IpService } from './common/ip.service';
import { SortPipe } from './common/sort.pipe';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    EllipsisPipe,
    FeedComponent,
    DetailComponent,
    SortPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule  ,
    ServiceWorkerModule.register('/ngsw-worker.js', { enabled: environment.production })
  ],
  providers: [
    NewsApiService,
    NewsParamsService,
    IpService,
    SortPipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
