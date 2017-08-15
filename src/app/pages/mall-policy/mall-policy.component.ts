import { Component, OnInit } from '@angular/core';

import { DomInjectableService } from './../../providers/dom-injectable-service/dom-injectable-service';

@Component({
  selector: 'th-mall-policy',
  templateUrl: './mall-policy.component.html',
  styleUrls: ['./mall-policy.component.scss']
})
export class MallPolicyComponent implements OnInit {

  constructor(
    public dom: DomInjectableService
  ) { }

  ngOnInit() {
  }

  public finsishedScroll($event) {
    console.log("Finished Scroll", $event)
  }

}
