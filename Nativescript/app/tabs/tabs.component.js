"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var image_1 = require("tns-core-modules/ui/image");
var image_source_1 = require("image-source");
var core_2 = require("@angular/core");
var element_registry_1 = require("nativescript-angular/element-registry");
element_registry_1.registerElement("PullToRefresh", function () { return require("nativescript-pulltorefresh").PullToRefresh; });
var nativescript_google_maps_sdk_1 = require("nativescript-google-maps-sdk");
var router_1 = require("@angular/router");
var router_2 = require("@angular/router");
var Geolocation = require("nativescript-geolocation");
var topmost = require("ui/frame").topmost;
// Important - must register MapView plugin in order to use in Angular templates
element_registry_1.registerElement("MapView", function () { return require("nativescript-google-maps-sdk").MapView; });
//firebase
var Observable_1 = require("rxjs/Observable");
var firebase = require("nativescript-plugin-firebase/app");
var firebaseWebApi = require("nativescript-plugin-firebase/app");
var MapBox = require("nativescript-mapbox");
var tabsComponent = (function () {
    function tabsComponent(zone, route, router) {
        var _this = this;
        this.zone = zone;
        this.route = route;
        this.router = router;
        this.items = [];
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
        this.router.navigate(["/detail"], navigationExtras);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFicy5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJ0YWJzLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUF1RDtBQUd2RCxtREFBa0Q7QUFDbEQsNkNBQTJDO0FBQzNDLHNDQUEyQztBQUUzQywwRUFBd0U7QUFDeEUsa0NBQWUsQ0FBQyxlQUFlLEVBQUUsY0FBTSxPQUFBLE9BQU8sQ0FBQyw0QkFBNEIsQ0FBQyxDQUFDLGFBQWEsRUFBbkQsQ0FBbUQsQ0FBQyxDQUFDO0FBRTVGLDZFQUF5RTtBQUN6RSwwQ0FBaUU7QUFDakUsMENBQXVDO0FBQ3ZDLHNEQUF3RDtBQUN4RCxJQUFNLE9BQU8sR0FBRyxPQUFPLENBQUMsVUFBVSxDQUFDLENBQUMsT0FBTyxDQUFDO0FBRTVDLGdGQUFnRjtBQUNoRixrQ0FBZSxDQUFDLFNBQVMsRUFBRSxjQUFNLE9BQUEsT0FBTyxDQUFDLDhCQUE4QixDQUFDLENBQUMsT0FBTyxFQUEvQyxDQUErQyxDQUFDLENBQUM7QUFFbEYsVUFBVTtBQUNWLDhDQUE2QztBQUU3QyxJQUFNLFFBQVEsR0FBRyxPQUFPLENBQUMsa0NBQWtDLENBQUMsQ0FBQztBQUM3RCxJQUFNLGNBQWMsR0FBRyxPQUFPLENBQUMsa0NBQWtDLENBQUMsQ0FBQztBQUNuRSxJQUFNLE1BQU0sR0FBRyxPQUFPLENBQUMscUJBQXFCLENBQUMsQ0FBQztBQXdCOUM7SUFZRSx1QkFBb0IsSUFBWSxFQUFVLEtBQXFCLEVBQVUsTUFBYztRQUF2RixpQkFJQztRQUptQixTQUFJLEdBQUosSUFBSSxDQUFRO1FBQVUsVUFBSyxHQUFMLEtBQUssQ0FBZ0I7UUFBVSxXQUFNLEdBQU4sTUFBTSxDQUFRO1FBTC9FLFVBQUssR0FBZ0IsRUFBRSxDQUFDO1FBZ0JsQyxhQUFRLEdBQUksT0FBTyxDQUFDO1FBQ3BCLGNBQVMsR0FBRyxDQUFDLFFBQVEsQ0FBQztRQUN0QixTQUFJLEdBQUcsRUFBRSxDQUFDO1FBQ1YsWUFB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ZW50LE9uSW5pdCxOZ1pvbmUgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xyXG5pbXBvcnQgKiBhcyBsaXN0Vmlld01vZHVsZSBmcm9tIFwidG5zLWNvcmUtbW9kdWxlcy91aS9saXN0LXZpZXdcIjtcclxuaW1wb3J0ICogYXMgSW1hZ2VNb2R1bGUgZnJvbSBcInRucy1jb3JlLW1vZHVsZXMvdWkvaW1hZ2VcIjtcclxuaW1wb3J0IHsgSW1hZ2UgfSBmcm9tIFwidG5zLWNvcmUtbW9kdWxlcy91aS9pbWFnZVwiO1xyXG5pbXBvcnQgeyBJbWFnZVNvdXJjZSB9IGZyb20gXCJpbWFnZS1zb3VyY2VcIjtcclxuaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XHJcbmltcG9ydCB7IEluZm99IGZyb20gJy4vaW5mbyc7XHJcbmltcG9ydCB7IHJlZ2lzdGVyRWxlbWVudCB9IGZyb20gXCJuYXRpdmVzY3JpcHQtYW5ndWxhci9lbGVtZW50LXJlZ2lzdHJ5XCI7XHJcbnJlZ2lzdGVyRWxlbWVudChcIlB1bGxUb1JlZnJlc2hcIiwgKCkgPT4gcmVxdWlyZShcIm5hdGl2ZXNjcmlwdC1wdWxsdG9yZWZyZXNoXCIpLlB1bGxUb1JlZnJlc2gpO1xyXG5pbXBvcnQge0VsZW1lbnRSZWYsIFZpZXdDaGlsZH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IE1hcFZpZXcsIE1hcmtlciwgUG9zaXRpb24gfSBmcm9tICduYXRpdmVzY3JpcHQtZ29vZ2xlLW1hcHMtc2RrJztcclxuaW1wb3J0IHtBY3RpdmF0ZWRSb3V0ZSwgTmF2aWdhdGlvbkV4dHJhc30gZnJvbSBcIkBhbmd1bGFyL3JvdXRlclwiO1xyXG5pbXBvcnQge1JvdXRlcn0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcclxuaW1wb3J0ICogYXMgR2VvbG9jYXRpb24gZnJvbSBcIm5hdGl2ZXNjcmlwdC1nZW9sb2NhdGlvblwiO1xyXG5jb25zdCB0b3Btb3N0ID0gcmVxdWlyZShcInVpL2ZyYW1lXCIpLnRvcG1vc3Q7XHJcblxyXG4vLyBJbXBvcnRhbnQgLSBtdXN0IHJlZ2lzdGVyIE1hcFZpZXcgcGx1Z2luIGluIG9yZGVyIHRvIHVzZSBpbiBBbmd1bGFyIHRlbXBsYXRlc1xyXG5yZWdpc3RlckVsZW1lbnQoXCJNYXBWaWV3XCIsICgpID0+IHJlcXVpcmUoXCJuYXRpdmVzY3JpcHQtZ29vZ2xlLW1hcHMtc2RrXCIpLk1hcFZpZXcpO1xyXG5cclxuLy9maXJlYmFzZVxyXG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSBcInJ4anMvT2JzZXJ2YWJsZVwiO1xyXG5pbXBvcnQgeyBmaXJlc3RvcmUgfSBmcm9tIFwibmF0aXZlc2NyaXB0LXBsdWdpbi1maXJlYmFzZVwiO1xyXG5jb25zdCBmaXJlYmFzZSA9IHJlcXVpcmUoXCJuYXRpdmVzY3JpcHQtcGx1Z2luLWZpcmViYXNlL2FwcFwiKTtcclxuY29uc3QgZmlyZWJhc2VXZWJBcGkgPSByZXF1aXJlKFwibmF0aXZlc2NyaXB0LXBsdWdpbi1maXJlYmFzZS9hcHBcIik7XHJcbmNvbnN0IE1hcEJveCA9IHJlcXVpcmUoXCJuYXRpdmVzY3JpcHQtbWFwYm94XCIpO1xyXG5cclxuLy9pdGVtc1xyXG5cclxuZXhwb3J0IGludGVyZmFjZSBJdGVte1xyXG4gIGlkOnN0cmluZztcclxuICB0aXRsZTpzdHJpbmc7XHJcbiAgZGVzY3JpcHRpb246c3RyaW5nO1xyXG4gIGFkbWlucG9zdGVkOnN0cmluZztcclxuICBwZXJtaXNzaW9uczpzdHJpbmc7XHJcbiAgdGltZTpzdHJpbmc7XHJcbiAgZGF0YXR5cGU6c3RyaW5nO1xyXG4gIHVybDogc3RyaW5nO1xyXG4gIG5hbWU6IHN0cmluZztcclxufVxyXG5cclxuXHJcbkBDb21wb25lbnQoe1xyXG4gIHNlbGVjdG9yOiBcInRhYnNcIixcclxuICB0ZW1wbGF0ZVVybDogXCIuL3RhYnMvdGFicy5jb21wb25lbnQuaHRtbFwiLFxyXG4gIHN0eWxlVXJsczpbXCIuL3RhYnMvdGFicy5jb21wb25lbnQuY3NzXCJdXHJcbn0pXHJcblxyXG5ASW5qZWN0YWJsZSgpXHJcbmV4cG9ydCBjbGFzcyB0YWJzQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcclxuXHJcblxyXG4gIC8vaXRlbSBmcm9tIGNvbGxlY3Rpb24gXHJcbiAgcHVibGljIG15SXRlbSQ6IE9ic2VydmFibGU8SXRlbT47XHJcbiAgcHVibGljIG15SXRlbXMkOiBPYnNlcnZhYmxlPEFycmF5PEl0ZW0+PjtcclxuICBwcml2YXRlIGl0ZW06IEl0ZW07XHJcbiAgcHJpdmF0ZSBpdGVtczogQXJyYXk8SXRlbT4gPSBbXTtcclxuXHJcblxyXG4gIHB1YmxpYyBxdWVyeTogc3RyaW5nO1xyXG5cclxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIHpvbmU6IE5nWm9uZSwgcHJpdmF0ZSByb3V0ZTogQWN0aXZhdGVkUm91dGUsIHByaXZhdGUgcm91dGVyOiBSb3V0ZXIpIHtcclxuICAgIHRoaXMucm91dGUucXVlcnlQYXJhbXMuc3Vic2NyaWJlKHBhcmFtcyA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMucXVlcnkgPSBwYXJhbXNbXCJxdWVyeVwiXTtcclxuICAgICAgICB9KTtcclxuICB9XHJcblxyXG4gIHNob3coKXtcclxuICAgIGFsZXJ0KHRoaXMucXVlcnkpO1xyXG4gIH1cclxuXHJcblxyXG5sYXRpdHVkZSA9ICA0OS45Mjk4O1xyXG5sb25naXR1ZGUgPSAtMTE5LjM5Njg7XHJcbnpvb20gPSAxMjtcclxuYmVhcmluZyA9IDA7XHJcbnRpbHQgPSAwO1xyXG5wYWRkaW5nID0gWzQwLCA0MCwgNDAsIDQwXTtcclxubWFwVmlldzogTWFwVmlldztcclxucHVibGljIGN1cnJlbnRHZW9Mb2NhdGlvbiA9IG51bGw7XHJcbmxhc3RDYW1lcmE6IFN0cmluZztcclxuXHJcbnByaXZhdGUgd2F0Y2hJZDogbnVtYmVyO1xyXG5cclxuLy9NYXAgZXZlbnRzXHJcbm9uTWFwUmVhZHkoZXZlbnQpIHtcclxuICAgIGNvbnNvbGUubG9nKCdNYXAgUmVhZHknKTtcclxuXHJcbiAgICB0aGlzLm1hcFZpZXcgPSBldmVudC5vYmplY3Q7XHJcblxyXG4gICAgY29uc29sZS5sb2coXCJTZXR0aW5nIGEgbWFya2VyLi4uXCIpO1xyXG4gICAgdmFyIG1hcmtlciA9IG5ldyBNYXJrZXIoKTtcclxuICAgIG1hcmtlci5wb3NpdGlvbiA9IFBvc2l0aW9uLnBvc2l0aW9uRnJvbUxhdExuZyg0OS45MjIzNjE5LC0xMTkuMzk3MTkyNyk7XHJcbiAgICBtYXJrZXIudGl0bGUgPSBcIktlbG93bmFcIjtcclxuICAgIG1hcmtlci5zbmlwcGV0ID0gXCJQZXJmaXQgRGVudGFsXCI7XHJcbiAgICBtYXJrZXIudXNlckRhdGEgPSB7aW5kZXg6IDF9O1xyXG4gICAgdmFyIG1hcmtlcjIgPSBuZXcgTWFya2VyKCk7XHJcbiAgICBtYXJrZXIyLnBvc2l0aW9uPVBvc2l0aW9uLnBvc2l0aW9uRnJvbUxhdExuZyh0aGlzLmxhdGl0dWRlLCB0aGlzLmxvbmdpdHVkZSk7XHJcbiAgICBtYXJrZXIyLnRpdGxlPVwiVW5pdmVyc2l0eSBvZiBCcml0aXNoIENvbHVtYmlhXCI7XHJcbiAgICBtYXJrZXIyLnNuaXBwZXQgPSBcIktlbG93bmFcIjtcclxuICAgIG1hcmtlcjIudXNlckRhdGEgPSB7aW5kZXg6Mn07XHJcbiAgICBcclxuICAgIFxyXG4gICAgIC8vIGNoZWNrIGlmIGdlb2xvY2F0aW9uIGlzIG5vdCBlbmFibGVkXHJcbiAgICAgICAgR2VvbG9jYXRpb24uZW5hYmxlTG9jYXRpb25SZXF1ZXN0KCk7IC8vIHJlcXVlc3QgZm9yIHRoZSB1c2VyIHRvIGVuYWJsZSBpdFxyXG4gICAgICBcclxuICAgIHRoaXMubWFwVmlldy5hZGRNYXJrZXIobWFya2VyKTtcclxuICAgIHRoaXMubWFwVmlldy5hZGRNYXJrZXIobWFya2VyMik7XHJcblxyXG5cclxufVxyXG5wcml2YXRlIGdldERldmljZUxvY2F0aW9uKCk6IFByb21pc2U8YW55PiB7XHJcbiAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuICAgICAgR2VvbG9jYXRpb24uZW5hYmxlTG9jYXRpb25SZXF1ZXN0KCkudGhlbigoKSA9PiB7XHJcbiAgICAgICAgICBHZW9sb2NhdGlvbi5nZXRDdXJyZW50TG9jYXRpb24oe3RpbWVvdXQ6IDEwMDAwfSkudGhlbihsb2NhdGlvbiA9PiB7XHJcbiAgICAgICAgICAgICAgcmVzb2x2ZShsb2NhdGlvbik7XHJcbiAgICAgICAgICB9KS5jYXRjaChlcnJvciA9PiB7XHJcbiAgICAgICAgICAgICAgcmVqZWN0KGVycm9yKTtcclxuICAgICAgICAgIH0pO1xyXG4gICAgICB9KTtcclxuICB9KTtcclxufVxyXG5cclxucHVibGljIHVwZGF0ZUxvY2F0aW9uKCkge1xyXG4gIFxyXG4gIHRoaXMuZ2V0RGV2aWNlTG9jYXRpb24oKS50aGVuKHJlc3VsdCA9PiB7XHJcbiAgICAgIHRoaXMubGF0aXR1ZGUgPSByZXN1bHQubGF0aXR1ZGU7XHJcbiAgICAgIHRoaXMubG9uZ2l0dWRlID0gcmVzdWx0LmxvbmdpdHVkZTtcclxuICAgICAgICAgICBcclxuICB9LCBlcnJvciA9PiB7XHJcbiAgICAgIGNvbnNvbGUuZXJyb3IoZXJyb3IpO1xyXG4gIH0pO1xyXG59XHJcblxyXG5wdWJsaWMgc3RhcnRXYXRjaGluZ0xvY2F0aW9uKCkge1xyXG4gIEdlb2xvY2F0aW9uLmVuYWJsZUxvY2F0aW9uUmVxdWVzdCgpOyAvLyByZXF1ZXN0IGZvciB0aGUgdXNlciB0byBlbmFibGUgaXRcclxuICB0aGlzLndhdGNoSWQgPSBHZW9sb2NhdGlvbi53YXRjaExvY2F0aW9uKGxvY2F0aW9uID0+IHtcclxuICAgICAgaWYobG9jYXRpb24pIHtcclxuICAgICAgICAgIHRoaXMuem9uZS5ydW4oKCkgPT4ge1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgICB0aGlzLmxhdGl0dWRlID0gbG9jYXRpb24ubGF0aXR1ZGU7XHJcbiAgICAgICAgICAgICAgdGhpcy5sb25naXR1ZGUgPSBsb2NhdGlvbi5sb25naXR1ZGU7XHJcbiAgICAgICAgICAgICAgY29uc29sZS5sb2codGhpcy5sYXRpdHVkZSk7XHJcbiAgICAgICAgICAgICAgY29uc29sZS5sb2codGhpcy5sb25naXR1ZGUpO1xyXG4gICAgICAgICAgICAgIHZhciBtYXJrZXIzID0gbmV3IE1hcmtlcigpO1xyXG4gICAgICAgICAgICAgIG1hcmtlcjMucG9zaXRpb249UG9zaXRpb24ucG9zaXRpb25Gcm9tTGF0TG5nKHRoaXMubGF0aXR1ZGUsIHRoaXMubG9uZ2l0dWRlKTtcclxuICAgICAgICAgICAgICBtYXJrZXIzLnRpdGxlPVwiWW91ciBsb2NhdGlvblwiO1xyXG4gICAgICAgICAgICAgIG1hcmtlcjMuc25pcHBldCA9IHRoaXMubGF0aXR1ZGUudG9TdHJpbmcoKSArIFwiLFwiICsgdGhpcy5sb25naXR1ZGUudG9TdHJpbmcoKTtcclxuICAgICAgICAgICAgICBtYXJrZXIzLnVzZXJEYXRhID0ge2luZGV4OjJ9O1xyXG5cclxuICAgICAgICAgICAgICBsZXQgaW1nU3JjID0gbmV3IEltYWdlU291cmNlKCk7XHJcbiAgICAgICAgICAgICAgaW1nU3JjLmZyb21GaWxlKFwifi9pbWFnZXMvbG9jYXRpb24ucG5nXCIpO1xyXG4gICAgICBcclxuICAgICAgICAgICAgICBsZXQgaW1hZ2UgPSBuZXcgSW1hZ2UoKTtcclxuICAgICAgICAgICAgICBpbWFnZS5pbWFnZVNvdXJjZSA9IGltZ1NyYztcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgbWFya2VyMy5pY29uID0gaW1hZ2U7XHJcbiAgICAgICAgICAgICAgdGhpcy5tYXBWaWV3LmFkZE1hcmtlcihtYXJrZXIzKTtcclxuICAgICAgICAgICAgICBcclxuICAgICAgICAgIH0pO1xyXG4gICAgICB9XHJcbiAgfSwgZXJyb3IgPT4ge1xyXG4gICAgICBjb25zb2xlLmxvZyhlcnJvcik7XHJcbiAgfSwgeyB1cGRhdGVEaXN0YW5jZTogMSwgbWluaW11bVVwZGF0ZVRpbWU6IDEwMDAgfSk7XHJcbn1cclxuXHJcbnB1YmxpYyBzdG9wV2F0Y2hpbmdMb2NhdGlvbigpIHtcclxuICBpZih0aGlzLndhdGNoSWQpIHtcclxuICAgICAgR2VvbG9jYXRpb24uY2xlYXJXYXRjaCh0aGlzLndhdGNoSWQpO1xyXG4gICAgICB0aGlzLndhdGNoSWQgPSBudWxsO1xyXG4gIH1cclxufVxyXG5vbkNvb3JkaW5hdGVUYXBwZWQoYXJncykge1xyXG4gICAgY29uc29sZS5sb2coXCJDb29yZGluYXRlIFRhcHBlZCwgTGF0OiBcIiArIGFyZ3MucG9zaXRpb24ubGF0aXR1ZGUgKyBcIiwgTG9uOiBcIiArIGFyZ3MucG9zaXRpb24ubG9uZ2l0dWRlLCBhcmdzKTtcclxufVxyXG5cclxub25NYXJrZXJFdmVudChhcmdzKSB7XHJcbiAgICBjb25zb2xlLmxvZyhcIk1hcmtlciBFdmVudDogJ1wiICsgYXJncy5ldmVudE5hbWVcclxuICAgICAgICArIFwiJyB0cmlnZ2VyZWQgb246IFwiICsgYXJncy5tYXJrZXIudGl0bGVcclxuICAgICAgICArIFwiLCBMYXQ6IFwiICsgYXJncy5tYXJrZXIucG9zaXRpb24ubGF0aXR1ZGUgKyBcIiwgTG9uOiBcIiArIGFyZ3MubWFya2VyLnBvc2l0aW9uLmxvbmdpdHVkZSwgYXJncyk7XHJcbn1cclxuXHJcbm9uQ2FtZXJhQ2hhbmdlZChhcmdzKSB7XHJcbiAgICBjb25zb2xlLmxvZyhcIkNhbWVyYSBjaGFuZ2VkOiBcIiArIEpTT04uc3RyaW5naWZ5KGFyZ3MuY2FtZXJhKSwgSlNPTi5zdHJpbmdpZnkoYXJncy5jYW1lcmEpID09PSB0aGlzLmxhc3RDYW1lcmEpO1xyXG4gICAgdGhpcy5sYXN0Q2FtZXJhID0gSlNPTi5zdHJpbmdpZnkoYXJncy5jYW1lcmEpO1xyXG59XHJcbiAgLy8gaW5pdGlhbGl6ZSB0aGUgZmlyZWJhc2UgY29ubmVjdGlvblxyXG4gIC8vIGdldCBkYXRhIGZyb20gZmlyZXN0b3JlXHJcbiAgbmdPbkluaXQoKTogdm9pZCB7XHJcbiAgICBmaXJlYmFzZS5pbml0aWFsaXplQXBwKHtcclxuICAgICAgcGVyc2lzdDogZmFsc2VcclxuICAgIH0pLnRoZW4oKCkgPT4ge1xyXG4gICAgICBjb25zb2xlLmxvZyhcIkZpcmViYXNlIGluaXRpYWxpemVkXCIpO1xyXG4gICAgfSk7XHJcbiAgICAgLy90aGlzLmZpcmVzdG9yZUNvbGxlY3Rpb25PYnNlcnZhYmxlKCk7XHJcbiAgfVxyXG5cclxuXHJcbiAgZmlyZXN0b3JlQ29sbGVjdGlvbk9ic2VydmFibGUoKTogdm9pZCB7XHJcbiAgICB0aGlzLm15SXRlbXMkID0gT2JzZXJ2YWJsZS5jcmVhdGUoc3Vic2NyaWJlciA9PiB7XHJcbiAgICAgIGNvbnN0IGNvbFJlZjogZmlyZXN0b3JlLkNvbGxlY3Rpb25SZWZlcmVuY2UgPSBmaXJlYmFzZS5maXJlc3RvcmUoKS5jb2xsZWN0aW9uKFwiaXRlbXNcIik7XHJcbiAgICAgIGNvbFJlZi5vblNuYXBzaG90KChzbmFwc2hvdDogZmlyZXN0b3JlLlF1ZXJ5U25hcHNob3QpID0+IHtcclxuICAgICAgICB0aGlzLnpvbmUucnVuKCgpID0+IHtcclxuICAgICAgICAgIHRoaXMuaXRlbXMgPSBbXTtcclxuICAgICAgICAgIHNuYXBzaG90LmZvckVhY2goZG9jU25hcCA9PiB0aGlzLml0ZW1zLnB1c2goPEl0ZW0+ZG9jU25hcC5kYXRhKCkpKTtcclxuICAgICAgICAgIHN1YnNjcmliZXIubmV4dCh0aGlzLml0ZW1zKTtcclxuICAgICAgICB9KTtcclxuICAgICAgfSk7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBmaXJlc3RvcmVXaGVyZUV2ZXJ5b25lKCk6IHZvaWQge1xyXG4gICAgdGhpcy5teUl0ZW1zJCA9IE9ic2VydmFibGUuY3JlYXRlKHN1YnNjcmliZXIgPT4ge1xyXG4gICAgIGNvbnN0IHF1ZXJ5OiBmaXJlc3RvcmUuUXVlcnkgPSBmaXJlYmFzZS5maXJlc3RvcmUoKS5jb2xsZWN0aW9uKFwiaXRlbXNcIilcclxuICAgICAgICAud2hlcmUoXCJwZXJtaXNzaW9uc1wiLCBcIj09XCIsIHRoaXMucXVlcnkpO1xyXG4gICAgcXVlcnlcclxuICAgICAgICAuZ2V0KClcclxuICAgICAgICAudGhlbigocXVlcnlTbmFwc2hvdDogZmlyZXN0b3JlLlF1ZXJ5U25hcHNob3QpID0+IHtcclxuICAgICAgICAgIHF1ZXJ5U25hcHNob3QuZm9yRWFjaChkb2MgPT4ge1xyXG5cclxuICAgICAgICAgICAgdGhpcy5pdGVtcyA9IFtdO1xyXG4gICAgICAgICAgICBxdWVyeVNuYXBzaG90LmZvckVhY2goZG9jU25hcCA9PiB0aGlzLml0ZW1zLnB1c2goPEl0ZW0+ZG9jU25hcC5kYXRhKCkpKTtcclxuICAgICAgICAgICAgc3Vic2NyaWJlci5uZXh0KHRoaXMuaXRlbXMpO1xyXG5cclxuICAgICAgICAgICAgLy9jb25zb2xlLmxvZyhgRGVudGlzdCBQZXJtaXNzaW9uczogJHtkb2MuaWR9ID0+ICR7SlNPTi5zdHJpbmdpZnkoZG9jLmRhdGEoKSl9YCk7XHJcbiAgICAgICAgICAgfSk7XHJcbiAgICB9KTtcclxuICB9KTtcclxufVxyXG4gIFxyXG5wdWJsaWMgZmlyZXN0b3JlV2hlcmVEZW50aXN0cygpOiB2b2lkIHtcclxuICAgIHRoaXMubXlJdGVtcyQgPSBPYnNlcnZhYmxlLmNyZWF0ZShzdWJzY3JpYmVyID0+IHtcclxuICAgICBjb25zdCBxdWVyeTogZmlyZXN0b3JlLlF1ZXJ5ID0gZmlyZWJhc2UuZmlyZXN0b3JlKCkuY29sbGVjdGlvbihcIml0ZW1zXCIpXHJcbiAgICAgICAgLndoZXJlKFwicGVybWlzc2lvbnNcIiwgXCI9PVwiLCB0aGlzLnF1ZXJ5KTtcclxuICAgIHF1ZXJ5XHJcbiAgICAgICAgLmdldCgpXHJcbiAgICAgICAgLnRoZW4oKHF1ZXJ5U25hcHNob3Q6IGZpcmVzdG9yZS5RdWVyeVNuYXBzaG90KSA9PiB7XHJcbiAgICAgICAgICBxdWVyeVNuYXBzaG90LmZvckVhY2goZG9jID0+IHtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuaXRlbXMgPSBbXTtcclxuICAgICAgICAgICAgcXVlcnlTbmFwc2hvdC5mb3JFYWNoKGRvY1NuYXAgPT4gdGhpcy5pdGVtcy5wdXNoKDxJdGVtPmRvY1NuYXAuZGF0YSgpKSk7XHJcbiAgICAgICAgICAgIHN1YnNjcmliZXIubmV4dCh0aGlzLml0ZW1zKTtcclxuICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhgRGVudGlzdCBQZXJtaXNzaW9uczogJHtkb2MuaWR9ID0+ICR7SlNPTi5zdHJpbmdpZnkoZG9jLmRhdGEoKSl9YCk7XHJcbiAgICAgICAgICAgfSk7XHJcbiAgICB9KTtcclxuICB9KTtcclxufVxyXG5cclxuXHJcblxyXG52aWV3RGV0YWlsKHRpdGxlOiBzdHJpbmcpe1xyXG4gIGNvbnNvbGUubG9nKFwiY2xpY2tpbmcgdmlldyBkZXRhaWxcIiArIHRpdGxlKTtcclxuXHJcbmxldCBuYXZpZ2F0aW9uRXh0cmFzOiBOYXZpZ2F0aW9uRXh0cmFzID0ge1xyXG4gIHF1ZXJ5UGFyYW1zOiB7XHJcbiAgICAgIFwiVGl0bGVcIjogdGl0bGUsXHJcbiAgfVxyXG59O1xyXG50aGlzLnJvdXRlci5uYXZpZ2F0ZShbXCIvZGV0YWlsXCJdLCBuYXZpZ2F0aW9uRXh0cmFzKTtcclxuICBcclxuICAvLyB0aGlzLnJvdXRlci5uYXZpZ2F0ZShbXCIvZGV0YWlsXCJdKTtcclxufVxyXG5cclxuXHJcblxyXG59XHJcbiJdfQ==