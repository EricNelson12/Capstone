"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var image_1 = require("tns-core-modules/ui/image");
var image_source_1 = require("image-source");
var core_2 = require("@angular/core");
var nativescript_google_maps_sdk_1 = require("nativescript-google-maps-sdk");
var router_1 = require("@angular/router");
var router_2 = require("@angular/router");
var Geolocation = require("nativescript-geolocation");
var topmost = require("ui/frame").topmost;
// Important - must register MapView plugin in order to use in Angular templates
//registerElement("MapView", () => require("nativescript-google-maps-sdk").MapView);
//videoplayer
var element_registry_1 = require("nativescript-angular/element-registry");
element_registry_1.registerElement("VideoPlayer", function () { return require("nativescript-videoplayer").Video; });
//firebase
var Observable_1 = require("rxjs/Observable");
var firebase = require("nativescript-plugin-firebase/app");
var firebaseFCM = require("nativescript-plugin-firebase");
var firebaseWebApi = require("nativescript-plugin-firebase/app");
var MapBox = require("nativescript-mapbox");
var tabsComponent = (function () {
    function tabsComponent(zone, route, router) {
        var _this = this;
        this.zone = zone;
        this.route = route;
        this.router = router;
        this.items = [];
        this.autoUpdate = "False";
        this.latitude = 49.9298;
        this.longitude = -119.3968;
        this.zoom = 12;
        this.bearing = 0;
        this.tilt = 0;
        this.padding = [40, 40, 40, 40];
        this.currentGeoLocation = null;
        this.route.queryParams.subscribe(function (params) {
            _this.query = params["query"];
        });
    }
    tabsComponent.prototype.show = function () {
        alert(this.query);
    };
    //Map events
    tabsComponent.prototype.onMapReady = function (event) {
        console.log('Map Ready');
        this.mapView = event.object;
        console.log("Setting a marker...");
        var marker = new nativescript_google_maps_sdk_1.Marker();
        marker.position = nativescript_google_maps_sdk_1.Position.positionFromLatLng(49.9223619, -119.3971927);
        marker.title = "Kelowna";
        marker.snippet = "Perfit Dental";
        marker.userData = { index: 1 };
        var marker2 = new nativescript_google_maps_sdk_1.Marker();
        marker2.position = nativescript_google_maps_sdk_1.Position.positionFromLatLng(this.latitude, this.longitude);
        marker2.title = "University of British Columbia";
        marker2.snippet = "Kelowna";
        marker2.userData = { index: 2 };
        // check if geolocation is not enabled
        Geolocation.enableLocationRequest(); // request for the user to enable it
        this.mapView.addMarker(marker);
        this.mapView.addMarker(marker2);
    };
    tabsComponent.prototype.getDeviceLocation = function () {
        return new Promise(function (resolve, reject) {
            Geolocation.enableLocationRequest().then(function () {
                Geolocation.getCurrentLocation({ timeout: 10000 }).then(function (location) {
                    resolve(location);
                }).catch(function (error) {
                    reject(error);
                });
            });
        });
    };
    tabsComponent.prototype.updateLocation = function () {
        var _this = this;
        this.getDeviceLocation().then(function (result) {
            _this.latitude = result.latitude;
            _this.longitude = result.longitude;
        }, function (error) {
            console.error(error);
        });
    };
    tabsComponent.prototype.startWatchingLocation = function () {
        var _this = this;
        Geolocation.enableLocationRequest(); // request for the user to enable it
        this.watchId = Geolocation.watchLocation(function (location) {
            if (location) {
                _this.zone.run(function () {
                    _this.latitude = location.latitude;
                    _this.longitude = location.longitude;
                    console.log(_this.latitude);
                    console.log(_this.longitude);
                    var marker3 = new nativescript_google_maps_sdk_1.Marker();
                    marker3.position = nativescript_google_maps_sdk_1.Position.positionFromLatLng(_this.latitude, _this.longitude);
                    marker3.title = "Your location";
                    marker3.snippet = _this.latitude.toString() + "," + _this.longitude.toString();
                    marker3.userData = { index: 2 };
                    var imgSrc = new image_source_1.ImageSource();
                    imgSrc.fromFile("~/images/location.png");
                    var image = new image_1.Image();
                    image.imageSource = imgSrc;
                    marker3.icon = image;
                    _this.mapView.addMarker(marker3);
                });
            }
        }, function (error) {
            console.log(error);
        }, { updateDistance: 1, minimumUpdateTime: 1000 });
    };
    tabsComponent.prototype.stopWatchingLocation = function () {
        if (this.watchId) {
            Geolocation.clearWatch(this.watchId);
            this.watchId = null;
        }
    };
    tabsComponent.prototype.onCoordinateTapped = function (args) {
        console.log("Coordinate Tapped, Lat: " + args.position.latitude + ", Lon: " + args.position.longitude, args);
    };
    tabsComponent.prototype.onMarkerEvent = function (args) {
        console.log("Marker Event: '" + args.eventName
            + "' triggered on: " + args.marker.title
            + ", Lat: " + args.marker.position.latitude + ", Lon: " + args.marker.position.longitude, args);
    };
    tabsComponent.prototype.onCameraChanged = function (args) {
        console.log("Camera changed: " + JSON.stringify(args.camera), JSON.stringify(args.camera) === this.lastCamera);
        this.lastCamera = JSON.stringify(args.camera);
    };
    // initialize the firebase connection
    // get data from firestore
    tabsComponent.prototype.ngOnInit = function () {
        var _this = this;
        firebaseFCM.addOnMessageReceivedCallback(function (message) {
            console.log("Update VIA Background Push Notification");
            _this.zone.run(function () {
                _this.firestoreCollectionObservable();
            });
        });
        firebase.initializeApp({
            persist: false
        }).then(function () {
            console.log("Firebase initialized");
        });
        this.firestoreCollectionObservable();
    };
    tabsComponent.prototype.firestoreCollectionObservable = function () {
        var _this = this;
        console.log("Function Called: firestoreCollectionObservable()");
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
                .where("permissions", "==", _this.query);
            query
                .get()
                .then(function (querySnapshot) {
                querySnapshot.forEach(function (doc) {
                    _this.items = [];
                    querySnapshot.forEach(function (docSnap) { return _this.items.push(docSnap.data()); });
                    subscriber.next(_this.items);
                    //console.log(`Dentist Permissions: ${doc.id} => ${JSON.stringify(doc.data())}`);
                });
            });
        });
    };
    tabsComponent.prototype.firestoreWhereDentists = function () {
        var _this = this;
        this.myItems$ = Observable_1.Observable.create(function (subscriber) {
            var query = firebase.firestore().collection("items")
                .where("permissions", "==", _this.query);
            query
                .get()
                .then(function (querySnapshot) {
                querySnapshot.forEach(function (doc) {
                    _this.items = [];
                    querySnapshot.forEach(function (docSnap) { return _this.items.push(docSnap.data()); });
                    subscriber.next(_this.items);
                    // console.log(`Dentist Permissions: ${doc.id} => ${JSON.stringify(doc.data())}`);
                });
            });
        });
    };
    tabsComponent.prototype.viewDetail = function (title) {
        console.log("clicking view detail" + title);
        var navigationExtras = {
            queryParams: {
                "Title": title,
            }
        };
        this.router.navigate(["detail"], navigationExtras);
        console.log("navigating");
        // this.router.navigate(["/detail"]);
    };
    tabsComponent = __decorate([
        core_1.Component({
            selector: "tabs",
            templateUrl: "./tabs/tabs.component.html",
            styleUrls: ["./tabs/tabs.component.css"]
        }),
        core_2.Injectable(),
        __metadata("design:paramtypes", [core_1.NgZone, router_1.ActivatedRoute, router_2.Router])
    ], tabsComponent);
    return tabsComponent;
}());
exports.tabsComponent = tabsComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFicy5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJ0YWJzLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUF1RDtBQUd2RCxtREFBa0Q7QUFDbEQsNkNBQTJDO0FBQzNDLHNDQUEyQztBQUszQyw2RUFBeUU7QUFDekUsMENBQWlFO0FBQ2pFLDBDQUF1QztBQUN2QyxzREFBd0Q7QUFDeEQsSUFBTSxPQUFPLEdBQUcsT0FBTyxDQUFDLFVBQVUsQ0FBQyxDQUFDLE9BQU8sQ0FBQztBQUU1QyxnRkFBZ0Y7QUFDaEYsb0ZBQW9GO0FBRXBGLGFBQWE7QUFFYiwwRUFBc0U7QUFDdEUsa0NBQWUsQ0FBQyxhQUFhLEVBQUUsY0FBTSxPQUFBLE9BQU8sQ0FBQywwQkFBMEIsQ0FBQyxDQUFDLEtBQUssRUFBekMsQ0FBeUMsQ0FBQyxDQUFDO0FBSWhGLFVBQVU7QUFDViw4Q0FBNkM7QUFFN0MsSUFBTSxRQUFRLEdBQUcsT0FBTyxDQUFDLGtDQUFrQyxDQUFDLENBQUM7QUFDN0QsSUFBTSxXQUFXLEdBQUcsT0FBTyxDQUFDLDhCQUE4QixDQUFDLENBQUM7QUFDNUQsSUFBTSxjQUFjLEdBQUcsT0FBTyxDQUFDLGtDQUFrQyxDQUFDLENBQUM7QUFDbkUsSUFBTSxNQUFNLEdBQUcsT0FBTyxDQUFDLHFCQUFxQixDQUFDLENBQUM7QUF3QjlDO0lBZUUsdUJBQW9CLElBQVksRUFBVSxLQUFxQixFQUFVLE1BQWM7UUFBdkYsaUJBSUM7UUFKbUIsU0FBSSxHQUFKLElBQUksQ0FBUTtRQUFVLFVBQUssR0FBTCxLQUFLLENBQWdCO1FBQVUsV0FBTSxHQUFOLE1BQU0sQ0FBUTtRQVIvRSxVQUFLLEdBQWdCLEVBQUUsQ0FBQztRQUN6QixlQUFVLEdBQUcsT0FBTyxDQUFDO1FBa0I5QixhQUFRLEdBQUksT0FBTyxDQUFDO1FBQ3BCLGNBQVMsR0FBRyxDQUFDLFFBQVEsQ0FBQztRQUN0QixTQUFJLEdBQUcsRUFBRSxDQUFDO1FB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TyxDQUFDLEdBQUcsQ0FBQyxZQUFZLENBQUMsQ0FBQztRQUMxQixxQ0FBcUM7SUFDdkMsQ0FBQztJQW5PWSxhQUFhO1FBUHpCLGdCQUFTLENBQUM7WUFDVCxRQUFRLEVBQUUsTUFBTTtZQUNoQixXQUFXLEVBQUUsNEJBQTRCO1lBQ3pDLFNBQVMsRUFBQyxDQUFDLDJCQUEyQixDQUFDO1NBQ3hDLENBQUM7UUFFRCxpQkFBVSxFQUFFO3lDQWdCZSxhQUFNLEVBQWlCLHVCQUFjLEVBQWtCLGVBQU07T0FmNUUsYUFBYSxDQXVPekI7SUFBRCxvQkFBQztDQUFBLEFBdk9ELElBdU9DO0FBdk9ZLHNDQUFhIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtDb21wb25lbnQsT25Jbml0LE5nWm9uZSB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XHJcbmltcG9ydCAqIGFzIGxpc3RWaWV3TW9kdWxlIGZyb20gXCJ0bnMtY29yZS1tb2R1bGVzL3VpL2xpc3Qtdmlld1wiO1xyXG5pbXBvcnQgKiBhcyBJbWFnZU1vZHVsZSBmcm9tIFwidG5zLWNvcmUtbW9kdWxlcy91aS9pbWFnZVwiO1xyXG5pbXBvcnQgeyBJbWFnZSB9IGZyb20gXCJ0bnMtY29yZS1tb2R1bGVzL3VpL2ltYWdlXCI7XHJcbmltcG9ydCB7IEltYWdlU291cmNlIH0gZnJvbSBcImltYWdlLXNvdXJjZVwiO1xyXG5pbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcclxuaW1wb3J0IHsgSW5mb30gZnJvbSAnLi9pbmZvJztcclxuXHJcblxyXG5pbXBvcnQge0VsZW1lbnRSZWYsIFZpZXdDaGlsZH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IE1hcFZpZXcsIE1hcmtlciwgUG9zaXRpb24gfSBmcm9tICduYXRpdmVzY3JpcHQtZ29vZ2xlLW1hcHMtc2RrJztcclxuaW1wb3J0IHtBY3RpdmF0ZWRSb3V0ZSwgTmF2aWdhdGlvbkV4dHJhc30gZnJvbSBcIkBhbmd1bGFyL3JvdXRlclwiO1xyXG5pbXBvcnQge1JvdXRlcn0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcclxuaW1wb3J0ICogYXMgR2VvbG9jYXRpb24gZnJvbSBcIm5hdGl2ZXNjcmlwdC1nZW9sb2NhdGlvblwiO1xyXG5jb25zdCB0b3Btb3N0ID0gcmVxdWlyZShcInVpL2ZyYW1lXCIpLnRvcG1vc3Q7XHJcblxyXG4vLyBJbXBvcnRhbnQgLSBtdXN0IHJlZ2lzdGVyIE1hcFZpZXcgcGx1Z2luIGluIG9yZGVyIHRvIHVzZSBpbiBBbmd1bGFyIHRlbXBsYXRlc1xyXG4vL3JlZ2lzdGVyRWxlbWVudChcIk1hcFZpZXdcIiwgKCkgPT4gcmVxdWlyZShcIm5hdGl2ZXNjcmlwdC1nb29nbGUtbWFwcy1zZGtcIikuTWFwVmlldyk7XHJcblxyXG4vL3ZpZGVvcGxheWVyXHJcblxyXG5pbXBvcnQge3JlZ2lzdGVyRWxlbWVudH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1hbmd1bGFyL2VsZW1lbnQtcmVnaXN0cnlcIjtcclxucmVnaXN0ZXJFbGVtZW50KFwiVmlkZW9QbGF5ZXJcIiwgKCkgPT4gcmVxdWlyZShcIm5hdGl2ZXNjcmlwdC12aWRlb3BsYXllclwiKS5WaWRlbyk7XHJcblxyXG5cclxuXHJcbi8vZmlyZWJhc2VcclxuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gXCJyeGpzL09ic2VydmFibGVcIjtcclxuaW1wb3J0IHsgZmlyZXN0b3JlIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1wbHVnaW4tZmlyZWJhc2VcIjtcclxuY29uc3QgZmlyZWJhc2UgPSByZXF1aXJlKFwibmF0aXZlc2NyaXB0LXBsdWdpbi1maXJlYmFzZS9hcHBcIik7XHJcbmNvbnN0IGZpcmViYXNlRkNNID0gcmVxdWlyZShcIm5hdGl2ZXNjcmlwdC1wbHVnaW4tZmlyZWJhc2VcIik7XHJcbmNvbnN0IGZpcmViYXNlV2ViQXBpID0gcmVxdWlyZShcIm5hdGl2ZXNjcmlwdC1wbHVnaW4tZmlyZWJhc2UvYXBwXCIpO1xyXG5jb25zdCBNYXBCb3ggPSByZXF1aXJlKFwibmF0aXZlc2NyaXB0LW1hcGJveFwiKTtcclxuXHJcbi8vaXRlbXNcclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgSXRlbXtcclxuICBpZDpzdHJpbmc7XHJcbiAgdGl0bGU6c3RyaW5nO1xyXG4gIGRlc2NyaXB0aW9uOnN0cmluZztcclxuICBhZG1pbnBvc3RlZDpzdHJpbmc7XHJcbiAgcGVybWlzc2lvbnM6c3RyaW5nO1xyXG4gIHRpbWU6c3RyaW5nO1xyXG4gIGRhdGF0eXBlOnN0cmluZztcclxuICB1cmw6IHN0cmluZztcclxuICBuYW1lOiBzdHJpbmc7XHJcbn1cclxuXHJcblxyXG5AQ29tcG9uZW50KHtcclxuICBzZWxlY3RvcjogXCJ0YWJzXCIsXHJcbiAgdGVtcGxhdGVVcmw6IFwiLi90YWJzL3RhYnMuY29tcG9uZW50Lmh0bWxcIixcclxuICBzdHlsZVVybHM6W1wiLi90YWJzL3RhYnMuY29tcG9uZW50LmNzc1wiXVxyXG59KVxyXG5cclxuQEluamVjdGFibGUoKVxyXG5leHBvcnQgY2xhc3MgdGFic0NvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XHJcblxyXG5cclxuICAvL2l0ZW0gZnJvbSBjb2xsZWN0aW9uIFxyXG4gIHB1YmxpYyBteUl0ZW0kOiBPYnNlcnZhYmxlPEl0ZW0+O1xyXG4gIHB1YmxpYyBteUl0ZW1zJDogT2JzZXJ2YWJsZTxBcnJheTxJdGVtPj47XHJcbiAgcHJpdmF0ZSBpdGVtOiBJdGVtO1xyXG4gIHByaXZhdGUgaXRlbXM6IEFycmF5PEl0ZW0+ID0gW107XHJcbiAgcHVibGljIGF1dG9VcGRhdGUgPSBcIkZhbHNlXCI7XHJcblxyXG4gXHJcblxyXG5cclxuICBwdWJsaWMgcXVlcnk6IHN0cmluZztcclxuXHJcbiAgY29uc3RydWN0b3IocHJpdmF0ZSB6b25lOiBOZ1pvbmUsIHByaXZhdGUgcm91dGU6IEFjdGl2YXRlZFJvdXRlLCBwcml2YXRlIHJvdXRlcjogUm91dGVyKSB7XHJcbiAgICB0aGlzLnJvdXRlLnF1ZXJ5UGFyYW1zLnN1YnNjcmliZShwYXJhbXMgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLnF1ZXJ5ID0gcGFyYW1zW1wicXVlcnlcIl07XHJcbiAgICAgICAgfSk7XHJcbiAgfVxyXG5cclxuICBzaG93KCl7XHJcbiAgICBhbGVydCh0aGlzLnF1ZXJ5KTtcclxuICB9XHJcblxyXG5cclxubGF0aXR1ZGUgPSAgNDkuOTI5ODtcclxubG9uZ2l0dWRlID0gLTExOS4zOTY4O1xyXG56b29tID0gMTI7XHJcbmJlYXJpbmcgPSAwO1xyXG50aWx0ID0gMDtcclxucGFkZGluZyA9IFs0MCwgNDAsIDQwLCA0MF07XHJcbm1hcFZpZXc6IE1hcFZpZXc7XHJcbnB1YmxpYyBjdXJyZW50R2VvTG9jYXRpb24gPSBudWxsO1xyXG5sYXN0Q2FtZXJhOiBTdHJpbmc7XHJcblxyXG5wcml2YXRlIHdhdGNoSWQ6IG51bWJlcjtcclxuXHJcbi8vTWFwIGV2ZW50c1xyXG5vbk1hcFJlYWR5KGV2ZW50KSB7XHJcbiAgICBjb25zb2xlLmxvZygnTWFwIFJlYWR5Jyk7XHJcblxyXG4gICAgdGhpcy5tYXBWaWV3ID0gZXZlbnQub2JqZWN0O1xyXG5cclxuICAgIGNvbnNvbGUubG9nKFwiU2V0dGluZyBhIG1hcmtlci4uLlwiKTtcclxuICAgIHZhciBtYXJrZXIgPSBuZXcgTWFya2VyKCk7XHJcbiAgICBtYXJrZXIucG9zaXRpb24gPSBQb3NpdGlvbi5wb3NpdGlvbkZyb21MYXRMbmcoNDkuOTIyMzYxOSwtMTE5LjM5NzE5MjcpO1xyXG4gICAgbWFya2VyLnRpdGxlID0gXCJLZWxvd25hXCI7XHJcbiAgICBtYXJrZXIuc25pcHBldCA9IFwiUGVyZml0IERlbnRhbFwiO1xyXG4gICAgbWFya2VyLnVzZXJEYXRhID0ge2luZGV4OiAxfTtcclxuICAgIHZhciBtYXJrZXIyID0gbmV3IE1hcmtlcigpO1xyXG4gICAgbWFya2VyMi5wb3NpdGlvbj1Qb3NpdGlvbi5wb3NpdGlvbkZyb21MYXRMbmcodGhpcy5sYXRpdHVkZSwgdGhpcy5sb25naXR1ZGUpO1xyXG4gICAgbWFya2VyMi50aXRsZT1cIlVuaXZlcnNpdHkgb2YgQnJpdGlzaCBDb2x1bWJpYVwiO1xyXG4gICAgbWFya2VyMi5zbmlwcGV0ID0gXCJLZWxvd25hXCI7XHJcbiAgICBtYXJrZXIyLnVzZXJEYXRhID0ge2luZGV4OjJ9O1xyXG4gICAgXHJcbiAgICBcclxuICAgICAvLyBjaGVjayBpZiBnZW9sb2NhdGlvbiBpcyBub3QgZW5hYmxlZFxyXG4gICAgICAgIEdlb2xvY2F0aW9uLmVuYWJsZUxvY2F0aW9uUmVxdWVzdCgpOyAvLyByZXF1ZXN0IGZvciB0aGUgdXNlciB0byBlbmFibGUgaXRcclxuICAgICAgXHJcbiAgICB0aGlzLm1hcFZpZXcuYWRkTWFya2VyKG1hcmtlcik7XHJcbiAgICB0aGlzLm1hcFZpZXcuYWRkTWFya2VyKG1hcmtlcjIpO1xyXG5cclxuXHJcbn1cclxucHJpdmF0ZSBnZXREZXZpY2VMb2NhdGlvbigpOiBQcm9taXNlPGFueT4ge1xyXG4gIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcbiAgICAgIEdlb2xvY2F0aW9uLmVuYWJsZUxvY2F0aW9uUmVxdWVzdCgpLnRoZW4oKCkgPT4ge1xyXG4gICAgICAgICAgR2VvbG9jYXRpb24uZ2V0Q3VycmVudExvY2F0aW9uKHt0aW1lb3V0OiAxMDAwMH0pLnRoZW4obG9jYXRpb24gPT4ge1xyXG4gICAgICAgICAgICAgIHJlc29sdmUobG9jYXRpb24pO1xyXG4gICAgICAgICAgfSkuY2F0Y2goZXJyb3IgPT4ge1xyXG4gICAgICAgICAgICAgIHJlamVjdChlcnJvcik7XHJcbiAgICAgICAgICB9KTtcclxuICAgICAgfSk7XHJcbiAgfSk7XHJcbn1cclxuXHJcbnB1YmxpYyB1cGRhdGVMb2NhdGlvbigpIHtcclxuICBcclxuICB0aGlzLmdldERldmljZUxvY2F0aW9uKCkudGhlbihyZXN1bHQgPT4ge1xyXG4gICAgICB0aGlzLmxhdGl0dWRlID0gcmVzdWx0LmxhdGl0dWRlO1xyXG4gICAgICB0aGlzLmxvbmdpdHVkZSA9IHJlc3VsdC5sb25naXR1ZGU7XHJcbiAgICAgICAgICAgXHJcbiAgfSwgZXJyb3IgPT4ge1xyXG4gICAgICBjb25zb2xlLmVycm9yKGVycm9yKTtcclxuICB9KTtcclxufVxyXG5cclxucHVibGljIHN0YXJ0V2F0Y2hpbmdMb2NhdGlvbigpIHtcclxuICBHZW9sb2NhdGlvbi5lbmFibGVMb2NhdGlvblJlcXVlc3QoKTsgLy8gcmVxdWVzdCBmb3IgdGhlIHVzZXIgdG8gZW5hYmxlIGl0XHJcbiAgdGhpcy53YXRjaElkID0gR2VvbG9jYXRpb24ud2F0Y2hMb2NhdGlvbihsb2NhdGlvbiA9PiB7XHJcbiAgICAgIGlmKGxvY2F0aW9uKSB7XHJcbiAgICAgICAgICB0aGlzLnpvbmUucnVuKCgpID0+IHtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgdGhpcy5sYXRpdHVkZSA9IGxvY2F0aW9uLmxhdGl0dWRlO1xyXG4gICAgICAgICAgICAgIHRoaXMubG9uZ2l0dWRlID0gbG9jYXRpb24ubG9uZ2l0dWRlO1xyXG4gICAgICAgICAgICAgIGNvbnNvbGUubG9nKHRoaXMubGF0aXR1ZGUpO1xyXG4gICAgICAgICAgICAgIGNvbnNvbGUubG9nKHRoaXMubG9uZ2l0dWRlKTtcclxuICAgICAgICAgICAgICB2YXIgbWFya2VyMyA9IG5ldyBNYXJrZXIoKTtcclxuICAgICAgICAgICAgICBtYXJrZXIzLnBvc2l0aW9uPVBvc2l0aW9uLnBvc2l0aW9uRnJvbUxhdExuZyh0aGlzLmxhdGl0dWRlLCB0aGlzLmxvbmdpdHVkZSk7XHJcbiAgICAgICAgICAgICAgbWFya2VyMy50aXRsZT1cIllvdXIgbG9jYXRpb25cIjtcclxuICAgICAgICAgICAgICBtYXJrZXIzLnNuaXBwZXQgPSB0aGlzLmxhdGl0dWRlLnRvU3RyaW5nKCkgKyBcIixcIiArIHRoaXMubG9uZ2l0dWRlLnRvU3RyaW5nKCk7XHJcbiAgICAgICAgICAgICAgbWFya2VyMy51c2VyRGF0YSA9IHtpbmRleDoyfTtcclxuXHJcbiAgICAgICAgICAgICAgbGV0IGltZ1NyYyA9IG5ldyBJbWFnZVNvdXJjZSgpO1xyXG4gICAgICAgICAgICAgIGltZ1NyYy5mcm9tRmlsZShcIn4vaW1hZ2VzL2xvY2F0aW9uLnBuZ1wiKTtcclxuICAgICAgXHJcbiAgICAgICAgICAgICAgbGV0IGltYWdlID0gbmV3IEltYWdlKCk7XHJcbiAgICAgICAgICAgICAgaW1hZ2UuaW1hZ2VTb3VyY2UgPSBpbWdTcmM7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgIG1hcmtlcjMuaWNvbiA9IGltYWdlO1xyXG4gICAgICAgICAgICAgIHRoaXMubWFwVmlldy5hZGRNYXJrZXIobWFya2VyMyk7XHJcbiAgICAgICAgICAgICAgXHJcbiAgICAgICAgICB9KTtcclxuICAgICAgfVxyXG4gIH0sIGVycm9yID0+IHtcclxuICAgICAgY29uc29sZS5sb2coZXJyb3IpO1xyXG4gIH0sIHsgdXBkYXRlRGlzdGFuY2U6IDEsIG1pbmltdW1VcGRhdGVUaW1lOiAxMDAwIH0pO1xyXG59XHJcblxyXG5wdWJsaWMgc3RvcFdhdGNoaW5nTG9jYXRpb24oKSB7XHJcbiAgaWYodGhpcy53YXRjaElkKSB7XHJcbiAgICAgIEdlb2xvY2F0aW9uLmNsZWFyV2F0Y2godGhpcy53YXRjaElkKTtcclxuICAgICAgdGhpcy53YXRjaElkID0gbnVsbDtcclxuICB9XHJcbn1cclxub25Db29yZGluYXRlVGFwcGVkKGFyZ3MpIHtcclxuICAgIGNvbnNvbGUubG9nKFwiQ29vcmRpbmF0ZSBUYXBwZWQsIExhdDogXCIgKyBhcmdzLnBvc2l0aW9uLmxhdGl0dWRlICsgXCIsIExvbjogXCIgKyBhcmdzLnBvc2l0aW9uLmxvbmdpdHVkZSwgYXJncyk7XHJcbn1cclxuXHJcbm9uTWFya2VyRXZlbnQoYXJncykge1xyXG4gICAgY29uc29sZS5sb2coXCJNYXJrZXIgRXZlbnQ6ICdcIiArIGFyZ3MuZXZlbnROYW1lXHJcbiAgICAgICAgKyBcIicgdHJpZ2dlcmVkIG9uOiBcIiArIGFyZ3MubWFya2VyLnRpdGxlXHJcbiAgICAgICAgKyBcIiwgTGF0OiBcIiArIGFyZ3MubWFya2VyLnBvc2l0aW9uLmxhdGl0dWRlICsgXCIsIExvbjogXCIgKyBhcmdzLm1hcmtlci5wb3NpdGlvbi5sb25naXR1ZGUsIGFyZ3MpO1xyXG59XHJcblxyXG5vbkNhbWVyYUNoYW5nZWQoYXJncykge1xyXG4gICAgY29uc29sZS5sb2coXCJDYW1lcmEgY2hhbmdlZDogXCIgKyBKU09OLnN0cmluZ2lmeShhcmdzLmNhbWVyYSksIEpTT04uc3RyaW5naWZ5KGFyZ3MuY2FtZXJhKSA9PT0gdGhpcy5sYXN0Q2FtZXJhKTtcclxuICAgIHRoaXMubGFzdENhbWVyYSA9IEpTT04uc3RyaW5naWZ5KGFyZ3MuY2FtZXJhKTtcclxufVxyXG4gIC8vIGluaXRpYWxpemUgdGhlIGZpcmViYXNlIGNvbm5lY3Rpb25cclxuICAvLyBnZXQgZGF0YSBmcm9tIGZpcmVzdG9yZVxyXG4gIG5nT25Jbml0KCk6IHZvaWQge1xyXG5cclxuICAgIGZpcmViYXNlRkNNLmFkZE9uTWVzc2FnZVJlY2VpdmVkQ2FsbGJhY2soXHJcbiAgICAgIChtZXNzYWdlKSA9PiB7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJVcGRhdGUgVklBIEJhY2tncm91bmQgUHVzaCBOb3RpZmljYXRpb25cIikgICAgICAgIFxyXG4gICAgICAgIHRoaXMuem9uZS5ydW4oKCkgPT4geyAvLyA8PT0gYWRkZWRcclxuICAgICAgICAgIHRoaXMuZmlyZXN0b3JlQ29sbGVjdGlvbk9ic2VydmFibGUoKTsgXHJcbiAgICAgIH0pO1xyXG4gICAgICAgIFxyXG4gICAgICB9XHJcbiAgICApO1xyXG5cclxuICAgIGZpcmViYXNlLmluaXRpYWxpemVBcHAoe1xyXG4gICAgICBwZXJzaXN0OiBmYWxzZVxyXG4gICAgfSkudGhlbigoKSA9PiB7XHJcbiAgICAgIGNvbnNvbGUubG9nKFwiRmlyZWJhc2UgaW5pdGlhbGl6ZWRcIik7XHJcbiAgICB9KTtcclxuICAgICB0aGlzLmZpcmVzdG9yZUNvbGxlY3Rpb25PYnNlcnZhYmxlKCk7XHJcbiAgfVxyXG5cclxuXHJcbiAgcHVibGljIGZpcmVzdG9yZUNvbGxlY3Rpb25PYnNlcnZhYmxlKCk6IHZvaWQge1xyXG4gICAgY29uc29sZS5sb2coXCJGdW5jdGlvbiBDYWxsZWQ6IGZpcmVzdG9yZUNvbGxlY3Rpb25PYnNlcnZhYmxlKClcIik7XHJcbiAgICB0aGlzLm15SXRlbXMkID0gT2JzZXJ2YWJsZS5jcmVhdGUoc3Vic2NyaWJlciA9PiB7XHJcbiAgICAgIGNvbnN0IGNvbFJlZjogZmlyZXN0b3JlLkNvbGxlY3Rpb25SZWZlcmVuY2UgPSBmaXJlYmFzZS5maXJlc3RvcmUoKS5jb2xsZWN0aW9uKFwiaXRlbXNcIik7XHJcbiAgICAgIGNvbFJlZi5vblNuYXBzaG90KChzbmFwc2hvdDogZmlyZXN0b3JlLlF1ZXJ5U25hcHNob3QpID0+IHtcclxuICAgICAgICB0aGlzLnpvbmUucnVuKCgpID0+IHtcclxuICAgICAgICAgIHRoaXMuaXRlbXMgPSBbXTtcclxuICAgICAgICAgIHNuYXBzaG90LmZvckVhY2goZG9jU25hcCA9PiB0aGlzLml0ZW1zLnB1c2goPEl0ZW0+ZG9jU25hcC5kYXRhKCkpKTtcclxuICAgICAgICAgIHN1YnNjcmliZXIubmV4dCh0aGlzLml0ZW1zKTtcclxuICAgICAgICB9KTtcclxuICAgICAgfSk7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBmaXJlc3RvcmVXaGVyZUV2ZXJ5b25lKCk6IHZvaWQge1xyXG4gICAgdGhpcy5teUl0ZW1zJCA9IE9ic2VydmFibGUuY3JlYXRlKHN1YnNjcmliZXIgPT4ge1xyXG4gICAgIGNvbnN0IHF1ZXJ5OiBmaXJlc3RvcmUuUXVlcnkgPSBmaXJlYmFzZS5maXJlc3RvcmUoKS5jb2xsZWN0aW9uKFwiaXRlbXNcIilcclxuICAgICAgICAud2hlcmUoXCJwZXJtaXNzaW9uc1wiLCBcIj09XCIsIHRoaXMucXVlcnkpO1xyXG4gICAgcXVlcnlcclxuICAgICAgICAuZ2V0KClcclxuICAgICAgICAudGhlbigocXVlcnlTbmFwc2hvdDogZmlyZXN0b3JlLlF1ZXJ5U25hcHNob3QpID0+IHtcclxuICAgICAgICAgIHF1ZXJ5U25hcHNob3QuZm9yRWFjaChkb2MgPT4ge1xyXG5cclxuICAgICAgICAgICAgdGhpcy5pdGVtcyA9IFtdO1xyXG4gICAgICAgICAgICBxdWVyeVNuYXBzaG90LmZvckVhY2goZG9jU25hcCA9PiB0aGlzLml0ZW1zLnB1c2goPEl0ZW0+ZG9jU25hcC5kYXRhKCkpKTtcclxuICAgICAgICAgICAgc3Vic2NyaWJlci5uZXh0KHRoaXMuaXRlbXMpO1xyXG5cclxuICAgICAgICAgICAgLy9jb25zb2xlLmxvZyhgRGVudGlzdCBQZXJtaXNzaW9uczogJHtkb2MuaWR9ID0+ICR7SlNPTi5zdHJpbmdpZnkoZG9jLmRhdGEoKSl9YCk7XHJcbiAgICAgICAgICAgfSk7XHJcbiAgICB9KTtcclxuICB9KTtcclxufVxyXG4gIFxyXG5wdWJsaWMgZmlyZXN0b3JlV2hlcmVEZW50aXN0cygpOiB2b2lkIHtcclxuICAgIHRoaXMubXlJdGVtcyQgPSBPYnNlcnZhYmxlLmNyZWF0ZShzdWJzY3JpYmVyID0+IHtcclxuICAgICBjb25zdCBxdWVyeTogZmlyZXN0b3JlLlF1ZXJ5ID0gZmlyZWJhc2UuZmlyZXN0b3JlKCkuY29sbGVjdGlvbihcIml0ZW1zXCIpXHJcbiAgICAgICAgLndoZXJlKFwicGVybWlzc2lvbnNcIiwgXCI9PVwiLCB0aGlzLnF1ZXJ5KTtcclxuICAgIHF1ZXJ5XHJcbiAgICAgICAgLmdldCgpXHJcbiAgICAgICAgLnRoZW4oKHF1ZXJ5U25hcHNob3Q6IGZpcmVzdG9yZS5RdWVyeVNuYXBzaG90KSA9PiB7XHJcbiAgICAgICAgICBxdWVyeVNuYXBzaG90LmZvckVhY2goZG9jID0+IHtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuaXRlbXMgPSBbXTtcclxuICAgICAgICAgICAgcXVlcnlTbmFwc2hvdC5mb3JFYWNoKGRvY1NuYXAgPT4gdGhpcy5pdGVtcy5wdXNoKDxJdGVtPmRvY1NuYXAuZGF0YSgpKSk7XHJcbiAgICAgICAgICAgIHN1YnNjcmliZXIubmV4dCh0aGlzLml0ZW1zKTtcclxuICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhgRGVudGlzdCBQZXJtaXNzaW9uczogJHtkb2MuaWR9ID0+ICR7SlNPTi5zdHJpbmdpZnkoZG9jLmRhdGEoKSl9YCk7XHJcbiAgICAgICAgICAgfSk7XHJcbiAgICB9KTtcclxuICB9KTtcclxufVxyXG5cclxuXHJcblxyXG52aWV3RGV0YWlsKHRpdGxlOiBzdHJpbmcpe1xyXG4gIGNvbnNvbGUubG9nKFwiY2xpY2tpbmcgdmlldyBkZXRhaWxcIiArIHRpdGxlKTtcclxuXHJcbmxldCBuYXZpZ2F0aW9uRXh0cmFzOiBOYXZpZ2F0aW9uRXh0cmFzID0ge1xyXG4gIHF1ZXJ5UGFyYW1zOiB7XHJcbiAgICAgIFwiVGl0bGVcIjogdGl0bGUsXHJcbiAgfVxyXG59O1xyXG50aGlzLnJvdXRlci5uYXZpZ2F0ZShbXCJkZXRhaWxcIl0sIG5hdmlnYXRpb25FeHRyYXMpO1xyXG4gIGNvbnNvbGUubG9nKFwibmF2aWdhdGluZ1wiKTtcclxuICAvLyB0aGlzLnJvdXRlci5uYXZpZ2F0ZShbXCIvZGV0YWlsXCJdKTtcclxufVxyXG5cclxuXHJcblxyXG59XHJcbiJdfQ==