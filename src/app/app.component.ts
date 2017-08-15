import { Component, EventEmitter, ViewChild } from '@angular/core';

import { DomInjectableService } from './providers/dom-injectable-service/dom-injectable-service';
import { SeoService } from '../common/seo';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  @ViewChild('slider') carouselElement; 
  title = 'app';

  constructor(
    public dom: DomInjectableService,
    public seo: SeoService
  ) {
    this.dom.link('AppComponent', this);
  }
}
