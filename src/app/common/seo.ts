import { Injectable } from '@angular/core';
import { Title } from '@angular/platform-browser';

import { DomInjectableService } from './../providers/dom-injectable-service/dom-injectable-service';
// import { getDOM } from '@angular/platform-browser/src/dom/dom_adapter';

@Injectable()

export class SeoService {
 /**
  * Angular 2 Title Service
  */
  private titleService: Title;
  private headElement: HTMLElement;
  private metaDescription: HTMLElement;
  private robots: HTMLElement;

 /**
  * Inject the Angular 2 Title Service
  * @param titleService
  */
  constructor(
      titleService: Title,
      public dom: DomInjectableService
    ){
    this.titleService = titleService;

   /**
    * get the <head> Element
    * @type {any}
    */
    this.headElement = this.dom.doc.querySelectorAll('head');
    this.metaDescription = this.getOrCreateMetaElement('description');
    this.robots = this.getOrCreateMetaElement('robots');

    this.dom.link('SeoService', this)
  }

  public getTitle(): string {
    return this.titleService.getTitle();
  }

  public setTitle(newTitle: string) {
    this.titleService.setTitle(newTitle);
  }

  public getMetaDescription(): string {
    return this.metaDescription.getAttribute('content');
  }

  public setMetaDescription(description: string) {
    this.metaDescription.setAttribute('content', description);
  }

  public getMetaRobots(): string {
    return this.robots.getAttribute('content');
  }

  public setMetaRobots(robots: string) {
    this.robots.setAttribute('content', robots);
  }

   /**
    * get the HTML Element when it is in the markup, or create it.
    * @param name
    * @returns {HTMLElement}
    */
    private getOrCreateMetaElement(name: string): HTMLElement {
      let el: HTMLElement;
      el = this.dom.doc.querySelectorAll(`meta[name=${ name }]`);
      if (el === null) {
        el = this.dom.doc.createElement('meta');
        el.setAttribute('name', name);
        this.headElement.appendChild(el);
      }
      return el;
    }

}