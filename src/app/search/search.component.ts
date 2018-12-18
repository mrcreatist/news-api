import { Component, OnInit, HostBinding } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  @HostBinding('class') SearchComponentClass = 'app-search';

  constructor() { }

  ngOnInit() {
  }

}
