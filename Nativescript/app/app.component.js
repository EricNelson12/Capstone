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
