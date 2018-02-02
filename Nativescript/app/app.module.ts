import { NgModule } from "@angular/core";
import { NativeScriptFormsModule } from "nativescript-angular/forms";
import { NativeScriptHttpModule } from "nativescript-angular/http";
import { NativeScriptModule } from "nativescript-angular/nativescript.module";
import { NativeScriptRouterModule } from "nativescript-angular/router";
import { NativeScriptUISideDrawerModule } from "nativescript-pro-ui/sidedrawer/angular";

import { AppComponent } from "./app.component";
import { routes, navigatableComponents} from "./app.routing";
import { tabsComponent } from './tabs/tabs.component'
import { SideComponent } from "./sidedrawer/side.component";
import {detailsComponent} from "./tabs/details.component";



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
  bootstrap: [AppComponent]
})
export class AppModule {}