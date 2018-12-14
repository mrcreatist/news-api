import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewsItemComponent } from './news-item/news-item.component';
import { LoaderComponent } from './loader/loader.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    NewsItemComponent,
    LoaderComponent
  ],
  exports: [
    NewsItemComponent,
    LoaderComponent
  ]
})
export class CarryComponentModule { }
