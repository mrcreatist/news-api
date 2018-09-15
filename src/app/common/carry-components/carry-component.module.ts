import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewsItemComponent } from './news-item/news-item.component';
import { EllipsisPipe } from '../ellipsis';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    NewsItemComponent
  ],
  exports: [
    NewsItemComponent
  ]
})
export class CarryComponentModule { }
