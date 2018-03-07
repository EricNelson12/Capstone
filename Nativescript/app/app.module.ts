import { NgModule } from "@angular/core";
import { NativeScriptFormsModule } from "nativescript-angular/forms";
import { NativeScriptHttpModule } from "nativescript-angular/http";
import { NativeScriptModule } from "nativescript-angular/nativescript.module";
import { NativeScriptRouterModule } from "nativescript-angular/router";
import { NativeScriptUISideDrawerModule } from "nativescript-pro-ui/sidedrawer/angular";


import { AppComponent } from "./app.component";
import { routes, navigatableComponents } from "./app.routing";
import { tabsComponent } from './tabs/tabs.component'
import { SideComponent } from "./sidedrawer/side.component";
import { detailsComponent } from "./details/details.component";

import * as platform from "platform";
declare var GMSServices: any;

if (platform.isIOS) { 
console.log("mapping");
  GMSServices.provideAPIKey("AIzaSyDjsJ6pC6yoKC0-w_n7k8gQpdglwJjdLlc");
}


@NgModule({
  imports: [
    NativeScriptModule,
    NativeScriptFormsModule,
    NativeScriptHttpModule,
    NativeScriptRouterModule,
    NativeScriptRouterModule.forRoot(routes),
    NativeScriptUISideDrawerModule,
  ],
  declarations: [AppComponent,
    ...navigatableComponents, 
    tabsComponent,
    detailsComponent
  ],
  providers: [
tabsComponent  ],
  bootstrap: [AppComponent]
})
export class AppModule {}