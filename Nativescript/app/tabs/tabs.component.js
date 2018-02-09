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
        //this.firestoreCollectionObservable();
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFicy5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJ0YWJzLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUF1RDtBQUd2RCxtREFBa0Q7QUFDbEQsNkNBQTJDO0FBQzNDLHNDQUEyQztBQUszQyw2RUFBeUU7QUFDekUsMENBQWlFO0FBQ2pFLDBDQUF1QztBQUN2QyxzREFBd0Q7QUFDeEQsSUFBTSxPQUFPLEdBQUcsT0FBTyxDQUFDLFVBQVUsQ0FBQyxDQUFDLE9BQU8sQ0FBQztBQUU1QyxnRkFBZ0Y7QUFDaEYsb0ZBQW9GO0FBRXBGLGFBQWE7QUFFYiwwRUFBc0U7QUFDdEUsa0NBQWUsQ0FBQyxhQUFhLEVBQUUsY0FBTSxPQUFBLE9BQU8sQ0FBQywwQkFBMEIsQ0FBQyxDQUFDLEtBQUssRUFBekMsQ0FBeUMsQ0FBQyxDQUFDO0FBSWhGLFVBQVU7QUFDViw4Q0FBNkM7QUFFN0MsSUFBTSxRQUFRLEdBQUcsT0FBTyxDQUFDLGtDQUFrQyxDQUFDLENBQUM7QUFDN0QsSUFBTSxXQUFXLEdBQUcsT0FBTyxDQUFDLDhCQUE4QixDQUFDLENBQUM7QUFDNUQsSUFBTSxjQUFjLEdBQUcsT0FBTyxDQUFDLGtDQUFrQyxDQUFDLENBQUM7QUFDbkUsSUFBTSxNQUFNLEdBQUcsT0FBTyxDQUFDLHFCQUFxQixDQUFDLENBQUM7QUF3QjlDO0lBZUUsdUJBQW9CLElBQVksRUFBVSxLQUFxQixFQUFVLE1BQWM7UUFBdkYsaUJBSUM7UUFKbUIsU0FBSSxHQUFKLElBQUksQ0FBUTtRQUFVLFVBQUssR0FBTCxLQUFLLENBQWdCO1FBQVUsV0FBTSxHQUFOLE1BQU0sQ0FBUTtRQVIvRSxVQUFLLEdBQWdCLEVBQUUsQ0FBQztRQUN6QixlQUFVLEdBQUcsT0FBTyxDQUFDO1FBa0I5QixhQUFRLEdBQUksT0FBTyxDQUFDO1FBQ3BCLGNBQVMsR0FBRyxDQUFDLFFBQVEsQ0FBQztRQUN0QixTQUFJLEdBQUcsRUFBRSxDQUFDO1FB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WSxDQUFDLENBQUM7UUFDMUIscUNBQXFDO0lBQ3ZDLENBQUM7SUFuT1ksYUFBYTtRQVB6QixnQkFBUyxDQUFDO1lBQ1QsUUFBUSxFQUFFLE1BQU07WUFDaEIsV0FBVyxFQUFFLDRCQUE0QjtZQUN6QyxTQUFTLEVBQUMsQ0FBQywyQkFBMkIsQ0FBQztTQUN4QyxDQUFDO1FBRUQsaUJBQVUsRUFBRTt5Q0FnQmUsYUFBTSxFQUFpQix1QkFBYyxFQUFrQixlQUFNO09BZjVFLGFBQWEsQ0F1T3pCO0lBQUQsb0JBQUM7Q0FBQSxBQXZPRCxJQXVPQztBQXZPWSxzQ0FBYSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7Q29tcG9uZW50LE9uSW5pdCxOZ1pvbmUgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuaW1wb3J0ICogYXMgbGlzdFZpZXdNb2R1bGUgZnJvbSBcInRucy1jb3JlLW1vZHVsZXMvdWkvbGlzdC12aWV3XCI7XG5pbXBvcnQgKiBhcyBJbWFnZU1vZHVsZSBmcm9tIFwidG5zLWNvcmUtbW9kdWxlcy91aS9pbWFnZVwiO1xuaW1wb3J0IHsgSW1hZ2UgfSBmcm9tIFwidG5zLWNvcmUtbW9kdWxlcy91aS9pbWFnZVwiO1xuaW1wb3J0IHsgSW1hZ2VTb3VyY2UgfSBmcm9tIFwiaW1hZ2Utc291cmNlXCI7XG5pbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcbmltcG9ydCB7IEluZm99IGZyb20gJy4vaW5mbyc7XG5cblxuaW1wb3J0IHtFbGVtZW50UmVmLCBWaWV3Q2hpbGR9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgTWFwVmlldywgTWFya2VyLCBQb3NpdGlvbiB9IGZyb20gJ25hdGl2ZXNjcmlwdC1nb29nbGUtbWFwcy1zZGsnO1xuaW1wb3J0IHtBY3RpdmF0ZWRSb3V0ZSwgTmF2aWdhdGlvbkV4dHJhc30gZnJvbSBcIkBhbmd1bGFyL3JvdXRlclwiO1xuaW1wb3J0IHtSb3V0ZXJ9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XG5pbXBvcnQgKiBhcyBHZW9sb2NhdGlvbiBmcm9tIFwibmF0aXZlc2NyaXB0LWdlb2xvY2F0aW9uXCI7XG5jb25zdCB0b3Btb3N0ID0gcmVxdWlyZShcInVpL2ZyYW1lXCIpLnRvcG1vc3Q7XG5cbi8vIEltcG9ydGFudCAtIG11c3QgcmVnaXN0ZXIgTWFwVmlldyBwbHVnaW4gaW4gb3JkZXIgdG8gdXNlIGluIEFuZ3VsYXIgdGVtcGxhdGVzXG4vL3JlZ2lzdGVyRWxlbWVudChcIk1hcFZpZXdcIiwgKCkgPT4gcmVxdWlyZShcIm5hdGl2ZXNjcmlwdC1nb29nbGUtbWFwcy1zZGtcIikuTWFwVmlldyk7XG5cbi8vdmlkZW9wbGF5ZXJcblxuaW1wb3J0IHtyZWdpc3RlckVsZW1lbnR9IGZyb20gXCJuYXRpdmVzY3JpcHQtYW5ndWxhci9lbGVtZW50LXJlZ2lzdHJ5XCI7XG5yZWdpc3RlckVsZW1lbnQoXCJWaWRlb1BsYXllclwiLCAoKSA9PiByZXF1aXJlKFwibmF0aXZlc2NyaXB0LXZpZGVvcGxheWVyXCIpLlZpZGVvKTtcblxuXG5cbi8vZmlyZWJhc2VcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tIFwicnhqcy9PYnNlcnZhYmxlXCI7XG5pbXBvcnQgeyBmaXJlc3RvcmUgfSBmcm9tIFwibmF0aXZlc2NyaXB0LXBsdWdpbi1maXJlYmFzZVwiO1xuY29uc3QgZmlyZWJhc2UgPSByZXF1aXJlKFwibmF0aXZlc2NyaXB0LXBsdWdpbi1maXJlYmFzZS9hcHBcIik7XG5jb25zdCBmaXJlYmFzZUZDTSA9IHJlcXVpcmUoXCJuYXRpdmVzY3JpcHQtcGx1Z2luLWZpcmViYXNlXCIpO1xuY29uc3QgZmlyZWJhc2VXZWJBcGkgPSByZXF1aXJlKFwibmF0aXZlc2NyaXB0LXBsdWdpbi1maXJlYmFzZS9hcHBcIik7XG5jb25zdCBNYXBCb3ggPSByZXF1aXJlKFwibmF0aXZlc2NyaXB0LW1hcGJveFwiKTtcblxuLy9pdGVtc1xuXG5leHBvcnQgaW50ZXJmYWNlIEl0ZW17XG4gIGlkOnN0cmluZztcbiAgdGl0bGU6c3RyaW5nO1xuICBkZXNjcmlwdGlvbjpzdHJpbmc7XG4gIGFkbWlucG9zdGVkOnN0cmluZztcbiAgcGVybWlzc2lvbnM6c3RyaW5nO1xuICB0aW1lOnN0cmluZztcbiAgZGF0YXR5cGU6c3RyaW5nO1xuICB1cmw6IHN0cmluZztcbiAgbmFtZTogc3RyaW5nO1xufVxuXG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogXCJ0YWJzXCIsXG4gIHRlbXBsYXRlVXJsOiBcIi4vdGFicy90YWJzLmNvbXBvbmVudC5odG1sXCIsXG4gIHN0eWxlVXJsczpbXCIuL3RhYnMvdGFicy5jb21wb25lbnQuY3NzXCJdXG59KVxuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgdGFic0NvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG5cblxuICAvL2l0ZW0gZnJvbSBjb2xsZWN0aW9uIFxuICBwdWJsaWMgbXlJdGVtJDogT2JzZXJ2YWJsZTxJdGVtPjtcbiAgcHVibGljIG15SXRlbXMkOiBPYnNlcnZhYmxlPEFycmF5PEl0ZW0+PjtcbiAgcHJpdmF0ZSBpdGVtOiBJdGVtO1xuICBwcml2YXRlIGl0ZW1zOiBBcnJheTxJdGVtPiA9IFtdO1xuICBwdWJsaWMgYXV0b1VwZGF0ZSA9IFwiRmFsc2VcIjtcblxuIFxuXG5cbiAgcHVibGljIHF1ZXJ5OiBzdHJpbmc7XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSB6b25lOiBOZ1pvbmUsIHByaXZhdGUgcm91dGU6IEFjdGl2YXRlZFJvdXRlLCBwcml2YXRlIHJvdXRlcjogUm91dGVyKSB7XG4gICAgdGhpcy5yb3V0ZS5xdWVyeVBhcmFtcy5zdWJzY3JpYmUocGFyYW1zID0+IHtcbiAgICAgICAgICAgIHRoaXMucXVlcnkgPSBwYXJhbXNbXCJxdWVyeVwiXTtcbiAgICAgICAgfSk7XG4gIH1cblxuICBzaG93KCl7XG4gICAgYWxlcnQodGhpcy5xdWVyeSk7XG4gIH1cblxuXG5sYXRpdHVkZSA9ICA0OS45Mjk4O1xubG9uZ2l0dWRlID0gLTExOS4zOTY4O1xuem9vbSA9IDEyO1xuYmVhcmluZyA9IDA7XG50aWx0ID0gMDtcbnBhZGRpbmcgPSBbNDAsIDQwLCA0MCwgNDBdO1xubWFwVmlldzogTWFwVmlldztcbnB1YmxpYyBjdXJyZW50R2VvTG9jYXRpb24gPSBudWxsO1xubGFzdENhbWVyYTogU3RyaW5nO1xuXG5wcml2YXRlIHdhdGNoSWQ6IG51bWJlcjtcblxuLy9NYXAgZXZlbnRzXG5vbk1hcFJlYWR5KGV2ZW50KSB7XG4gICAgY29uc29sZS5sb2coJ01hcCBSZWFkeScpO1xuXG4gICAgdGhpcy5tYXBWaWV3ID0gZXZlbnQub2JqZWN0O1xuXG4gICAgY29uc29sZS5sb2coXCJTZXR0aW5nIGEgbWFya2VyLi4uXCIpO1xuICAgIHZhciBtYXJrZXIgPSBuZXcgTWFya2VyKCk7XG4gICAgbWFya2VyLnBvc2l0aW9uID0gUG9zaXRpb24ucG9zaXRpb25Gcm9tTGF0TG5nKDQ5LjkyMjM2MTksLTExOS4zOTcxOTI3KTtcbiAgICBtYXJrZXIudGl0bGUgPSBcIktlbG93bmFcIjtcbiAgICBtYXJrZXIuc25pcHBldCA9IFwiUGVyZml0IERlbnRhbFwiO1xuICAgIG1hcmtlci51c2VyRGF0YSA9IHtpbmRleDogMX07XG4gICAgdmFyIG1hcmtlcjIgPSBuZXcgTWFya2VyKCk7XG4gICAgbWFya2VyMi5wb3NpdGlvbj1Qb3NpdGlvbi5wb3NpdGlvbkZyb21MYXRMbmcodGhpcy5sYXRpdHVkZSwgdGhpcy5sb25naXR1ZGUpO1xuICAgIG1hcmtlcjIudGl0bGU9XCJVbml2ZXJzaXR5IG9mIEJyaXRpc2ggQ29sdW1iaWFcIjtcbiAgICBtYXJrZXIyLnNuaXBwZXQgPSBcIktlbG93bmFcIjtcbiAgICBtYXJrZXIyLnVzZXJEYXRhID0ge2luZGV4OjJ9O1xuICAgIFxuICAgIFxuICAgICAvLyBjaGVjayBpZiBnZW9sb2NhdGlvbiBpcyBub3QgZW5hYmxlZFxuICAgICAgICBHZW9sb2NhdGlvbi5lbmFibGVMb2NhdGlvblJlcXVlc3QoKTsgLy8gcmVxdWVzdCBmb3IgdGhlIHVzZXIgdG8gZW5hYmxlIGl0XG4gICAgICBcbiAgICB0aGlzLm1hcFZpZXcuYWRkTWFya2VyKG1hcmtlcik7XG4gICAgdGhpcy5tYXBWaWV3LmFkZE1hcmtlcihtYXJrZXIyKTtcblxuXG59XG5wcml2YXRlIGdldERldmljZUxvY2F0aW9uKCk6IFByb21pc2U8YW55PiB7XG4gIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICBHZW9sb2NhdGlvbi5lbmFibGVMb2NhdGlvblJlcXVlc3QoKS50aGVuKCgpID0+IHtcbiAgICAgICAgICBHZW9sb2NhdGlvbi5nZXRDdXJyZW50TG9jYXRpb24oe3RpbWVvdXQ6IDEwMDAwfSkudGhlbihsb2NhdGlvbiA9PiB7XG4gICAgICAgICAgICAgIHJlc29sdmUobG9jYXRpb24pO1xuICAgICAgICAgIH0pLmNhdGNoKGVycm9yID0+IHtcbiAgICAgICAgICAgICAgcmVqZWN0KGVycm9yKTtcbiAgICAgICAgICB9KTtcbiAgICAgIH0pO1xuICB9KTtcbn1cblxucHVibGljIHVwZGF0ZUxvY2F0aW9uKCkge1xuICBcbiAgdGhpcy5nZXREZXZpY2VMb2NhdGlvbigpLnRoZW4ocmVzdWx0ID0+IHtcbiAgICAgIHRoaXMubGF0aXR1ZGUgPSByZXN1bHQubGF0aXR1ZGU7XG4gICAgICB0aGlzLmxvbmdpdHVkZSA9IHJlc3VsdC5sb25naXR1ZGU7XG4gICAgICAgICAgIFxuICB9LCBlcnJvciA9PiB7XG4gICAgICBjb25zb2xlLmVycm9yKGVycm9yKTtcbiAgfSk7XG59XG5cbnB1YmxpYyBzdGFydFdhdGNoaW5nTG9jYXRpb24oKSB7XG4gIEdlb2xvY2F0aW9uLmVuYWJsZUxvY2F0aW9uUmVxdWVzdCgpOyAvLyByZXF1ZXN0IGZvciB0aGUgdXNlciB0byBlbmFibGUgaXRcbiAgdGhpcy53YXRjaElkID0gR2VvbG9jYXRpb24ud2F0Y2hMb2NhdGlvbihsb2NhdGlvbiA9PiB7XG4gICAgICBpZihsb2NhdGlvbikge1xuICAgICAgICAgIHRoaXMuem9uZS5ydW4oKCkgPT4ge1xuICAgICAgICAgICAgXG4gICAgICAgICAgICAgIHRoaXMubGF0aXR1ZGUgPSBsb2NhdGlvbi5sYXRpdHVkZTtcbiAgICAgICAgICAgICAgdGhpcy5sb25naXR1ZGUgPSBsb2NhdGlvbi5sb25naXR1ZGU7XG4gICAgICAgICAgICAgIGNvbnNvbGUubG9nKHRoaXMubGF0aXR1ZGUpO1xuICAgICAgICAgICAgICBjb25zb2xlLmxvZyh0aGlzLmxvbmdpdHVkZSk7XG4gICAgICAgICAgICAgIHZhciBtYXJrZXIzID0gbmV3IE1hcmtlcigpO1xuICAgICAgICAgICAgICBtYXJrZXIzLnBvc2l0aW9uPVBvc2l0aW9uLnBvc2l0aW9uRnJvbUxhdExuZyh0aGlzLmxhdGl0dWRlLCB0aGlzLmxvbmdpdHVkZSk7XG4gICAgICAgICAgICAgIG1hcmtlcjMudGl0bGU9XCJZb3VyIGxvY2F0aW9uXCI7XG4gICAgICAgICAgICAgIG1hcmtlcjMuc25pcHBldCA9IHRoaXMubGF0aXR1ZGUudG9TdHJpbmcoKSArIFwiLFwiICsgdGhpcy5sb25naXR1ZGUudG9TdHJpbmcoKTtcbiAgICAgICAgICAgICAgbWFya2VyMy51c2VyRGF0YSA9IHtpbmRleDoyfTtcblxuICAgICAgICAgICAgICBsZXQgaW1nU3JjID0gbmV3IEltYWdlU291cmNlKCk7XG4gICAgICAgICAgICAgIGltZ1NyYy5mcm9tRmlsZShcIn4vaW1hZ2VzL2xvY2F0aW9uLnBuZ1wiKTtcbiAgICAgIFxuICAgICAgICAgICAgICBsZXQgaW1hZ2UgPSBuZXcgSW1hZ2UoKTtcbiAgICAgICAgICAgICAgaW1hZ2UuaW1hZ2VTb3VyY2UgPSBpbWdTcmM7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgICAgbWFya2VyMy5pY29uID0gaW1hZ2U7XG4gICAgICAgICAgICAgIHRoaXMubWFwVmlldy5hZGRNYXJrZXIobWFya2VyMyk7XG4gICAgICAgICAgICAgIFxuICAgICAgICAgIH0pO1xuICAgICAgfVxuICB9LCBlcnJvciA9PiB7XG4gICAgICBjb25zb2xlLmxvZyhlcnJvcik7XG4gIH0sIHsgdXBkYXRlRGlzdGFuY2U6IDEsIG1pbmltdW1VcGRhdGVUaW1lOiAxMDAwIH0pO1xufVxuXG5wdWJsaWMgc3RvcFdhdGNoaW5nTG9jYXRpb24oKSB7XG4gIGlmKHRoaXMud2F0Y2hJZCkge1xuICAgICAgR2VvbG9jYXRpb24uY2xlYXJXYXRjaCh0aGlzLndhdGNoSWQpO1xuICAgICAgdGhpcy53YXRjaElkID0gbnVsbDtcbiAgfVxufVxub25Db29yZGluYXRlVGFwcGVkKGFyZ3MpIHtcbiAgICBjb25zb2xlLmxvZyhcIkNvb3JkaW5hdGUgVGFwcGVkLCBMYXQ6IFwiICsgYXJncy5wb3NpdGlvbi5sYXRpdHVkZSArIFwiLCBMb246IFwiICsgYXJncy5wb3NpdGlvbi5sb25naXR1ZGUsIGFyZ3MpO1xufVxuXG5vbk1hcmtlckV2ZW50KGFyZ3MpIHtcbiAgICBjb25zb2xlLmxvZyhcIk1hcmtlciBFdmVudDogJ1wiICsgYXJncy5ldmVudE5hbWVcbiAgICAgICAgKyBcIicgdHJpZ2dlcmVkIG9uOiBcIiArIGFyZ3MubWFya2VyLnRpdGxlXG4gICAgICAgICsgXCIsIExhdDogXCIgKyBhcmdzLm1hcmtlci5wb3NpdGlvbi5sYXRpdHVkZSArIFwiLCBMb246IFwiICsgYXJncy5tYXJrZXIucG9zaXRpb24ubG9uZ2l0dWRlLCBhcmdzKTtcbn1cblxub25DYW1lcmFDaGFuZ2VkKGFyZ3MpIHtcbiAgICBjb25zb2xlLmxvZyhcIkNhbWVyYSBjaGFuZ2VkOiBcIiArIEpTT04uc3RyaW5naWZ5KGFyZ3MuY2FtZXJhKSwgSlNPTi5zdHJpbmdpZnkoYXJncy5jYW1lcmEpID09PSB0aGlzLmxhc3RDYW1lcmEpO1xuICAgIHRoaXMubGFzdENhbWVyYSA9IEpTT04uc3RyaW5naWZ5KGFyZ3MuY2FtZXJhKTtcbn1cbiAgLy8gaW5pdGlhbGl6ZSB0aGUgZmlyZWJhc2UgY29ubmVjdGlvblxuICAvLyBnZXQgZGF0YSBmcm9tIGZpcmVzdG9yZVxuICBuZ09uSW5pdCgpOiB2b2lkIHtcblxuICAgIGZpcmViYXNlRkNNLmFkZE9uTWVzc2FnZVJlY2VpdmVkQ2FsbGJhY2soXG4gICAgICAobWVzc2FnZSkgPT4ge1xuICAgICAgICBjb25zb2xlLmxvZyhcIlVwZGF0ZSBWSUEgQmFja2dyb3VuZCBQdXNoIE5vdGlmaWNhdGlvblwiKSAgICAgICAgXG4gICAgICAgIHRoaXMuem9uZS5ydW4oKCkgPT4geyAvLyA8PT0gYWRkZWRcbiAgICAgICAgICB0aGlzLmZpcmVzdG9yZUNvbGxlY3Rpb25PYnNlcnZhYmxlKCk7IFxuICAgICAgfSk7XG4gICAgICAgIFxuICAgICAgfVxuICAgICk7XG5cbiAgICBmaXJlYmFzZS5pbml0aWFsaXplQXBwKHtcbiAgICAgIHBlcnNpc3Q6IGZhbHNlXG4gICAgfSkudGhlbigoKSA9PiB7XG4gICAgICBjb25zb2xlLmxvZyhcIkZpcmViYXNlIGluaXRpYWxpemVkXCIpO1xuICAgIH0pO1xuICAgICAvL3RoaXMuZmlyZXN0b3JlQ29sbGVjdGlvbk9ic2VydmFibGUoKTtcbiAgfVxuXG5cbiAgcHVibGljIGZpcmVzdG9yZUNvbGxlY3Rpb25PYnNlcnZhYmxlKCk6IHZvaWQge1xuICAgIGNvbnNvbGUubG9nKFwiRnVuY3Rpb24gQ2FsbGVkOiBmaXJlc3RvcmVDb2xsZWN0aW9uT2JzZXJ2YWJsZSgpXCIpO1xuICAgIHRoaXMubXlJdGVtcyQgPSBPYnNlcnZhYmxlLmNyZWF0ZShzdWJzY3JpYmVyID0+IHtcbiAgICAgIGNvbnN0IGNvbFJlZjogZmlyZXN0b3JlLkNvbGxlY3Rpb25SZWZlcmVuY2UgPSBmaXJlYmFzZS5maXJlc3RvcmUoKS5jb2xsZWN0aW9uKFwiaXRlbXNcIik7XG4gICAgICBjb2xSZWYub25TbmFwc2hvdCgoc25hcHNob3Q6IGZpcmVzdG9yZS5RdWVyeVNuYXBzaG90KSA9PiB7XG4gICAgICAgIHRoaXMuem9uZS5ydW4oKCkgPT4ge1xuICAgICAgICAgIHRoaXMuaXRlbXMgPSBbXTtcbiAgICAgICAgICBzbmFwc2hvdC5mb3JFYWNoKGRvY1NuYXAgPT4gdGhpcy5pdGVtcy5wdXNoKDxJdGVtPmRvY1NuYXAuZGF0YSgpKSk7XG4gICAgICAgICAgc3Vic2NyaWJlci5uZXh0KHRoaXMuaXRlbXMpO1xuICAgICAgICB9KTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9XG5cbiAgcHVibGljIGZpcmVzdG9yZVdoZXJlRXZlcnlvbmUoKTogdm9pZCB7XG4gICAgdGhpcy5teUl0ZW1zJCA9IE9ic2VydmFibGUuY3JlYXRlKHN1YnNjcmliZXIgPT4ge1xuICAgICBjb25zdCBxdWVyeTogZmlyZXN0b3JlLlF1ZXJ5ID0gZmlyZWJhc2UuZmlyZXN0b3JlKCkuY29sbGVjdGlvbihcIml0ZW1zXCIpXG4gICAgICAgIC53aGVyZShcInBlcm1pc3Npb25zXCIsIFwiPT1cIiwgdGhpcy5xdWVyeSk7XG4gICAgcXVlcnlcbiAgICAgICAgLmdldCgpXG4gICAgICAgIC50aGVuKChxdWVyeVNuYXBzaG90OiBmaXJlc3RvcmUuUXVlcnlTbmFwc2hvdCkgPT4ge1xuICAgICAgICAgIHF1ZXJ5U25hcHNob3QuZm9yRWFjaChkb2MgPT4ge1xuXG4gICAgICAgICAgICB0aGlzLml0ZW1zID0gW107XG4gICAgICAgICAgICBxdWVyeVNuYXBzaG90LmZvckVhY2goZG9jU25hcCA9PiB0aGlzLml0ZW1zLnB1c2goPEl0ZW0+ZG9jU25hcC5kYXRhKCkpKTtcbiAgICAgICAgICAgIHN1YnNjcmliZXIubmV4dCh0aGlzLml0ZW1zKTtcblxuICAgICAgICAgICAgLy9jb25zb2xlLmxvZyhgRGVudGlzdCBQZXJtaXNzaW9uczogJHtkb2MuaWR9ID0+ICR7SlNPTi5zdHJpbmdpZnkoZG9jLmRhdGEoKSl9YCk7XG4gICAgICAgICAgIH0pO1xuICAgIH0pO1xuICB9KTtcbn1cbiAgXG5wdWJsaWMgZmlyZXN0b3JlV2hlcmVEZW50aXN0cygpOiB2b2lkIHtcbiAgICB0aGlzLm15SXRlbXMkID0gT2JzZXJ2YWJsZS5jcmVhdGUoc3Vic2NyaWJlciA9PiB7XG4gICAgIGNvbnN0IHF1ZXJ5OiBmaXJlc3RvcmUuUXVlcnkgPSBmaXJlYmFzZS5maXJlc3RvcmUoKS5jb2xsZWN0aW9uKFwiaXRlbXNcIilcbiAgICAgICAgLndoZXJlKFwicGVybWlzc2lvbnNcIiwgXCI9PVwiLCB0aGlzLnF1ZXJ5KTtcbiAgICBxdWVyeVxuICAgICAgICAuZ2V0KClcbiAgICAgICAgLnRoZW4oKHF1ZXJ5U25hcHNob3Q6IGZpcmVzdG9yZS5RdWVyeVNuYXBzaG90KSA9PiB7XG4gICAgICAgICAgcXVlcnlTbmFwc2hvdC5mb3JFYWNoKGRvYyA9PiB7XG5cbiAgICAgICAgICAgIHRoaXMuaXRlbXMgPSBbXTtcbiAgICAgICAgICAgIHF1ZXJ5U25hcHNob3QuZm9yRWFjaChkb2NTbmFwID0+IHRoaXMuaXRlbXMucHVzaCg8SXRlbT5kb2NTbmFwLmRhdGEoKSkpO1xuICAgICAgICAgICAgc3Vic2NyaWJlci5uZXh0KHRoaXMuaXRlbXMpO1xuICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhgRGVudGlzdCBQZXJtaXNzaW9uczogJHtkb2MuaWR9ID0+ICR7SlNPTi5zdHJpbmdpZnkoZG9jLmRhdGEoKSl9YCk7XG4gICAgICAgICAgIH0pO1xuICAgIH0pO1xuICB9KTtcbn1cblxuXG5cbnZpZXdEZXRhaWwodGl0bGU6IHN0cmluZyl7XG4gIGNvbnNvbGUubG9nKFwiY2xpY2tpbmcgdmlldyBkZXRhaWxcIiArIHRpdGxlKTtcblxubGV0IG5hdmlnYXRpb25FeHRyYXM6IE5hdmlnYXRpb25FeHRyYXMgPSB7XG4gIHF1ZXJ5UGFyYW1zOiB7XG4gICAgICBcIlRpdGxlXCI6IHRpdGxlLFxuICB9XG59O1xudGhpcy5yb3V0ZXIubmF2aWdhdGUoW1wiZGV0YWlsXCJdLCBuYXZpZ2F0aW9uRXh0cmFzKTtcbiAgY29uc29sZS5sb2coXCJuYXZpZ2F0aW5nXCIpO1xuICAvLyB0aGlzLnJvdXRlci5uYXZpZ2F0ZShbXCIvZGV0YWlsXCJdKTtcbn1cblxuXG5cbn1cbiJdfQ==