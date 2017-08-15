import { Directive } from '@angular/core';

import { DomInjectableService } from './providers/dom-injectable-service/dom-injectable-service';

@Directive({
  selector : '[bob]',
  host : {
    '(click)' : 'navigateTo($event)'
  },
  inputs: ['href']
})
export class AnchorDirective {
  href: string;
  constructor(
    public dom: DomInjectableService
  ) {

  }
  
  navigateTo(event) {
    event.preventDefault();
  
    this.dom.window.location
    console.log("Trying to evaluate anchor or navigation", )
  }
}
