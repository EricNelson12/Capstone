"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var element_registry_1 = require("nativescript-angular/element-registry");
element_registry_1.registerElement("PullToRefresh", function () { return require("nativescript-pulltorefresh").PullToRefresh; });
//firebase
var Observable_1 = require("rxjs/Observable");
var firebase = require("nativescript-plugin-firebase/app");
var firebaseWebApi = require("nativescript-plugin-firebase/app");
var MapBox = require("nativescript-mapbox");
var tabsComponent = (function () {
    function tabsComponent(zone) {
        this.zone = zone;
        this.items = [];
        // AngularFireModule.initializeApp({});
    }
    // initialize the firebase connection
    // get data from firestore
    tabsComponent.prototype.ngOnInit = function () {
        firebase.initializeApp({
            persist: false
        }).then(function () {
            console.log("Firebase initialized");
        });
        this.firestoreCollectionObservable();
    };
    tabsComponent.prototype.firestoreCollectionObservable = function () {
        var _this = this;
        this.myItems$ = Observable_1.Observable.create(function (subscriber) {
            var colRef = firebase.firestore().collection("items");
            colRef.onSnapshot(function (snapshot) {
                _this.zone.run(function () {
                    _this.items = [];
                    snapshot.forEach(function (docSnap) { return _this.items.push(docSnap.data()); });
                    subscriber.next(_this.items);
                });
            });
        });
    };
    tabsComponent = __decorate([
        core_1.Component({
            selector: "tabs",
            templateUrl: "./tabs/tabs.component.html",
            styleUrls: ["./tabs/tabs.component.css"]
        }),
        __metadata("design:paramtypes", [core_1.NgZone])
    ], tabsComponent);
    return tabsComponent;
}());
exports.tabsComponent = tabsComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFicy5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJ0YWJzLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUF1RDtBQUt2RCwwRUFBd0U7QUFDeEUsa0NBQWUsQ0FBQyxlQUFlLEVBQUUsY0FBTSxPQUFBLE9BQU8sQ0FBQyw0QkFBNEIsQ0FBQyxDQUFDLGFBQWEsRUFBbkQsQ0FBbUQsQ0FBQyxDQUFDO0FBRzVGLFVBQVU7QUFDViw4Q0FBNkM7QUFFN0MsSUFBTSxRQUFRLEdBQUcsT0FBTyxDQUFDLGtDQUFrQyxDQUFDLENBQUM7QUFDN0QsSUFBTSxjQUFjLEdBQUcsT0FBTyxDQUFDLGtDQUFrQyxDQUFDLENBQUM7QUFDbkUsSUFBTSxNQUFNLEdBQUcsT0FBTyxDQUFDLHFCQUFxQixDQUFDLENBQUM7QUF1QjlDO0lBVUUsdUJBQW9CLElBQVk7UUFBWixTQUFJLEdBQUosSUFBSSxDQUFRO1FBSHhCLFVBQUssR0FBZ0IsRUFBRSxDQUFDO1FBSTlCLHVDQUF1QztJQUN6QyxDQUFDO0lBRUQscUNBQXFDO0lBQ3JDLDBCQUEwQjtJQUMxQixnQ0FBUSxHQUFSO1FBQ0UsUUFBUSxDQUFDLGFBQWEsQ0FBQztZQUNyQixPQUFPLEVBQUUsS0FBSztTQUNmLENBQUMsQ0FBQyxJQUFJLENBQUM7WUFDTixPQUFPLENBQUMsR0FBRyxDQUFDLHNCQUFzQixDQUFDLENBQUM7UUFDdEMsQ0FBQyxDQUFDLENBQUM7UUFFRixJQUFJLENBQUMsNkJBQTZCLEVBQUUsQ0FBQztJQUV4QyxDQUFDO0lBR0QscURBQTZCLEdBQTdCO1FBQUEsaUJBV0M7UUFWQyxJQUFJLENBQUMsUUFBUSxHQUFHLHVCQUFVLENBQUMsTUFBTSxDQUFDLFVBQUEsVUFBVTtZQUMxQyxJQUFNLE1BQU0sR0FBa0MsUUFBUSxDQUFDLFNBQVMsRUFBRSxDQUFDLFVBQVUsQ0FBQyxPQUFPLENBQUMsQ0FBQztZQUN2RixNQUFNLENBQUMsVUFBVSxDQUFDLFVBQUMsUUFBaUM7Z0JBQ2xELEtBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDO29CQUNaLEtBQUksQ0FBQyxLQUFLLEdBQUcsRUFBRSxDQUFDO29CQUNoQixRQUFRLENBQUMsT0FBTyxDQUFDLFVBQUEsT0FBTyxJQUFJLE9BQUEsS0FBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQU8sT0FBTyxDQUFDLElBQUksRUFBRSxDQUFDLEVBQXJDLENBQXFDLENBQUMsQ0FBQztvQkFDbkUsVUFBVSxDQUFDLElBQUksQ0FBQyxLQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7Z0JBQzlCLENBQUMsQ0FBQyxDQUFDO1lBQ0wsQ0FBQyxDQUFDLENBQUM7UUFDTCxDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7SUF2Q1UsYUFBYTtRQUx6QixnQkFBUyxDQUFDO1lBQ1QsUUFBUSxFQUFFLE1BQU07WUFDaEIsV0FBVyxFQUFFLDRCQUE0QjtZQUN6QyxTQUFTLEVBQUMsQ0FBQywyQkFBMkIsQ0FBQztTQUN4QyxDQUFDO3lDQVcwQixhQUFNO09BVnJCLGFBQWEsQ0EyQ3pCO0lBQUQsb0JBQUM7Q0FBQSxBQTNDRCxJQTJDQztBQTNDWSxzQ0FBYSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7Q29tcG9uZW50LE9uSW5pdCxOZ1pvbmUgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xyXG5pbXBvcnQgKiBhcyBsaXN0Vmlld01vZHVsZSBmcm9tIFwidG5zLWNvcmUtbW9kdWxlcy91aS9saXN0LXZpZXdcIjtcclxuaW1wb3J0ICogYXMgSW1hZ2VNb2R1bGUgZnJvbSBcInRucy1jb3JlLW1vZHVsZXMvdWkvaW1hZ2VcIjtcclxuaW1wb3J0IHsgSW1hZ2UgfSBmcm9tIFwidG5zLWNvcmUtbW9kdWxlcy91aS9pbWFnZVwiO1xyXG5pbXBvcnQgeyBJbmZvfSBmcm9tICcuL2luZm8nO1xyXG5pbXBvcnQgeyByZWdpc3RlckVsZW1lbnQgfSBmcm9tIFwibmF0aXZlc2NyaXB0LWFuZ3VsYXIvZWxlbWVudC1yZWdpc3RyeVwiO1xyXG5yZWdpc3RlckVsZW1lbnQoXCJQdWxsVG9SZWZyZXNoXCIsICgpID0+IHJlcXVpcmUoXCJuYXRpdmVzY3JpcHQtcHVsbHRvcmVmcmVzaFwiKS5QdWxsVG9SZWZyZXNoKTtcclxuIFxyXG5cclxuLy9maXJlYmFzZVxyXG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSBcInJ4anMvT2JzZXJ2YWJsZVwiO1xyXG5pbXBvcnQgeyBmaXJlc3RvcmUgfSBmcm9tIFwibmF0aXZlc2NyaXB0LXBsdWdpbi1maXJlYmFzZVwiO1xyXG5jb25zdCBmaXJlYmFzZSA9IHJlcXVpcmUoXCJuYXRpdmVzY3JpcHQtcGx1Z2luLWZpcmViYXNlL2FwcFwiKTtcclxuY29uc3QgZmlyZWJhc2VXZWJBcGkgPSByZXF1aXJlKFwibmF0aXZlc2NyaXB0LXBsdWdpbi1maXJlYmFzZS9hcHBcIik7XHJcbmNvbnN0IE1hcEJveCA9IHJlcXVpcmUoXCJuYXRpdmVzY3JpcHQtbWFwYm94XCIpO1xyXG5cclxuLy9pdGVtc1xyXG5cclxuZXhwb3J0IGludGVyZmFjZSBJdGVte1xyXG4gIGlkOnN0cmluZztcclxuICB0aXRsZTpzdHJpbmc7XHJcbiAgZGVzY3JpcHRpb246c3RyaW5nO1xyXG4gIGFkbWlucG9zdGVkOnN0cmluZztcclxuICBwZXJtaXNzaW9uczpzdHJpbmc7XHJcbiAgdGltZTpzdHJpbmc7XHJcbiAgZGF0YXR5cGU6c3RyaW5nO1xyXG4gIHVybDogc3RyaW5nO1xyXG4gIG5hbWU6IHN0cmluZztcclxufVxyXG5cclxuXHJcblxyXG5AQ29tcG9uZW50KHtcclxuICBzZWxlY3RvcjogXCJ0YWJzXCIsXHJcbiAgdGVtcGxhdGVVcmw6IFwiLi90YWJzL3RhYnMuY29tcG9uZW50Lmh0bWxcIixcclxuICBzdHlsZVVybHM6W1wiLi90YWJzL3RhYnMuY29tcG9uZW50LmNzc1wiXVxyXG59KVxyXG5leHBvcnQgY2xhc3MgdGFic0NvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdHtcclxuXHJcbiAvL2l0ZW0gZnJvbSBjb2xsZWN0aW9uIFxyXG5cclxuICBwdWJsaWMgbXlJdGVtJDogT2JzZXJ2YWJsZTxJdGVtPjtcclxuICBwdWJsaWMgbXlJdGVtcyQ6IE9ic2VydmFibGU8QXJyYXk8SXRlbT4+O1xyXG4gIHByaXZhdGUgaXRlbTogSXRlbTtcclxuICBwcml2YXRlIGl0ZW1zOiBBcnJheTxJdGVtPiA9IFtdO1xyXG5cclxuXHJcbiAgY29uc3RydWN0b3IocHJpdmF0ZSB6b25lOiBOZ1pvbmUpIHtcclxuICAgIC8vIEFuZ3VsYXJGaXJlTW9kdWxlLmluaXRpYWxpemVBcHAoe30pO1xyXG4gIH1cclxuXHJcbiAgLy8gaW5pdGlhbGl6ZSB0aGUgZmlyZWJhc2UgY29ubmVjdGlvblxyXG4gIC8vIGdldCBkYXRhIGZyb20gZmlyZXN0b3JlXHJcbiAgbmdPbkluaXQoKTogdm9pZCB7XHJcbiAgICBmaXJlYmFzZS5pbml0aWFsaXplQXBwKHtcclxuICAgICAgcGVyc2lzdDogZmFsc2VcclxuICAgIH0pLnRoZW4oKCkgPT4ge1xyXG4gICAgICBjb25zb2xlLmxvZyhcIkZpcmViYXNlIGluaXRpYWxpemVkXCIpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgIHRoaXMuZmlyZXN0b3JlQ29sbGVjdGlvbk9ic2VydmFibGUoKTtcclxuXHJcbiAgfVxyXG5cclxuXHJcbiAgZmlyZXN0b3JlQ29sbGVjdGlvbk9ic2VydmFibGUoKTogdm9pZCB7XHJcbiAgICB0aGlzLm15SXRlbXMkID0gT2JzZXJ2YWJsZS5jcmVhdGUoc3Vic2NyaWJlciA9PiB7XHJcbiAgICAgIGNvbnN0IGNvbFJlZjogZmlyZXN0b3JlLkNvbGxlY3Rpb25SZWZlcmVuY2UgPSBmaXJlYmFzZS5maXJlc3RvcmUoKS5jb2xsZWN0aW9uKFwiaXRlbXNcIik7XHJcbiAgICAgIGNvbFJlZi5vblNuYXBzaG90KChzbmFwc2hvdDogZmlyZXN0b3JlLlF1ZXJ5U25hcHNob3QpID0+IHtcclxuICAgICAgICB0aGlzLnpvbmUucnVuKCgpID0+IHtcclxuICAgICAgICAgIHRoaXMuaXRlbXMgPSBbXTtcclxuICAgICAgICAgIHNuYXBzaG90LmZvckVhY2goZG9jU25hcCA9PiB0aGlzLml0ZW1zLnB1c2goPEl0ZW0+ZG9jU25hcC5kYXRhKCkpKTtcclxuICAgICAgICAgIHN1YnNjcmliZXIubmV4dCh0aGlzLml0ZW1zKTtcclxuICAgICAgICB9KTtcclxuICAgICAgfSk7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG5cclxuICBcclxufVxyXG4iXX0=