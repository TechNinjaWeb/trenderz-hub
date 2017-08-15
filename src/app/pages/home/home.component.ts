import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'th-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  public finsishedScroll($event) {
    console.log("Finished Scroll", $event)
  }

}
