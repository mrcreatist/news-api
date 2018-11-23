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
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faCoffee } from '@fortawesome/free-solid-svg-icons';

import { faTwitter, faFacebook, faLinkedin, faInstagram, faGithub } from '@fortawesome/free-brands-svg-icons';

// import { AngularFireModule } from '@angular/fire';
// import { MessagingService } from './_services/messaging.service';

library.add(faCoffee);

library.add(faTwitter);
library.add(faFacebook);
library.add(faLinkedin);
library.add(faInstagram);
library.add(faGithub);

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
    // AngularFireModule,
    FontAwesomeModule,
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
  bootstrap: [AppComponent]
})
export class AppModule { }
