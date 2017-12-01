"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var page_1 = require("ui/page"); // to hide action bar
var AppComponent = (function () {
    function AppComponent(page) {
        this.page = page;
        page.actionBarHidden = false;
    }
    AppComponent = __decorate([
        core_1.Component({
            selector: "main",
            templateUrl: "app.component.html",
        }),
        __metadata("design:paramtypes", [page_1.Page])
    ], AppComponent);
    return AppComponent;
}());
exports.AppComponent = AppComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImFwcC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxzQ0FBeUM7QUFDekMsZ0NBQStCLENBQUMscUJBQXFCO0FBVXJEO0lBQ0ksc0JBQW9CLElBQVU7UUFBVixTQUFJLEdBQUosSUFBSSxDQUFNO1FBQzFCLElBQUksQ0FBQyxlQUFlLEdBQUcsS0FBSyxDQUFDO0lBQ2pDLENBQUM7SUFIUSxZQUFZO1FBTnhCLGdCQUFTLENBQUM7WUFDVCxRQUFRLEVBQUUsTUFBTTtZQUNoQixXQUFXLEVBQUUsb0JBQW9CO1NBR2xDLENBQUM7eUNBRTRCLFdBQUk7T0FEckIsWUFBWSxDQUl4QjtJQUFELG1CQUFDO0NBQUEsQUFKRCxJQUlDO0FBSlksb0NBQVkiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0NvbXBvbmVudCB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XHJcbmltcG9ydCB7IFBhZ2UgfSBmcm9tIFwidWkvcGFnZVwiOyAvLyB0byBoaWRlIGFjdGlvbiBiYXJcclxuXHJcblxyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgc2VsZWN0b3I6IFwibWFpblwiLFxyXG4gIHRlbXBsYXRlVXJsOiBcImFwcC5jb21wb25lbnQuaHRtbFwiLFxyXG4gIFxyXG4gIFxyXG59KVxyXG5leHBvcnQgY2xhc3MgQXBwQ29tcG9uZW50IHtcclxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgcGFnZTogUGFnZSkge1xyXG4gICAgICAgIHBhZ2UuYWN0aW9uQmFySGlkZGVuID0gZmFsc2U7XHJcbiAgICB9XHJcbn0iXX0=