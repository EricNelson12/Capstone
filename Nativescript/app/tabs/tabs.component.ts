import {Component } from "@angular/core";
import { Page } from "ui/page"; // to hide action bar
import * as listViewModule from "tns-core-modules/ui/list-view";
import {Input, ChangeDetectionStrategy} from '@angular/core';

class news{
  constructor(public id : string, public name: string){}
}


@Component({
  selector: "tabs",
  templateUrl: "./tabs/tabs.component.html",
  styleUrls:["./tabs/tabs.component.css"]
})
export class tabsComponent {
  info: news[];
  constructor(){
    this.info= [
      {
       id: 'Traditional Dentures', name: 'Traditional Dentures get more loose over time...'},
      {id: 'Try before you buy', name: 'Free Consultation, design your perfect smile...'},
      {id: 'Comparison', name: 'How do we compare? Replace missing teeth...'}
    ]
  }
}
