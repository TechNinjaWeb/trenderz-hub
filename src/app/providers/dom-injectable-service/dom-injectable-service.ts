import { Inject, Injectable } from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser';

function _window() : any {
   // return the global native browser window object
   return window;
}

@Injectable()
export class DomInjectableService {
  get window() : any {
      return _window();
   }
   get document() : any {
      return this.doc;
   }
  constructor(@Inject(DOCUMENT) public doc: any) {}
  
   link(namespace: string, reference: any): void {
   		let window = _window();
   		window.techninja = window.techninja || Object.create(null);
   		window.techninja[namespace] = reference;
   }
}