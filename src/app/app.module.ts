import { NewsApiService       } from './_services/news-api.service'                     ;
import { BrowserModule        } from '@angular/platform-browser'                        ;
import { NgModule             } from '@angular/core'                                    ;
import { AppRoutingModule     } from './app-routing.module'                             ;
import { AppComponent         } from './app.component'                                  ;
import { NavComponent         } from './nav/nav.component'                              ;
import { ServiceWorkerModule  } from '@angular/service-worker'                          ;
import { environment          } from '../environments/environment'                      ;
import { HttpClientModule     } from '@angular/common/http'                             ;
import { FeedComponent        } from './feed/feed.component'                            ;
import { DetailComponent      } from './detail/detail.component'                        ;
import { NewsParamsService    } from './_services/news-params.service'                  ;
import { IpService            } from './_services/ip.service'                           ;
import { SortPipe             } from './common/sort.pipe'                               ;
import { CarryComponentModule } from './common/carry-components/carry-component.module' ;
import { NewsCarryService     } from './_services/news-carry.service'                   ;
import { LandingComponent     } from './landing/landing.component';
import { FooterComponent } from './footer/footer.component';
import { BottomMenuComponent } from './bottom-menu/bottom-menu.component';
import { SearchComponent } from './search/search.component'                      ;

// import { AngularFireModule } from '@angular/fire';
// import { MessagingService } from './_services/messaging.service';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    FeedComponent,
    DetailComponent,
    SortPipe,
    LandingComponent,
    FooterComponent,
    BottomMenuComponent,
    SearchComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    CarryComponentModule,
    // AngularFireModule,
    ServiceWorkerModule.register('/ngsw-worker.js', { enabled: environment.production })
  ],
  providers: [
    NewsApiService,
    NewsParamsService,
    NewsCarryService,
    IpService,
    SortPipe,
    // MessagingService
  ],
  exports: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
