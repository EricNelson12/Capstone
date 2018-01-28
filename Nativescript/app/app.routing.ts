import {tabsComponent} from "./tabs/tabs.component";
import {SideComponent} from "./sidedrawer/side.component";
export const routes = [
  { path: "", component: tabsComponent },
  { path: "side", component: SideComponent },
  { path: "tabs", component: tabsComponent },

];

export const navigatableComponents = [
  tabsComponent,
  SideComponent,
];
