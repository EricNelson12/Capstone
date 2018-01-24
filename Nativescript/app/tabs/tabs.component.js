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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFicy5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJ0YWJzLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUF1RDtBQUt2RCwwRUFBd0U7QUFDeEUsa0NBQWUsQ0FBQyxlQUFlLEVBQUUsY0FBTSxPQUFBLE9BQU8sQ0FBQyw0QkFBNEIsQ0FBQyxDQUFDLGFBQWEsRUFBbkQsQ0FBbUQsQ0FBQyxDQUFDO0FBRzVGLFVBQVU7QUFDViw4Q0FBNkM7QUFFN0MsSUFBTSxRQUFRLEdBQUcsT0FBTyxDQUFDLGtDQUFrQyxDQUFDLENBQUM7QUFDN0QsSUFBTSxjQUFjLEdBQUcsT0FBTyxDQUFDLGtDQUFrQyxDQUFDLENBQUM7QUFDbkUsSUFBTSxNQUFNLEdBQUcsT0FBTyxDQUFDLHFCQUFxQixDQUFDLENBQUM7QUF1QjlDO0lBVUUsdUJBQW9CLElBQVk7UUFBWixTQUFJLEdBQUosSUFBSSxDQUFRO1FBSHhCLFVBQUssR0FBZ0IsRUFBRSxDQUFDO1FBSTlCLHVDQUF1QztJQUN6QyxDQUFDO0lBRUQscUNBQXFDO0lBQ3JDLDBCQUEwQjtJQUMxQixnQ0FBUSxHQUFSO1FBQ0UsUUFBUSxDQUFDLGFBQWEsQ0FBQztZQUNyQixPQUFPLEVBQUUsS0FBSztTQUNmLENBQUMsQ0FBQyxJQUFJLENBQUM7WUFDTixPQUFPLENBQUMsR0FBRyxDQUFDLHNCQUFzQixDQUFDLENBQUM7UUFDdEMsQ0FBQyxDQUFDLENBQUM7UUFFRixJQUFJLENBQUMsNkJBQTZCLEVBQUUsQ0FBQztJQUV4QyxDQUFDO0lBR0QscURBQTZCLEdBQTdCO1FBQUEsaUJBV0M7UUFWQyxJQUFJLENBQUMsUUFBUSxHQUFHLHVCQUFVLENBQUMsTUFBTSxDQUFDLFVBQUEsVUFBVTtZQUMxQyxJQUFNLE1BQU0sR0FBa0MsUUFBUSxDQUFDLFNBQVMsRUFBRSxDQUFDLFVBQVUsQ0FBQyxPQUFPLENBQUMsQ0FBQztZQUN2RixNQUFNLENBQUMsVUFBVSxDQUFDLFVBQUMsUUFBaUM7Z0JBQ2xELEtBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDO29CQUNaLEtBQUksQ0FBQyxLQUFLLEdBQUcsRUFBRSxDQUFDO29CQUNoQixRQUFRLENBQUMsT0FBTyxDQUFDLFVBQUEsT0FBTyxJQUFJLE9BQUEsS0FBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQU8sT0FBTyxDQUFDLElBQUksRUFBRSxDQUFDLEVBQXJDLENBQXFDLENBQUMsQ0FBQztvQkFDbkUsVUFBVSxDQUFDLElBQUksQ0FBQyxLQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7Z0JBQzlCLENBQUMsQ0FBQyxDQUFDO1lBQ0wsQ0FBQyxDQUFDLENBQUM7UUFDTCxDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7SUF2Q1UsYUFBYTtRQUx6QixnQkFBUyxDQUFDO1lBQ1QsUUFBUSxFQUFFLE1BQU07WUFDaEIsV0FBVyxFQUFFLDRCQUE0QjtZQUN6QyxTQUFTLEVBQUMsQ0FBQywyQkFBMkIsQ0FBQztTQUN4QyxDQUFDO3lDQVcwQixhQUFNO09BVnJCLGFBQWEsQ0EyQ3pCO0lBQUQsb0JBQUM7Q0FBQSxBQTNDRCxJQTJDQztBQTNDWSxzQ0FBYSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7Q29tcG9uZW50LE9uSW5pdCxOZ1pvbmUgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuaW1wb3J0ICogYXMgbGlzdFZpZXdNb2R1bGUgZnJvbSBcInRucy1jb3JlLW1vZHVsZXMvdWkvbGlzdC12aWV3XCI7XG5pbXBvcnQgKiBhcyBJbWFnZU1vZHVsZSBmcm9tIFwidG5zLWNvcmUtbW9kdWxlcy91aS9pbWFnZVwiO1xuaW1wb3J0IHsgSW1hZ2UgfSBmcm9tIFwidG5zLWNvcmUtbW9kdWxlcy91aS9pbWFnZVwiO1xuaW1wb3J0IHsgSW5mb30gZnJvbSAnLi9pbmZvJztcbmltcG9ydCB7IHJlZ2lzdGVyRWxlbWVudCB9IGZyb20gXCJuYXRpdmVzY3JpcHQtYW5ndWxhci9lbGVtZW50LXJlZ2lzdHJ5XCI7XG5yZWdpc3RlckVsZW1lbnQoXCJQdWxsVG9SZWZyZXNoXCIsICgpID0+IHJlcXVpcmUoXCJuYXRpdmVzY3JpcHQtcHVsbHRvcmVmcmVzaFwiKS5QdWxsVG9SZWZyZXNoKTtcbiBcblxuLy9maXJlYmFzZVxuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gXCJyeGpzL09ic2VydmFibGVcIjtcbmltcG9ydCB7IGZpcmVzdG9yZSB9IGZyb20gXCJuYXRpdmVzY3JpcHQtcGx1Z2luLWZpcmViYXNlXCI7XG5jb25zdCBmaXJlYmFzZSA9IHJlcXVpcmUoXCJuYXRpdmVzY3JpcHQtcGx1Z2luLWZpcmViYXNlL2FwcFwiKTtcbmNvbnN0IGZpcmViYXNlV2ViQXBpID0gcmVxdWlyZShcIm5hdGl2ZXNjcmlwdC1wbHVnaW4tZmlyZWJhc2UvYXBwXCIpO1xuY29uc3QgTWFwQm94ID0gcmVxdWlyZShcIm5hdGl2ZXNjcmlwdC1tYXBib3hcIik7XG5cbi8vaXRlbXNcblxuZXhwb3J0IGludGVyZmFjZSBJdGVte1xuICBpZDpzdHJpbmc7XG4gIHRpdGxlOnN0cmluZztcbiAgZGVzY3JpcHRpb246c3RyaW5nO1xuICBhZG1pbnBvc3RlZDpzdHJpbmc7XG4gIHBlcm1pc3Npb25zOnN0cmluZztcbiAgdGltZTpzdHJpbmc7XG4gIGRhdGF0eXBlOnN0cmluZztcbiAgdXJsOiBzdHJpbmc7XG4gIG5hbWU6IHN0cmluZztcbn1cblxuXG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogXCJ0YWJzXCIsXG4gIHRlbXBsYXRlVXJsOiBcIi4vdGFicy90YWJzLmNvbXBvbmVudC5odG1sXCIsXG4gIHN0eWxlVXJsczpbXCIuL3RhYnMvdGFicy5jb21wb25lbnQuY3NzXCJdXG59KVxuZXhwb3J0IGNsYXNzIHRhYnNDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXR7XG5cbiAvL2l0ZW0gZnJvbSBjb2xsZWN0aW9uIFxuXG4gIHB1YmxpYyBteUl0ZW0kOiBPYnNlcnZhYmxlPEl0ZW0+O1xuICBwdWJsaWMgbXlJdGVtcyQ6IE9ic2VydmFibGU8QXJyYXk8SXRlbT4+O1xuICBwcml2YXRlIGl0ZW06IEl0ZW07XG4gIHByaXZhdGUgaXRlbXM6IEFycmF5PEl0ZW0+ID0gW107XG5cblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIHpvbmU6IE5nWm9uZSkge1xuICAgIC8vIEFuZ3VsYXJGaXJlTW9kdWxlLmluaXRpYWxpemVBcHAoe30pO1xuICB9XG5cbiAgLy8gaW5pdGlhbGl6ZSB0aGUgZmlyZWJhc2UgY29ubmVjdGlvblxuICAvLyBnZXQgZGF0YSBmcm9tIGZpcmVzdG9yZVxuICBuZ09uSW5pdCgpOiB2b2lkIHtcbiAgICBmaXJlYmFzZS5pbml0aWFsaXplQXBwKHtcbiAgICAgIHBlcnNpc3Q6IGZhbHNlXG4gICAgfSkudGhlbigoKSA9PiB7XG4gICAgICBjb25zb2xlLmxvZyhcIkZpcmViYXNlIGluaXRpYWxpemVkXCIpO1xuICAgIH0pO1xuXG4gICAgIHRoaXMuZmlyZXN0b3JlQ29sbGVjdGlvbk9ic2VydmFibGUoKTtcblxuICB9XG5cblxuICBmaXJlc3RvcmVDb2xsZWN0aW9uT2JzZXJ2YWJsZSgpOiB2b2lkIHtcbiAgICB0aGlzLm15SXRlbXMkID0gT2JzZXJ2YWJsZS5jcmVhdGUoc3Vic2NyaWJlciA9PiB7XG4gICAgICBjb25zdCBjb2xSZWY6IGZpcmVzdG9yZS5Db2xsZWN0aW9uUmVmZXJlbmNlID0gZmlyZWJhc2UuZmlyZXN0b3JlKCkuY29sbGVjdGlvbihcIml0ZW1zXCIpO1xuICAgICAgY29sUmVmLm9uU25hcHNob3QoKHNuYXBzaG90OiBmaXJlc3RvcmUuUXVlcnlTbmFwc2hvdCkgPT4ge1xuICAgICAgICB0aGlzLnpvbmUucnVuKCgpID0+IHtcbiAgICAgICAgICB0aGlzLml0ZW1zID0gW107XG4gICAgICAgICAgc25hcHNob3QuZm9yRWFjaChkb2NTbmFwID0+IHRoaXMuaXRlbXMucHVzaCg8SXRlbT5kb2NTbmFwLmRhdGEoKSkpO1xuICAgICAgICAgIHN1YnNjcmliZXIubmV4dCh0aGlzLml0ZW1zKTtcbiAgICAgICAgfSk7XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfVxuXG5cbiAgXG59XG4iXX0=