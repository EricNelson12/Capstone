"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var image_1 = require("tns-core-modules/ui/image");
var image_source_1 = require("image-source");
var element_registry_1 = require("nativescript-angular/element-registry");
element_registry_1.registerElement("PullToRefresh", function () { return require("nativescript-pulltorefresh").PullToRefresh; });
var nativescript_google_maps_sdk_1 = require("nativescript-google-maps-sdk");
var router_1 = require("@angular/router");
var Geolocation = require("nativescript-geolocation");
// Important - must register MapView plugin in order to use in Angular templates
element_registry_1.registerElement("MapView", function () { return require("nativescript-google-maps-sdk").MapView; });
//firebase
var Observable_1 = require("rxjs/Observable");
var firebase = require("nativescript-plugin-firebase/app");
var firebaseWebApi = require("nativescript-plugin-firebase/app");
var MapBox = require("nativescript-mapbox");
var tabsComponent = (function () {
    function tabsComponent(zone, route) {
        var _this = this;
        this.zone = zone;
        this.route = route;
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
                    //console.log(`Dentist Permissions: ${doc.id} => ${JSON.stringify(doc.data())}`);
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
        __metadata("design:paramtypes", [core_1.NgZone, router_1.ActivatedRoute])
    ], tabsComponent);
    return tabsComponent;
}());
exports.tabsComponent = tabsComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFicy5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJ0YWJzLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUF1RDtBQUd2RCxtREFBa0Q7QUFDbEQsNkNBQTJDO0FBRTNDLDBFQUF3RTtBQUN4RSxrQ0FBZSxDQUFDLGVBQWUsRUFBRSxjQUFNLE9BQUEsT0FBTyxDQUFDLDRCQUE0QixDQUFDLENBQUMsYUFBYSxFQUFuRCxDQUFtRCxDQUFDLENBQUM7QUFFNUYsNkVBQXlFO0FBQ3pFLDBDQUErQztBQUMvQyxzREFBd0Q7QUFDeEQsZ0ZBQWdGO0FBQ2hGLGtDQUFlLENBQUMsU0FBUyxFQUFFLGNBQU0sT0FBQSxPQUFPLENBQUMsOEJBQThCLENBQUMsQ0FBQyxPQUFPLEVBQS9DLENBQStDLENBQUMsQ0FBQztBQUVsRixVQUFVO0FBQ1YsOENBQTZDO0FBRTdDLElBQU0sUUFBUSxHQUFHLE9BQU8sQ0FBQyxrQ0FBa0MsQ0FBQyxDQUFDO0FBQzdELElBQU0sY0FBYyxHQUFHLE9BQU8sQ0FBQyxrQ0FBa0MsQ0FBQyxDQUFDO0FBQ25FLElBQU0sTUFBTSxHQUFHLE9BQU8sQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDO0FBc0I5QztJQVlFLHVCQUFvQixJQUFZLEVBQVUsS0FBcUI7UUFBL0QsaUJBSUM7UUFKbUIsU0FBSSxHQUFKLElBQUksQ0FBUTtRQUFVLFVBQUssR0FBTCxLQUFLLENBQWdCO1FBTHZELFVBQUssR0FBZ0IsRUFBRSxDQUFDO1FBZ0JsQyxhQUFRLEdBQUksT0FBTyxDQUFDO1FBQ3BCLGNBQVMsR0FBRyxDQUFDLFFBQVEsQ0FBQztRQUN0QixTQUFJLEdBQUcsRUFBRSxDQUFDO1FBQ1YsWUFBTyxHQUFHLENBQUMsQ0FBQztRQUNaLFNBQUksR0FBRyxDQUFDLENBQUM7UUFDVCxZQUFPLEdBQUcsQ0FBQyxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLENBQUMsQ0FBQztRQUVwQix1QkFB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RyxFQUFFLENBQUM7b0JBQ2hCLGFBQWEsQ0FBQyxPQUFPLENBQUMsVUFBQSxPQUFPLElBQUksT0FBQSxLQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBTyxPQUFPLENBQUMsSUFBSSxFQUFFLENBQUMsRUFBckMsQ0FBcUMsQ0FBQyxDQUFDO29CQUN4RSxVQUFVLENBQUMsSUFBSSxDQUFDLEtBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztvQkFDNUIsaUZBQWlGO2dCQUNsRixDQUFDLENBQUMsQ0FBQztZQUNWLENBQUMsQ0FBQyxDQUFDO1FBQ0wsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDO0lBck1ZLGFBQWE7UUFMekIsZ0JBQVMsQ0FBQztZQUNULFFBQVEsRUFBRSxNQUFNO1lBQ2hCLFdBQVcsRUFBRSw0QkFBNEI7WUFDekMsU0FBUyxFQUFDLENBQUMsMkJBQTJCLENBQUM7U0FDeEMsQ0FBQzt5Q0FhMEIsYUFBTSxFQUFpQix1QkFBYztPQVpwRCxhQUFhLENBMk16QjtJQUFELG9CQUFDO0NBQUEsQUEzTUQsSUEyTUM7QUEzTVksc0NBQWEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0NvbXBvbmVudCxPbkluaXQsTmdab25lIH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcclxuaW1wb3J0ICogYXMgbGlzdFZpZXdNb2R1bGUgZnJvbSBcInRucy1jb3JlLW1vZHVsZXMvdWkvbGlzdC12aWV3XCI7XHJcbmltcG9ydCAqIGFzIEltYWdlTW9kdWxlIGZyb20gXCJ0bnMtY29yZS1tb2R1bGVzL3VpL2ltYWdlXCI7XHJcbmltcG9ydCB7IEltYWdlIH0gZnJvbSBcInRucy1jb3JlLW1vZHVsZXMvdWkvaW1hZ2VcIjtcclxuaW1wb3J0IHsgSW1hZ2VTb3VyY2UgfSBmcm9tIFwiaW1hZ2Utc291cmNlXCI7XHJcbmltcG9ydCB7IEluZm99IGZyb20gJy4vaW5mbyc7XHJcbmltcG9ydCB7IHJlZ2lzdGVyRWxlbWVudCB9IGZyb20gXCJuYXRpdmVzY3JpcHQtYW5ndWxhci9lbGVtZW50LXJlZ2lzdHJ5XCI7XHJcbnJlZ2lzdGVyRWxlbWVudChcIlB1bGxUb1JlZnJlc2hcIiwgKCkgPT4gcmVxdWlyZShcIm5hdGl2ZXNjcmlwdC1wdWxsdG9yZWZyZXNoXCIpLlB1bGxUb1JlZnJlc2gpO1xyXG5pbXBvcnQge0VsZW1lbnRSZWYsIFZpZXdDaGlsZH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IE1hcFZpZXcsIE1hcmtlciwgUG9zaXRpb24gfSBmcm9tICduYXRpdmVzY3JpcHQtZ29vZ2xlLW1hcHMtc2RrJztcclxuaW1wb3J0IHtBY3RpdmF0ZWRSb3V0ZX0gZnJvbSBcIkBhbmd1bGFyL3JvdXRlclwiO1xyXG5pbXBvcnQgKiBhcyBHZW9sb2NhdGlvbiBmcm9tIFwibmF0aXZlc2NyaXB0LWdlb2xvY2F0aW9uXCI7XHJcbi8vIEltcG9ydGFudCAtIG11c3QgcmVnaXN0ZXIgTWFwVmlldyBwbHVnaW4gaW4gb3JkZXIgdG8gdXNlIGluIEFuZ3VsYXIgdGVtcGxhdGVzXHJcbnJlZ2lzdGVyRWxlbWVudChcIk1hcFZpZXdcIiwgKCkgPT4gcmVxdWlyZShcIm5hdGl2ZXNjcmlwdC1nb29nbGUtbWFwcy1zZGtcIikuTWFwVmlldyk7XHJcblxyXG4vL2ZpcmViYXNlXHJcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tIFwicnhqcy9PYnNlcnZhYmxlXCI7XHJcbmltcG9ydCB7IGZpcmVzdG9yZSB9IGZyb20gXCJuYXRpdmVzY3JpcHQtcGx1Z2luLWZpcmViYXNlXCI7XHJcbmNvbnN0IGZpcmViYXNlID0gcmVxdWlyZShcIm5hdGl2ZXNjcmlwdC1wbHVnaW4tZmlyZWJhc2UvYXBwXCIpO1xyXG5jb25zdCBmaXJlYmFzZVdlYkFwaSA9IHJlcXVpcmUoXCJuYXRpdmVzY3JpcHQtcGx1Z2luLWZpcmViYXNlL2FwcFwiKTtcclxuY29uc3QgTWFwQm94ID0gcmVxdWlyZShcIm5hdGl2ZXNjcmlwdC1tYXBib3hcIik7XHJcblxyXG4vL2l0ZW1zXHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIEl0ZW17XHJcbiAgaWQ6c3RyaW5nO1xyXG4gIHRpdGxlOnN0cmluZztcclxuICBkZXNjcmlwdGlvbjpzdHJpbmc7XHJcbiAgYWRtaW5wb3N0ZWQ6c3RyaW5nO1xyXG4gIHBlcm1pc3Npb25zOnN0cmluZztcclxuICB0aW1lOnN0cmluZztcclxuICBkYXRhdHlwZTpzdHJpbmc7XHJcbiAgdXJsOiBzdHJpbmc7XHJcbiAgbmFtZTogc3RyaW5nO1xyXG59XHJcblxyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgc2VsZWN0b3I6IFwidGFic1wiLFxyXG4gIHRlbXBsYXRlVXJsOiBcIi4vdGFicy90YWJzLmNvbXBvbmVudC5odG1sXCIsXHJcbiAgc3R5bGVVcmxzOltcIi4vdGFicy90YWJzLmNvbXBvbmVudC5jc3NcIl1cclxufSlcclxuZXhwb3J0IGNsYXNzIHRhYnNDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xyXG5cclxuXHJcbiAgLy9pdGVtIGZyb20gY29sbGVjdGlvbiBcclxuICBwdWJsaWMgbXlJdGVtJDogT2JzZXJ2YWJsZTxJdGVtPjtcclxuICBwdWJsaWMgbXlJdGVtcyQ6IE9ic2VydmFibGU8QXJyYXk8SXRlbT4+O1xyXG4gIHByaXZhdGUgaXRlbTogSXRlbTtcclxuICBwcml2YXRlIGl0ZW1zOiBBcnJheTxJdGVtPiA9IFtdO1xyXG5cclxuXHJcbiAgcHVibGljIHF1ZXJ5OiBzdHJpbmc7XHJcblxyXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgem9uZTogTmdab25lLCBwcml2YXRlIHJvdXRlOiBBY3RpdmF0ZWRSb3V0ZSkge1xyXG4gICAgdGhpcy5yb3V0ZS5xdWVyeVBhcmFtcy5zdWJzY3JpYmUocGFyYW1zID0+IHtcclxuICAgICAgICAgICAgdGhpcy5xdWVyeSA9IHBhcmFtc1tcInF1ZXJ5XCJdO1xyXG4gICAgICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgc2hvdygpe1xyXG4gICAgYWxlcnQodGhpcy5xdWVyeSk7XHJcbiAgfVxyXG5cclxuXHJcbmxhdGl0dWRlID0gIDQ5LjkyOTg7XHJcbmxvbmdpdHVkZSA9IC0xMTkuMzk2ODtcclxuem9vbSA9IDEyO1xyXG5iZWFyaW5nID0gMDtcclxudGlsdCA9IDA7XHJcbnBhZGRpbmcgPSBbNDAsIDQwLCA0MCwgNDBdO1xyXG5tYXBWaWV3OiBNYXBWaWV3O1xyXG5wdWJsaWMgY3VycmVudEdlb0xvY2F0aW9uID0gbnVsbDtcclxubGFzdENhbWVyYTogU3RyaW5nO1xyXG5cclxucHJpdmF0ZSB3YXRjaElkOiBudW1iZXI7XHJcblxyXG4vL01hcCBldmVudHNcclxub25NYXBSZWFkeShldmVudCkge1xyXG4gICAgY29uc29sZS5sb2coJ01hcCBSZWFkeScpO1xyXG5cclxuICAgIHRoaXMubWFwVmlldyA9IGV2ZW50Lm9iamVjdDtcclxuXHJcbiAgICBjb25zb2xlLmxvZyhcIlNldHRpbmcgYSBtYXJrZXIuLi5cIik7XHJcbiAgICB2YXIgbWFya2VyID0gbmV3IE1hcmtlcigpO1xyXG4gICAgbWFya2VyLnBvc2l0aW9uID0gUG9zaXRpb24ucG9zaXRpb25Gcm9tTGF0TG5nKDQ5LjkyMjM2MTksLTExOS4zOTcxOTI3KTtcclxuICAgIG1hcmtlci50aXRsZSA9IFwiS2Vsb3duYVwiO1xyXG4gICAgbWFya2VyLnNuaXBwZXQgPSBcIlBlcmZpdCBEZW50YWxcIjtcclxuICAgIG1hcmtlci51c2VyRGF0YSA9IHtpbmRleDogMX07XHJcbiAgICB2YXIgbWFya2VyMiA9IG5ldyBNYXJrZXIoKTtcclxuICAgIG1hcmtlcjIucG9zaXRpb249UG9zaXRpb24ucG9zaXRpb25Gcm9tTGF0TG5nKHRoaXMubGF0aXR1ZGUsIHRoaXMubG9uZ2l0dWRlKTtcclxuICAgIG1hcmtlcjIudGl0bGU9XCJVbml2ZXJzaXR5IG9mIEJyaXRpc2ggQ29sdW1iaWFcIjtcclxuICAgIG1hcmtlcjIuc25pcHBldCA9IFwiS2Vsb3duYVwiO1xyXG4gICAgbWFya2VyMi51c2VyRGF0YSA9IHtpbmRleDoyfTtcclxuICAgIFxyXG4gICAgXHJcbiAgICAgLy8gY2hlY2sgaWYgZ2VvbG9jYXRpb24gaXMgbm90IGVuYWJsZWRcclxuICAgICAgICBHZW9sb2NhdGlvbi5lbmFibGVMb2NhdGlvblJlcXVlc3QoKTsgLy8gcmVxdWVzdCBmb3IgdGhlIHVzZXIgdG8gZW5hYmxlIGl0XHJcbiAgICAgIFxyXG4gICAgdGhpcy5tYXBWaWV3LmFkZE1hcmtlcihtYXJrZXIpO1xyXG4gICAgdGhpcy5tYXBWaWV3LmFkZE1hcmtlcihtYXJrZXIyKTtcclxuXHJcblxyXG59XHJcbnByaXZhdGUgZ2V0RGV2aWNlTG9jYXRpb24oKTogUHJvbWlzZTxhbnk+IHtcclxuICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG4gICAgICBHZW9sb2NhdGlvbi5lbmFibGVMb2NhdGlvblJlcXVlc3QoKS50aGVuKCgpID0+IHtcclxuICAgICAgICAgIEdlb2xvY2F0aW9uLmdldEN1cnJlbnRMb2NhdGlvbih7dGltZW91dDogMTAwMDB9KS50aGVuKGxvY2F0aW9uID0+IHtcclxuICAgICAgICAgICAgICByZXNvbHZlKGxvY2F0aW9uKTtcclxuICAgICAgICAgIH0pLmNhdGNoKGVycm9yID0+IHtcclxuICAgICAgICAgICAgICByZWplY3QoZXJyb3IpO1xyXG4gICAgICAgICAgfSk7XHJcbiAgICAgIH0pO1xyXG4gIH0pO1xyXG59XHJcblxyXG5wdWJsaWMgdXBkYXRlTG9jYXRpb24oKSB7XHJcbiAgXHJcbiAgdGhpcy5nZXREZXZpY2VMb2NhdGlvbigpLnRoZW4ocmVzdWx0ID0+IHtcclxuICAgICAgdGhpcy5sYXRpdHVkZSA9IHJlc3VsdC5sYXRpdHVkZTtcclxuICAgICAgdGhpcy5sb25naXR1ZGUgPSByZXN1bHQubG9uZ2l0dWRlO1xyXG4gICAgICAgICAgIFxyXG4gIH0sIGVycm9yID0+IHtcclxuICAgICAgY29uc29sZS5lcnJvcihlcnJvcik7XHJcbiAgfSk7XHJcbn1cclxuXHJcbnB1YmxpYyBzdGFydFdhdGNoaW5nTG9jYXRpb24oKSB7XHJcbiAgR2VvbG9jYXRpb24uZW5hYmxlTG9jYXRpb25SZXF1ZXN0KCk7IC8vIHJlcXVlc3QgZm9yIHRoZSB1c2VyIHRvIGVuYWJsZSBpdFxyXG4gIHRoaXMud2F0Y2hJZCA9IEdlb2xvY2F0aW9uLndhdGNoTG9jYXRpb24obG9jYXRpb24gPT4ge1xyXG4gICAgICBpZihsb2NhdGlvbikge1xyXG4gICAgICAgICAgdGhpcy56b25lLnJ1bigoKSA9PiB7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgIHRoaXMubGF0aXR1ZGUgPSBsb2NhdGlvbi5sYXRpdHVkZTtcclxuICAgICAgICAgICAgICB0aGlzLmxvbmdpdHVkZSA9IGxvY2F0aW9uLmxvbmdpdHVkZTtcclxuICAgICAgICAgICAgICBjb25zb2xlLmxvZyh0aGlzLmxhdGl0dWRlKTtcclxuICAgICAgICAgICAgICBjb25zb2xlLmxvZyh0aGlzLmxvbmdpdHVkZSk7XHJcbiAgICAgICAgICAgICAgdmFyIG1hcmtlcjMgPSBuZXcgTWFya2VyKCk7XHJcbiAgICAgICAgICAgICAgbWFya2VyMy5wb3NpdGlvbj1Qb3NpdGlvbi5wb3NpdGlvbkZyb21MYXRMbmcodGhpcy5sYXRpdHVkZSwgdGhpcy5sb25naXR1ZGUpO1xyXG4gICAgICAgICAgICAgIG1hcmtlcjMudGl0bGU9XCJZb3VyIGxvY2F0aW9uXCI7XHJcbiAgICAgICAgICAgICAgbWFya2VyMy5zbmlwcGV0ID0gdGhpcy5sYXRpdHVkZS50b1N0cmluZygpICsgXCIsXCIgKyB0aGlzLmxvbmdpdHVkZS50b1N0cmluZygpO1xyXG4gICAgICAgICAgICAgIG1hcmtlcjMudXNlckRhdGEgPSB7aW5kZXg6Mn07XHJcblxyXG4gICAgICAgICAgICAgIGxldCBpbWdTcmMgPSBuZXcgSW1hZ2VTb3VyY2UoKTtcclxuICAgICAgICAgICAgICBpbWdTcmMuZnJvbUZpbGUoXCJ+L2ltYWdlcy9sb2NhdGlvbi5wbmdcIik7XHJcbiAgICAgIFxyXG4gICAgICAgICAgICAgIGxldCBpbWFnZSA9IG5ldyBJbWFnZSgpO1xyXG4gICAgICAgICAgICAgIGltYWdlLmltYWdlU291cmNlID0gaW1nU3JjO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgICBtYXJrZXIzLmljb24gPSBpbWFnZTtcclxuICAgICAgICAgICAgICB0aGlzLm1hcFZpZXcuYWRkTWFya2VyKG1hcmtlcjMpO1xyXG4gICAgICAgICAgICAgIFxyXG4gICAgICAgICAgfSk7XHJcbiAgICAgIH1cclxuICB9LCBlcnJvciA9PiB7XHJcbiAgICAgIGNvbnNvbGUubG9nKGVycm9yKTtcclxuICB9LCB7IHVwZGF0ZURpc3RhbmNlOiAxLCBtaW5pbXVtVXBkYXRlVGltZTogMTAwMCB9KTtcclxufVxyXG5cclxucHVibGljIHN0b3BXYXRjaGluZ0xvY2F0aW9uKCkge1xyXG4gIGlmKHRoaXMud2F0Y2hJZCkge1xyXG4gICAgICBHZW9sb2NhdGlvbi5jbGVhcldhdGNoKHRoaXMud2F0Y2hJZCk7XHJcbiAgICAgIHRoaXMud2F0Y2hJZCA9IG51bGw7XHJcbiAgfVxyXG59XHJcbm9uQ29vcmRpbmF0ZVRhcHBlZChhcmdzKSB7XHJcbiAgICBjb25zb2xlLmxvZyhcIkNvb3JkaW5hdGUgVGFwcGVkLCBMYXQ6IFwiICsgYXJncy5wb3NpdGlvbi5sYXRpdHVkZSArIFwiLCBMb246IFwiICsgYXJncy5wb3NpdGlvbi5sb25naXR1ZGUsIGFyZ3MpO1xyXG59XHJcblxyXG5vbk1hcmtlckV2ZW50KGFyZ3MpIHtcclxuICAgIGNvbnNvbGUubG9nKFwiTWFya2VyIEV2ZW50OiAnXCIgKyBhcmdzLmV2ZW50TmFtZVxyXG4gICAgICAgICsgXCInIHRyaWdnZXJlZCBvbjogXCIgKyBhcmdzLm1hcmtlci50aXRsZVxyXG4gICAgICAgICsgXCIsIExhdDogXCIgKyBhcmdzLm1hcmtlci5wb3NpdGlvbi5sYXRpdHVkZSArIFwiLCBMb246IFwiICsgYXJncy5tYXJrZXIucG9zaXRpb24ubG9uZ2l0dWRlLCBhcmdzKTtcclxufVxyXG5cclxub25DYW1lcmFDaGFuZ2VkKGFyZ3MpIHtcclxuICAgIGNvbnNvbGUubG9nKFwiQ2FtZXJhIGNoYW5nZWQ6IFwiICsgSlNPTi5zdHJpbmdpZnkoYXJncy5jYW1lcmEpLCBKU09OLnN0cmluZ2lmeShhcmdzLmNhbWVyYSkgPT09IHRoaXMubGFzdENhbWVyYSk7XHJcbiAgICB0aGlzLmxhc3RDYW1lcmEgPSBKU09OLnN0cmluZ2lmeShhcmdzLmNhbWVyYSk7XHJcbn1cclxuICAvLyBpbml0aWFsaXplIHRoZSBmaXJlYmFzZSBjb25uZWN0aW9uXHJcbiAgLy8gZ2V0IGRhdGEgZnJvbSBmaXJlc3RvcmVcclxuICBuZ09uSW5pdCgpOiB2b2lkIHtcclxuICAgIGZpcmViYXNlLmluaXRpYWxpemVBcHAoe1xyXG4gICAgICBwZXJzaXN0OiBmYWxzZVxyXG4gICAgfSkudGhlbigoKSA9PiB7XHJcbiAgICAgIGNvbnNvbGUubG9nKFwiRmlyZWJhc2UgaW5pdGlhbGl6ZWRcIik7XHJcbiAgICB9KTtcclxuICAgICAvL3RoaXMuZmlyZXN0b3JlQ29sbGVjdGlvbk9ic2VydmFibGUoKTtcclxuICB9XHJcblxyXG5cclxuICBmaXJlc3RvcmVDb2xsZWN0aW9uT2JzZXJ2YWJsZSgpOiB2b2lkIHtcclxuICAgIHRoaXMubXlJdGVtcyQgPSBPYnNlcnZhYmxlLmNyZWF0ZShzdWJzY3JpYmVyID0+IHtcclxuICAgICAgY29uc3QgY29sUmVmOiBmaXJlc3RvcmUuQ29sbGVjdGlvblJlZmVyZW5jZSA9IGZpcmViYXNlLmZpcmVzdG9yZSgpLmNvbGxlY3Rpb24oXCJpdGVtc1wiKTtcclxuICAgICAgY29sUmVmLm9uU25hcHNob3QoKHNuYXBzaG90OiBmaXJlc3RvcmUuUXVlcnlTbmFwc2hvdCkgPT4ge1xyXG4gICAgICAgIHRoaXMuem9uZS5ydW4oKCkgPT4ge1xyXG4gICAgICAgICAgdGhpcy5pdGVtcyA9IFtdO1xyXG4gICAgICAgICAgc25hcHNob3QuZm9yRWFjaChkb2NTbmFwID0+IHRoaXMuaXRlbXMucHVzaCg8SXRlbT5kb2NTbmFwLmRhdGEoKSkpO1xyXG4gICAgICAgICAgc3Vic2NyaWJlci5uZXh0KHRoaXMuaXRlbXMpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICB9KTtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIGZpcmVzdG9yZVdoZXJlRXZlcnlvbmUoKTogdm9pZCB7XHJcbiAgICB0aGlzLm15SXRlbXMkID0gT2JzZXJ2YWJsZS5jcmVhdGUoc3Vic2NyaWJlciA9PiB7XHJcbiAgICAgY29uc3QgcXVlcnk6IGZpcmVzdG9yZS5RdWVyeSA9IGZpcmViYXNlLmZpcmVzdG9yZSgpLmNvbGxlY3Rpb24oXCJpdGVtc1wiKVxyXG4gICAgICAgIC53aGVyZShcInBlcm1pc3Npb25zXCIsIFwiPT1cIiwgdGhpcy5xdWVyeSk7XHJcbiAgICBxdWVyeVxyXG4gICAgICAgIC5nZXQoKVxyXG4gICAgICAgIC50aGVuKChxdWVyeVNuYXBzaG90OiBmaXJlc3RvcmUuUXVlcnlTbmFwc2hvdCkgPT4ge1xyXG4gICAgICAgICAgcXVlcnlTbmFwc2hvdC5mb3JFYWNoKGRvYyA9PiB7XHJcblxyXG4gICAgICAgICAgICB0aGlzLml0ZW1zID0gW107XHJcbiAgICAgICAgICAgIHF1ZXJ5U25hcHNob3QuZm9yRWFjaChkb2NTbmFwID0+IHRoaXMuaXRlbXMucHVzaCg8SXRlbT5kb2NTbmFwLmRhdGEoKSkpO1xyXG4gICAgICAgICAgICBzdWJzY3JpYmVyLm5leHQodGhpcy5pdGVtcyk7XHJcblxyXG4gICAgICAgICAgICAvL2NvbnNvbGUubG9nKGBEZW50aXN0IFBlcm1pc3Npb25zOiAke2RvYy5pZH0gPT4gJHtKU09OLnN0cmluZ2lmeShkb2MuZGF0YSgpKX1gKTtcclxuICAgICAgICAgICB9KTtcclxuICAgIH0pO1xyXG4gIH0pO1xyXG59XHJcbiAgXHJcbnB1YmxpYyBmaXJlc3RvcmVXaGVyZURlbnRpc3RzKCk6IHZvaWQge1xyXG4gICAgdGhpcy5teUl0ZW1zJCA9IE9ic2VydmFibGUuY3JlYXRlKHN1YnNjcmliZXIgPT4ge1xyXG4gICAgIGNvbnN0IHF1ZXJ5OiBmaXJlc3RvcmUuUXVlcnkgPSBmaXJlYmFzZS5maXJlc3RvcmUoKS5jb2xsZWN0aW9uKFwiaXRlbXNcIilcclxuICAgICAgICAud2hlcmUoXCJwZXJtaXNzaW9uc1wiLCBcIj09XCIsIHRoaXMucXVlcnkpO1xyXG4gICAgcXVlcnlcclxuICAgICAgICAuZ2V0KClcclxuICAgICAgICAudGhlbigocXVlcnlTbmFwc2hvdDogZmlyZXN0b3JlLlF1ZXJ5U25hcHNob3QpID0+IHtcclxuICAgICAgICAgIHF1ZXJ5U25hcHNob3QuZm9yRWFjaChkb2MgPT4ge1xyXG5cclxuICAgICAgICAgICAgdGhpcy5pdGVtcyA9IFtdO1xyXG4gICAgICAgICAgICBxdWVyeVNuYXBzaG90LmZvckVhY2goZG9jU25hcCA9PiB0aGlzLml0ZW1zLnB1c2goPEl0ZW0+ZG9jU25hcC5kYXRhKCkpKTtcclxuICAgICAgICAgICAgc3Vic2NyaWJlci5uZXh0KHRoaXMuaXRlbXMpO1xyXG4gICAgICAgICAgICAvL2NvbnNvbGUubG9nKGBEZW50aXN0IFBlcm1pc3Npb25zOiAke2RvYy5pZH0gPT4gJHtKU09OLnN0cmluZ2lmeShkb2MuZGF0YSgpKX1gKTtcclxuICAgICAgICAgICB9KTtcclxuICAgIH0pO1xyXG4gIH0pO1xyXG59XHJcblxyXG5cclxuXHJcblxyXG5cclxufVxyXG4iXX0=