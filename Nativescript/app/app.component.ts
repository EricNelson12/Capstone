import {Component } from "@angular/core";
import { Page } from "ui/page"; // to hide action bar



@Component({
  selector: "main",
  templateUrl: "app.component.html",
  
  
})
export class AppComponent {
    constructor(private page: Page) {
        page.actionBarHidden = false;
    }
}