import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FeedComponent } from './feed/feed.component';
import { DetailComponent } from './detail/detail.component';
import { LandingComponent } from './landing/landing.component';
import { SearchComponent } from './search/search.component';
import { AboutComponent } from './about/about.component';

const routes: Routes = [
  {
    path: '',
    component: LandingComponent
  },
  {
    path: 'feed/:pageType',
    component: FeedComponent
  },
  {
    path: 'detail',
    component: DetailComponent
  },
  {
    path: 'search',
    component: SearchComponent
  },
  {
    path: 'about',
    component: AboutComponent
  },
  {
    path: '**',
    redirectTo: '/'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
