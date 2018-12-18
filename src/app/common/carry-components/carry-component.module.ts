import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewsItemComponent } from './news-item/news-item.component';
import { LoaderComponent } from './loader/loader.component';
import { EllipsisPipe } from '../ellipsis';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    NewsItemComponent,
    LoaderComponent,
    EllipsisPipe
  ],
  exports: [
    NewsItemComponent,
    LoaderComponent,
    EllipsisPipe
  ]
})
export class CarryComponentModule { }
