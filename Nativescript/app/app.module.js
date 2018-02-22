"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var forms_1 = require("nativescript-angular/forms");
var http_1 = require("nativescript-angular/http");
var nativescript_module_1 = require("nativescript-angular/nativescript.module");
var router_1 = require("nativescript-angular/router");
var angular_1 = require("nativescript-pro-ui/sidedrawer/angular");
var app_component_1 = require("./app.component");
var app_routing_1 = require("./app.routing");
var tabs_component_1 = require("./tabs/tabs.component");
var details_component_1 = require("./details/details.component");
var platform = require("platform");
if (platform.isIOS) {
    console.log("mapping");
    GMSServices.provideAPIKey("AIzaSyDjsJ6pC6yoKC0-w_n7k8gQpdglwJjdLlc");
}
var AppModule = (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
            imports: [
                nativescript_module_1.NativeScriptModule,
                forms_1.NativeScriptFormsModule,
                http_1.NativeScriptHttpModule,
                router_1.NativeScriptRouterModule,
                router_1.NativeScriptRouterModule.forRoot(app_routing_1.routes),
                angular_1.NativeScriptUISideDrawerModule,
            ],
            declarations: [app_component_1.AppComponent].concat(app_routing_1.navigatableComponents, [tabs_component_1.tabsComponent,
                details_component_1.detailsComponent]),
            providers: [
                tabs_component_1.tabsComponent
            ],
            bootstrap: [app_component_1.AppComponent]
        })
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImFwcC5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxzQ0FBeUM7QUFDekMsb0RBQXFFO0FBQ3JFLGtEQUFtRTtBQUNuRSxnRkFBOEU7QUFDOUUsc0RBQXVFO0FBQ3ZFLGtFQUF3RjtBQUV4RixpREFBK0M7QUFDL0MsNkNBQThEO0FBQzlELHdEQUFxRDtBQUVyRCxpRUFBK0Q7QUFFL0QsbUNBQXFDO0FBR3JDLEVBQUUsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO0lBQ3JCLE9BQU8sQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLENBQUM7SUFDckIsV0FBVyxDQUFDLGFBQWEsQ0FBQyx5Q0FBeUMsQ0FBQyxDQUFDO0FBQ3ZFLENBQUM7QUFxQkQ7SUFBQTtJQUF3QixDQUFDO0lBQVosU0FBUztRQWxCckIsZUFBUSxDQUFDO1lBQ1IsT0FBTyxFQUFFO2dCQUNQLHdDQUFrQjtnQkFDbEIsK0JBQXVCO2dCQUN2Qiw2QkFBc0I7Z0JBQ3RCLGlDQUF3QjtnQkFDeEIsaUNBQXdCLENBQUMsT0FBTyxDQUFDLG9CQUFNLENBQUM7Z0JBQ3hDLHdDQUE4QjthQUMvQjtZQUNELFlBQVksR0FBRyw0QkFBWSxTQUN0QixtQ0FBcUIsR0FDeEIsOEJBQWE7Z0JBQ2Isb0NBQWdCLEVBQ2pCO1lBQ0QsU0FBUyxFQUFFO2dCQUNiLDhCQUFhO2FBQUc7WUFDZCxTQUFTLEVBQUUsQ0FBQyw0QkFBWSxDQUFDO1NBQzFCLENBQUM7T0FDVyxTQUFTLENBQUc7SUFBRCxnQkFBQztDQUFBLEFBQXpCLElBQXlCO0FBQVosOEJBQVMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5pbXBvcnQgeyBOYXRpdmVTY3JpcHRGb3Jtc01vZHVsZSB9IGZyb20gXCJuYXRpdmVzY3JpcHQtYW5ndWxhci9mb3Jtc1wiO1xuaW1wb3J0IHsgTmF0aXZlU2NyaXB0SHR0cE1vZHVsZSB9IGZyb20gXCJuYXRpdmVzY3JpcHQtYW5ndWxhci9odHRwXCI7XG5pbXBvcnQgeyBOYXRpdmVTY3JpcHRNb2R1bGUgfSBmcm9tIFwibmF0aXZlc2NyaXB0LWFuZ3VsYXIvbmF0aXZlc2NyaXB0Lm1vZHVsZVwiO1xuaW1wb3J0IHsgTmF0aXZlU2NyaXB0Um91dGVyTW9kdWxlIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1hbmd1bGFyL3JvdXRlclwiO1xuaW1wb3J0IHsgTmF0aXZlU2NyaXB0VUlTaWRlRHJhd2VyTW9kdWxlIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1wcm8tdWkvc2lkZWRyYXdlci9hbmd1bGFyXCI7XG5cbmltcG9ydCB7IEFwcENvbXBvbmVudCB9IGZyb20gXCIuL2FwcC5jb21wb25lbnRcIjtcbmltcG9ydCB7IHJvdXRlcywgbmF2aWdhdGFibGVDb21wb25lbnRzIH0gZnJvbSBcIi4vYXBwLnJvdXRpbmdcIjtcbmltcG9ydCB7IHRhYnNDb21wb25lbnQgfSBmcm9tICcuL3RhYnMvdGFicy5jb21wb25lbnQnXG5pbXBvcnQgeyBTaWRlQ29tcG9uZW50IH0gZnJvbSBcIi4vc2lkZWRyYXdlci9zaWRlLmNvbXBvbmVudFwiO1xuaW1wb3J0IHsgZGV0YWlsc0NvbXBvbmVudCB9IGZyb20gXCIuL2RldGFpbHMvZGV0YWlscy5jb21wb25lbnRcIjtcblxuaW1wb3J0ICogYXMgcGxhdGZvcm0gZnJvbSBcInBsYXRmb3JtXCI7XG5kZWNsYXJlIHZhciBHTVNTZXJ2aWNlczogYW55O1xuXG5pZiAocGxhdGZvcm0uaXNJT1MpIHsgXG5jb25zb2xlLmxvZyhcIm1hcHBpbmdcIik7XG4gIEdNU1NlcnZpY2VzLnByb3ZpZGVBUElLZXkoXCJBSXphU3lEanNKNnBDNnlvS0MwLXdfbjdrOGdRcGRnbHdKamRMbGNcIik7XG59XG5cblxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW1xuICAgIE5hdGl2ZVNjcmlwdE1vZHVsZSxcbiAgICBOYXRpdmVTY3JpcHRGb3Jtc01vZHVsZSxcbiAgICBOYXRpdmVTY3JpcHRIdHRwTW9kdWxlLFxuICAgIE5hdGl2ZVNjcmlwdFJvdXRlck1vZHVsZSxcbiAgICBOYXRpdmVTY3JpcHRSb3V0ZXJNb2R1bGUuZm9yUm9vdChyb3V0ZXMpLFxuICAgIE5hdGl2ZVNjcmlwdFVJU2lkZURyYXdlck1vZHVsZSxcbiAgXSxcbiAgZGVjbGFyYXRpb25zOiBbQXBwQ29tcG9uZW50LFxuICAgIC4uLm5hdmlnYXRhYmxlQ29tcG9uZW50cywgXG4gICAgdGFic0NvbXBvbmVudCxcbiAgICBkZXRhaWxzQ29tcG9uZW50XG4gIF0sXG4gIHByb3ZpZGVyczogW1xudGFic0NvbXBvbmVudCAgXSxcbiAgYm9vdHN0cmFwOiBbQXBwQ29tcG9uZW50XVxufSlcbmV4cG9ydCBjbGFzcyBBcHBNb2R1bGUge30iXX0=