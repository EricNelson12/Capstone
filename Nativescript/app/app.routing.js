"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tabs_component_1 = require("./tabs/tabs.component");
var side_component_1 = require("./sidedrawer/side.component");
var details_component_1 = require("./details/details.component");
exports.routes = [
    { path: "", component: tabs_component_1.tabsComponent },
    { path: "side", component: side_component_1.SideComponent },
    { path: "tabs", component: tabs_component_1.tabsComponent },
    { path: "detail", component: details_component_1.detailsComponent }
];
exports.navigatableComponents = [
    tabs_component_1.tabsComponent,
    side_component_1.SideComponent,
    details_component_1.detailsComponent
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLnJvdXRpbmcuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJhcHAucm91dGluZy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHdEQUFvRDtBQUNwRCw4REFBMEQ7QUFDMUQsaUVBQTZEO0FBTWhELFFBQUEsTUFBTSxHQUFXO0lBQzVCLEVBQUUsSUFBSSxFQUFFLEVBQUUsRUFBRSxTQUFTLEVBQUUsOEJBQWEsRUFBRTtJQUN0QyxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsU0FBUyxFQUFFLDhCQUFhLEVBQUU7SUFDMUMsRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLFNBQVMsRUFBRSw4QkFBYSxFQUFFO0lBQzFDLEVBQUUsSUFBSSxFQUFFLFFBQVEsRUFBRSxTQUFTLEVBQUUsb0NBQWdCLEVBQUM7Q0FFL0MsQ0FBQztBQUdXLFFBQUEscUJBQXFCLEdBQUc7SUFDbkMsOEJBQWE7SUFDYiw4QkFBYTtJQUNiLG9DQUFnQjtDQUNqQixDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHt0YWJzQ29tcG9uZW50fSBmcm9tIFwiLi90YWJzL3RhYnMuY29tcG9uZW50XCI7XG5pbXBvcnQge1NpZGVDb21wb25lbnR9IGZyb20gXCIuL3NpZGVkcmF3ZXIvc2lkZS5jb21wb25lbnRcIjtcbmltcG9ydCB7ZGV0YWlsc0NvbXBvbmVudH0gZnJvbSBcIi4vZGV0YWlscy9kZXRhaWxzLmNvbXBvbmVudFwiO1xuaW1wb3J0IHsgUm91dGVzLCBSb3V0ZXJNb2R1bGUgfSBmcm9tIFwiQGFuZ3VsYXIvcm91dGVyXCI7XG5pbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5cblxuXG5leHBvcnQgY29uc3Qgcm91dGVzOiBSb3V0ZXMgPSBbXG4gIHsgcGF0aDogXCJcIiwgY29tcG9uZW50OiB0YWJzQ29tcG9uZW50IH0sXG4gIHsgcGF0aDogXCJzaWRlXCIsIGNvbXBvbmVudDogU2lkZUNvbXBvbmVudCB9LFxuICB7IHBhdGg6IFwidGFic1wiLCBjb21wb25lbnQ6IHRhYnNDb21wb25lbnQgfSxcbiAgeyBwYXRoOiBcImRldGFpbFwiLCBjb21wb25lbnQ6IGRldGFpbHNDb21wb25lbnR9XG5cbl07XG5cblxuZXhwb3J0IGNvbnN0IG5hdmlnYXRhYmxlQ29tcG9uZW50cyA9IFtcbiAgdGFic0NvbXBvbmVudCxcbiAgU2lkZUNvbXBvbmVudCxcbiAgZGV0YWlsc0NvbXBvbmVudFxuXTtcblxuXG4iXX0=