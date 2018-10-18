import { NewsApiService       } from './_services/news-api.service'                    ;
import { BrowserModule        } from '@angular/platform-browser'                       ;
import { NgModule             } from '@angular/core'                                   ;
import { AppRoutingModule     } from './app-routing.module'                            ;
import { AppComponent         } from './app.component'                                 ;
import { NavComponent         } from './nav/nav.component'                             ;
import { ServiceWorkerModule  } from '@angular/service-worker'                         ;
import { environment          } from '../environments/environment'                     ;
import { HttpClientModule     } from '@angular/common/http'                            ;
import { EllipsisPipe         } from './common/ellipsis'                               ;
import { FeedComponent        } from './feed/feed.component'                           ;
import { DetailComponent      } from './detail/detail.component'                       ;
import { NewsParamsService    } from './_services/news-params.service'                 ;
import { IpService            } from './_services/ip.service'                          ;
import { SortPipe             } from './common/sort.pipe'                              ;
import { CarryComponentModule } from './common/carry-components/carry-component.module';
import { NewsCarryService     } from './_services/news-carry.service';
import { LandingComponent } from './landing/landing.component'                  ;

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    EllipsisPipe,
    FeedComponent,
    DetailComponent,
    SortPipe,
    LandingComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    CarryComponentModule,
    ServiceWorkerModule.register('/ngsw-worker.js', { enabled: environment.production })
  ],
  providers: [
    NewsApiService,
    NewsParamsService,
    NewsCarryService,
    IpService,
    SortPipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
