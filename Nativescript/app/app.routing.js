"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tabs_component_1 = require("./tabs/tabs.component");
var side_component_1 = require("./sidedrawer/side.component");
exports.routes = [
    { path: "", component: tabs_component_1.tabsComponent },
];
exports.navigatableComponents = [
    tabs_component_1.tabsComponent,
    side_component_1.SideComponent,
];
