import {tabsComponent} from "./tabs/tabs.component";
import {SideComponent} from "./sidedrawer/side.component";
import {detailsComponent} from "./details/details.component";
import { Routes, RouterModule } from "@angular/router";
import { NgModule } from "@angular/core";



export const routes: Routes = [
  { path: "", component: tabsComponent },
  { path: "side", component: SideComponent },
  { path: "tabs", component: tabsComponent },
  { path: "detail", component: detailsComponent}

];


export const navigatableComponents = [
  tabsComponent,
  SideComponent,
  detailsComponent
];


