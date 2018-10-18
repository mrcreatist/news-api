import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NewsCarryService {

  private newsArray = [];
  newsToShow = 5;
  newsToCarry = this.newsToShow + 1;

  constructor() { }

  addNewsInArray(data: any) {
    if (this.newsArray.length < this.newsToCarry) {
      this.newsArray.push(data);
    }
  }

  getNewsFromArray(offset: number): any {
    return this.newsArray[offset];
  }

  getNewsArray(): any {
    return this.newsArray;
  }

  getNewsArrayLength(): any {
    return this.newsArray.length;
  }

  resetNewsArray() {
    this.newsArray = [];
  }

  excludeNewsFromArray(data: any): any {
    const tempNewsArray = [];
    for (let i = 0; i < this.newsToCarry; i++) {
      if (tempNewsArray.length === this.newsToShow) {
        continue;
      }
      if (this.newsArray[i] !== data) {
        tempNewsArray.push(this.newsArray[i]);
      }
    }
    return tempNewsArray;
  }
}
