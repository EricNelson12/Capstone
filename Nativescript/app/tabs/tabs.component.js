"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
//
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
        //this.firestoreCollectionObservable();
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
    tabsComponent.prototype.firestoreWhereEveryone = function () {
        var _this = this;
        this.myItems$ = Observable_1.Observable.create(function (subscriber) {
            var query = firebase.firestore().collection("items")
                .where("permissions", "==", "Everyone");
            query
                .get()
                .then(function (querySnapshot) {
                querySnapshot.forEach(function (doc) {
                    _this.items = [];
                    querySnapshot.forEach(function (docSnap) { return _this.items.push(docSnap.data()); });
                    subscriber.next(_this.items);
                    console.log("Dentist Permissions: " + doc.id + " => " + JSON.stringify(doc.data()));
                });
            });
        });
    };
    tabsComponent.prototype.firestoreWhereDentists = function () {
        var _this = this;
        this.myItems$ = Observable_1.Observable.create(function (subscriber) {
            var query = firebase.firestore().collection("items")
                .where("permissions", "==", "Dentists/Doctors only");
            query
                .get()
                .then(function (querySnapshot) {
                querySnapshot.forEach(function (doc) {
                    _this.items = [];
                    querySnapshot.forEach(function (docSnap) { return _this.items.push(docSnap.data()); });
                    subscriber.next(_this.items);
                    console.log("Dentist Permissions: " + doc.id + " => " + JSON.stringify(doc.data()));
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFicy5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJ0YWJzLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUF1RDtBQU90RCxFQUFFO0FBSUgsVUFBVTtBQUNWLDhDQUE2QztBQUU3QyxJQUFNLFFBQVEsR0FBRyxPQUFPLENBQUMsa0NBQWtDLENBQUMsQ0FBQztBQUM3RCxJQUFNLGNBQWMsR0FBRyxPQUFPLENBQUMsa0NBQWtDLENBQUMsQ0FBQztBQUNuRSxJQUFNLE1BQU0sR0FBRyxPQUFPLENBQUMscUJBQXFCLENBQUMsQ0FBQztBQXVCOUM7SUFhRSx1QkFBb0IsSUFBWTtRQUFaLFNBQUksR0FBSixJQUFJLENBQVE7UUFIeEIsVUFBSyxHQUFnQixFQUFFLENBQUM7UUFJOUIsdUNBQXVDO0lBQ3pDLENBQUM7SUFFRCxxQ0FBcUM7SUFDckMsMEJBQTBCO0lBQzFCLGdDQUFRLEdBQVI7UUFDRSxRQUFRLENBQUMsYUFBYSxDQUFDO1lBQ3JCLE9BQU8sRUFBRSxLQUFLO1NBQ2YsQ0FBQyxDQUFDLElBQUksQ0FBQztZQUNOLE9BQU8sQ0FBQyxHQUFHLENBQUMsc0JBQXNCLENBQUMsQ0FBQztRQUN0QyxDQUFDLENBQUMsQ0FBQztRQUVGLHVDQUF1QztJQUUxQyxDQUFDO0lBR0QscURBQTZCLEdBQTdCO1FBQUEsaUJBV0M7UUFWQyxJQUFJLENBQUMsUUFBUSxHQUFHLHVCQUFVLENBQUMsTUFBTSxDQUFDLFVBQUEsVUFBVTtZQUMxQyxJQUFNLE1BQU0sR0FBa0MsUUFBUSxDQUFDLFNBQVMsRUFBRSxDQUFDLFVBQVUsQ0FBQyxPQUFPLENBQUMsQ0FBQztZQUN2RixNQUFNLENBQUMsVUFBVSxDQUFDLFVBQUMsUUFBaUM7Z0JBQ2xELEtBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDO29CQUNaLEtBQUksQ0FBQyxLQUFLLEdBQUcsRUFBRSxDQUFDO29CQUNoQixRQUFRLENBQUMsT0FBTyxDQUFDLFVBQUEs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dCI6WyJpbXBvcnQge0NvbXBvbmVudCxPbkluaXQsTmdab25lIH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcbmltcG9ydCAqIGFzIGxpc3RWaWV3TW9kdWxlIGZyb20gXCJ0bnMtY29yZS1tb2R1bGVzL3VpL2xpc3Qtdmlld1wiO1xuaW1wb3J0ICogYXMgSW1hZ2VNb2R1bGUgZnJvbSBcInRucy1jb3JlLW1vZHVsZXMvdWkvaW1hZ2VcIjtcbmltcG9ydCB7IEltYWdlIH0gZnJvbSBcInRucy1jb3JlLW1vZHVsZXMvdWkvaW1hZ2VcIjtcbmltcG9ydCB7IEluZm99IGZyb20gJy4vaW5mbyc7XG5pbXBvcnQgeyByZWdpc3RlckVsZW1lbnQgfSBmcm9tIFwibmF0aXZlc2NyaXB0LWFuZ3VsYXIvZWxlbWVudC1yZWdpc3RyeVwiO1xuIFxuIC8vXG5cblxuXG4vL2ZpcmViYXNlXG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSBcInJ4anMvT2JzZXJ2YWJsZVwiO1xuaW1wb3J0IHsgZmlyZXN0b3JlIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1wbHVnaW4tZmlyZWJhc2VcIjtcbmNvbnN0IGZpcmViYXNlID0gcmVxdWlyZShcIm5hdGl2ZXNjcmlwdC1wbHVnaW4tZmlyZWJhc2UvYXBwXCIpO1xuY29uc3QgZmlyZWJhc2VXZWJBcGkgPSByZXF1aXJlKFwibmF0aXZlc2NyaXB0LXBsdWdpbi1maXJlYmFzZS9hcHBcIik7XG5jb25zdCBNYXBCb3ggPSByZXF1aXJlKFwibmF0aXZlc2NyaXB0LW1hcGJveFwiKTtcblxuLy9pdGVtc1xuXG5leHBvcnQgaW50ZXJmYWNlIEl0ZW17XG4gIGlkOnN0cmluZztcbiAgdGl0bGU6c3RyaW5nO1xuICBkZXNjcmlwdGlvbjpzdHJpbmc7XG4gIGFkbWlucG9zdGVkOnN0cmluZztcbiAgcGVybWlzc2lvbnM6c3RyaW5nO1xuICB0aW1lOnN0cmluZztcbiAgZGF0YXR5cGU6c3RyaW5nO1xuICB1cmw6IHN0cmluZztcbiAgbmFtZTogc3RyaW5nO1xufVxuXG5cblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiBcInRhYnNcIixcbiAgdGVtcGxhdGVVcmw6IFwiLi90YWJzL3RhYnMuY29tcG9uZW50Lmh0bWxcIixcbiAgc3R5bGVVcmxzOltcIi4vdGFicy90YWJzLmNvbXBvbmVudC5jc3NcIl1cbn0pXG5leHBvcnQgY2xhc3MgdGFic0NvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdHtcblxuICAvL2dvb2dsZSBtYXBzIHN0dWZmXG4gXG5cblxuICAvL2l0ZW0gZnJvbSBjb2xsZWN0aW9uIFxuICBwdWJsaWMgbXlJdGVtJDogT2JzZXJ2YWJsZTxJdGVtPjtcbiAgcHVibGljIG15SXRlbXMkOiBPYnNlcnZhYmxlPEFycmF5PEl0ZW0+PjtcbiAgcHJpdmF0ZSBpdGVtOiBJdGVtO1xuICBwcml2YXRlIGl0ZW1zOiBBcnJheTxJdGVtPiA9IFtdO1xuXG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSB6b25lOiBOZ1pvbmUpIHtcbiAgICAvLyBBbmd1bGFyRmlyZU1vZHVsZS5pbml0aWFsaXplQXBwKHt9KTtcbiAgfVxuXG4gIC8vIGluaXRpYWxpemUgdGhlIGZpcmViYXNlIGNvbm5lY3Rpb25cbiAgLy8gZ2V0IGRhdGEgZnJvbSBmaXJlc3RvcmVcbiAgbmdPbkluaXQoKTogdm9pZCB7XG4gICAgZmlyZWJhc2UuaW5pdGlhbGl6ZUFwcCh7XG4gICAgICBwZXJzaXN0OiBmYWxzZVxuICAgIH0pLnRoZW4oKCkgPT4ge1xuICAgICAgY29uc29sZS5sb2coXCJGaXJlYmFzZSBpbml0aWFsaXplZFwiKTtcbiAgICB9KTtcblxuICAgICAvL3RoaXMuZmlyZXN0b3JlQ29sbGVjdGlvbk9ic2VydmFibGUoKTtcblxuICB9XG5cblxuICBmaXJlc3RvcmVDb2xsZWN0aW9uT2JzZXJ2YWJsZSgpOiB2b2lkIHtcbiAgICB0aGlzLm15SXRlbXMkID0gT2JzZXJ2YWJsZS5jcmVhdGUoc3Vic2NyaWJlciA9PiB7XG4gICAgICBjb25zdCBjb2xSZWY6IGZpcmVzdG9yZS5Db2xsZWN0aW9uUmVmZXJlbmNlID0gZmlyZWJhc2UuZmlyZXN0b3JlKCkuY29sbGVjdGlvbihcIml0ZW1zXCIpO1xuICAgICAgY29sUmVmLm9uU25hcHNob3QoKHNuYXBzaG90OiBmaXJlc3RvcmUuUXVlcnlTbmFwc2hvdCkgPT4ge1xuICAgICAgICB0aGlzLnpvbmUucnVuKCgpID0+IHtcbiAgICAgICAgICB0aGlzLml0ZW1zID0gW107XG4gICAgICAgICAgc25hcHNob3QuZm9yRWFjaChkb2NTbmFwID0+IHRoaXMuaXRlbXMucHVzaCg8SXRlbT5kb2NTbmFwLmRhdGEoKSkpO1xuICAgICAgICAgIHN1YnNjcmliZXIubmV4dCh0aGlzLml0ZW1zKTtcbiAgICAgICAgfSk7XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfVxuXG4gIHB1YmxpYyBmaXJlc3RvcmVXaGVyZUV2ZXJ5b25lKCk6IHZvaWQge1xuICAgIHRoaXMubXlJdGVtcyQgPSBPYnNlcnZhYmxlLmNyZWF0ZShzdWJzY3JpYmVyID0+IHtcbiAgICAgY29uc3QgcXVlcnk6IGZpcmVzdG9yZS5RdWVyeSA9IGZpcmViYXNlLmZpcmVzdG9yZSgpLmNvbGxlY3Rpb24oXCJpdGVtc1wiKVxuICAgICAgICAud2hlcmUoXCJwZXJtaXNzaW9uc1wiLCBcIj09XCIsIFwiRXZlcnlvbmVcIik7XG4gICAgcXVlcnlcbiAgICAgICAgLmdldCgpXG4gICAgICAgIC50aGVuKChxdWVyeVNuYXBzaG90OiBmaXJlc3RvcmUuUXVlcnlTbmFwc2hvdCkgPT4ge1xuICAgICAgICAgIHF1ZXJ5U25hcHNob3QuZm9yRWFjaChkb2MgPT4ge1xuXG4gICAgICAgICAgICB0aGlzLml0ZW1zID0gW107XG4gICAgICAgICAgICBxdWVyeVNuYXBzaG90LmZvckVhY2goZG9jU25hcCA9PiB0aGlzLml0ZW1zLnB1c2goPEl0ZW0+ZG9jU25hcC5kYXRhKCkpKTtcbiAgICAgICAgICAgIHN1YnNjcmliZXIubmV4dCh0aGlzLml0ZW1zKTtcblxuICAgICAgICAgICAgY29uc29sZS5sb2coYERlbnRpc3QgUGVybWlzc2lvbnM6ICR7ZG9jLmlkfSA9PiAke0pTT04uc3RyaW5naWZ5KGRvYy5kYXRhKCkpfWApO1xuICAgICAgICAgICB9KTtcbiAgICB9KTtcbiAgfSk7XG59XG4gIFxucHVibGljIGZpcmVzdG9yZVdoZXJlRGVudGlzdHMoKTogdm9pZCB7XG4gICAgdGhpcy5teUl0ZW1zJCA9IE9ic2VydmFibGUuY3JlYXRlKHN1YnNjcmliZXIgPT4ge1xuICAgICBjb25zdCBxdWVyeTogZmlyZXN0b3JlLlF1ZXJ5ID0gZmlyZWJhc2UuZmlyZXN0b3JlKCkuY29sbGVjdGlvbihcIml0ZW1zXCIpXG4gICAgICAgIC53aGVyZShcInBlcm1pc3Npb25zXCIsIFwiPT1cIiwgXCJEZW50aXN0cy9Eb2N0b3JzIG9ubHlcIik7XG4gICAgcXVlcnlcbiAgICAgICAgLmdldCgpXG4gICAgICAgIC50aGVuKChxdWVyeVNuYXBzaG90OiBmaXJlc3RvcmUuUXVlcnlTbmFwc2hvdCkgPT4ge1xuICAgICAgICAgIHF1ZXJ5U25hcHNob3QuZm9yRWFjaChkb2MgPT4ge1xuXG4gICAgICAgICAgICB0aGlzLml0ZW1zID0gW107XG4gICAgICAgICAgICBxdWVyeVNuYXBzaG90LmZvckVhY2goZG9jU25hcCA9PiB0aGlzLml0ZW1zLnB1c2goPEl0ZW0+ZG9jU25hcC5kYXRhKCkpKTtcbiAgICAgICAgICAgIHN1YnNjcmliZXIubmV4dCh0aGlzLml0ZW1zKTtcblxuICAgICAgICAgICAgY29uc29sZS5sb2coYERlbnRpc3QgUGVybWlzc2lvbnM6ICR7ZG9jLmlkfSA9PiAke0pTT04uc3RyaW5naWZ5KGRvYy5kYXRhKCkpfWApO1xuICAgICAgICAgICB9KTtcbiAgICB9KTtcbiAgfSk7XG59XG5cblxuXG5cblxuXG5cblxuXG4gIFxufVxuIl19