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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFicy5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJ0YWJzLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUF1RDtBQUd2RCxtREFBa0Q7QUFDbEQsNkNBQTJDO0FBQzNDLHNDQUEyQztBQUUzQywwRUFBd0U7QUFDeEUsa0NBQWUsQ0FBQyxlQUFlLEVBQUUsY0FBTSxPQUFBLE9BQU8sQ0FBQyw0QkFBNEIsQ0FBQyxDQUFDLGFBQWEsRUFBbkQsQ0FBbUQsQ0FBQyxDQUFDO0FBRTVGLDZFQUF5RTtBQUN6RSwwQ0FBaUU7QUFDakUsMENBQXVDO0FBQ3ZDLHNEQUF3RDtBQUN4RCxJQUFNLE9BQU8sR0FBRyxPQUFPLENBQUMsVUFBVSxDQUFDLENBQUMsT0FBTyxDQUFDO0FBRTVDLGdGQUFnRjtBQUNoRixrQ0FBZSxDQUFDLFNBQVMsRUFBRSxjQUFNLE9BQUEsT0FBTyxDQUFDLDhCQUE4QixDQUFDLENBQUMsT0FBTyxFQUEvQyxDQUErQyxDQUFDLENBQUM7QUFFbEYsVUFBVTtBQUNWLDhDQUE2QztBQUU3QyxJQUFNLFFBQVEsR0FBRyxPQUFPLENBQUMsa0NBQWtDLENBQUMsQ0FBQztBQUM3RCxJQUFNLFdBQVcsR0FBRyxPQUFPLENBQUMsOEJBQThCLENBQUMsQ0FBQztBQUM1RCxJQUFNLGNBQWMsR0FBRyxPQUFPLENBQUMsa0NBQWtDLENBQUMsQ0FBQztBQUNuRSxJQUFNLE1BQU0sR0FBRyxPQUFPLENBQUMscUJBQXFCLENBQUMsQ0FBQztBQXdCOUM7SUFlRSx1QkFBb0IsSUFBWSxFQUFVLEtBQXFCLEVBQVUsTUFBYztRQUF2RixpQkFJQztRQUptQixTQUFJLEdBQUosSUFBSSxDQUFRO1FBQVUsVUFBSyxHQUFMLEtBQUssQ0FBZ0I7UUFBVSxXQUFNLEdBQU4sTUFBTSxDQUFRO1FBUi9FLFVBQUssR0FBZ0IsRUFBRSxDQUFDO1FBQ3pCLGVBQVUsR0FBRyxPQUFPLENBQUM7UUFrQjlCLGFBQVEsR0FBSSxP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QyxDQUFDLFFBQVEsQ0FBQyxFQUFFLGdCQUFnQixDQUFDLENBQUM7UUFDakQsT0FBTyxDQUFDLEdBQUcsQ0FBQyxZQUFZLENBQUMsQ0FBQztRQUMxQixxQ0FBcUM7SUFDdkMsQ0FBQztJQW5PWSxhQUFhO1FBUHpCLGdCQUFTLENBQUM7WUFDVCxRQUFRLEVBQUUsTUFBTTtZQUNoQixXQUFXLEVBQUUsNEJBQTRCO1lBQ3pDLFNBQVMsRUFBQyxDQUFDLDJCQUEyQixDQUFDO1NBQ3hDLENBQUM7UUFFRCxpQkFBVSxFQUFFO3lDQWdCZSxhQUFNLEVBQWlCLHVCQUFjLEVBQWtCLGVBQU07T0FmNUUsYUFBYSxDQXVPekI7SUFBRCxvQkFBQztDQUFBLEFBdk9ELElBdU9DO0FBdk9ZLHNDQUFhIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtDb21wb25lbnQsT25Jbml0LE5nWm9uZSB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5pbXBvcnQgKiBhcyBsaXN0Vmlld01vZHVsZSBmcm9tIFwidG5zLWNvcmUtbW9kdWxlcy91aS9saXN0LXZpZXdcIjtcbmltcG9ydCAqIGFzIEltYWdlTW9kdWxlIGZyb20gXCJ0bnMtY29yZS1tb2R1bGVzL3VpL2ltYWdlXCI7XG5pbXBvcnQgeyBJbWFnZSB9IGZyb20gXCJ0bnMtY29yZS1tb2R1bGVzL3VpL2ltYWdlXCI7XG5pbXBvcnQgeyBJbWFnZVNvdXJjZSB9IGZyb20gXCJpbWFnZS1zb3VyY2VcIjtcbmltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuaW1wb3J0IHsgSW5mb30gZnJvbSAnLi9pbmZvJztcbmltcG9ydCB7IHJlZ2lzdGVyRWxlbWVudCB9IGZyb20gXCJuYXRpdmVzY3JpcHQtYW5ndWxhci9lbGVtZW50LXJlZ2lzdHJ5XCI7XG5yZWdpc3RlckVsZW1lbnQoXCJQdWxsVG9SZWZyZXNoXCIsICgpID0+IHJlcXVpcmUoXCJuYXRpdmVzY3JpcHQtcHVsbHRvcmVmcmVzaFwiKS5QdWxsVG9SZWZyZXNoKTtcbmltcG9ydCB7RWxlbWVudFJlZiwgVmlld0NoaWxkfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE1hcFZpZXcsIE1hcmtlciwgUG9zaXRpb24gfSBmcm9tICduYXRpdmVzY3JpcHQtZ29vZ2xlLW1hcHMtc2RrJztcbmltcG9ydCB7QWN0aXZhdGVkUm91dGUsIE5hdmlnYXRpb25FeHRyYXN9IGZyb20gXCJAYW5ndWxhci9yb3V0ZXJcIjtcbmltcG9ydCB7Um91dGVyfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xuaW1wb3J0ICogYXMgR2VvbG9jYXRpb24gZnJvbSBcIm5hdGl2ZXNjcmlwdC1nZW9sb2NhdGlvblwiO1xuY29uc3QgdG9wbW9zdCA9IHJlcXVpcmUoXCJ1aS9mcmFtZVwiKS50b3Btb3N0O1xuXG4vLyBJbXBvcnRhbnQgLSBtdXN0IHJlZ2lzdGVyIE1hcFZpZXcgcGx1Z2luIGluIG9yZGVyIHRvIHVzZSBpbiBBbmd1bGFyIHRlbXBsYXRlc1xucmVnaXN0ZXJFbGVtZW50KFwiTWFwVmlld1wiLCAoKSA9PiByZXF1aXJlKFwibmF0aXZlc2NyaXB0LWdvb2dsZS1tYXBzLXNka1wiKS5NYXBWaWV3KTtcblxuLy9maXJlYmFzZVxuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gXCJyeGpzL09ic2VydmFibGVcIjtcbmltcG9ydCB7IGZpcmVzdG9yZSB9IGZyb20gXCJuYXRpdmVzY3JpcHQtcGx1Z2luLWZpcmViYXNlXCI7XG5jb25zdCBmaXJlYmFzZSA9IHJlcXVpcmUoXCJuYXRpdmVzY3JpcHQtcGx1Z2luLWZpcmViYXNlL2FwcFwiKTtcbmNvbnN0IGZpcmViYXNlRkNNID0gcmVxdWlyZShcIm5hdGl2ZXNjcmlwdC1wbHVnaW4tZmlyZWJhc2VcIik7XG5jb25zdCBmaXJlYmFzZVdlYkFwaSA9IHJlcXVpcmUoXCJuYXRpdmVzY3JpcHQtcGx1Z2luLWZpcmViYXNlL2FwcFwiKTtcbmNvbnN0IE1hcEJveCA9IHJlcXVpcmUoXCJuYXRpdmVzY3JpcHQtbWFwYm94XCIpO1xuXG4vL2l0ZW1zXG5cbmV4cG9ydCBpbnRlcmZhY2UgSXRlbXtcbiAgaWQ6c3RyaW5nO1xuICB0aXRsZTpzdHJpbmc7XG4gIGRlc2NyaXB0aW9uOnN0cmluZztcbiAgYWRtaW5wb3N0ZWQ6c3RyaW5nO1xuICBwZXJtaXNzaW9uczpzdHJpbmc7XG4gIHRpbWU6c3RyaW5nO1xuICBkYXRhdHlwZTpzdHJpbmc7XG4gIHVybDogc3RyaW5nO1xuICBuYW1lOiBzdHJpbmc7XG59XG5cblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiBcInRhYnNcIixcbiAgdGVtcGxhdGVVcmw6IFwiLi90YWJzL3RhYnMuY29tcG9uZW50Lmh0bWxcIixcbiAgc3R5bGVVcmxzOltcIi4vdGFicy90YWJzLmNvbXBvbmVudC5jc3NcIl1cbn0pXG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyB0YWJzQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcblxuXG4gIC8vaXRlbSBmcm9tIGNvbGxlY3Rpb24gXG4gIHB1YmxpYyBteUl0ZW0kOiBPYnNlcnZhYmxlPEl0ZW0+O1xuICBwdWJsaWMgbXlJdGVtcyQ6IE9ic2VydmFibGU8QXJyYXk8SXRlbT4+O1xuICBwcml2YXRlIGl0ZW06IEl0ZW07XG4gIHByaXZhdGUgaXRlbXM6IEFycmF5PEl0ZW0+ID0gW107XG4gIHB1YmxpYyBhdXRvVXBkYXRlID0gXCJGYWxzZVwiO1xuXG4gXG5cblxuICBwdWJsaWMgcXVlcnk6IHN0cmluZztcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIHpvbmU6IE5nWm9uZSwgcHJpdmF0ZSByb3V0ZTogQWN0aXZhdGVkUm91dGUsIHByaXZhdGUgcm91dGVyOiBSb3V0ZXIpIHtcbiAgICB0aGlzLnJvdXRlLnF1ZXJ5UGFyYW1zLnN1YnNjcmliZShwYXJhbXMgPT4ge1xuICAgICAgICAgICAgdGhpcy5xdWVyeSA9IHBhcmFtc1tcInF1ZXJ5XCJdO1xuICAgICAgICB9KTtcbiAgfVxuXG4gIHNob3coKXtcbiAgICBhbGVydCh0aGlzLnF1ZXJ5KTtcbiAgfVxuXG5cbmxhdGl0dWRlID0gIDQ5LjkyOTg7XG5sb25naXR1ZGUgPSAtMTE5LjM5Njg7XG56b29tID0gMTI7XG5iZWFyaW5nID0gMDtcbnRpbHQgPSAwO1xucGFkZGluZyA9IFs0MCwgNDAsIDQwLCA0MF07XG5tYXBWaWV3OiBNYXBWaWV3O1xucHVibGljIGN1cnJlbnRHZW9Mb2NhdGlvbiA9IG51bGw7XG5sYXN0Q2FtZXJhOiBTdHJpbmc7XG5cbnByaXZhdGUgd2F0Y2hJZDogbnVtYmVyO1xuXG4vL01hcCBldmVudHNcbm9uTWFwUmVhZHkoZXZlbnQpIHtcbiAgICBjb25zb2xlLmxvZygnTWFwIFJlYWR5Jyk7XG5cbiAgICB0aGlzLm1hcFZpZXcgPSBldmVudC5vYmplY3Q7XG5cbiAgICBjb25zb2xlLmxvZyhcIlNldHRpbmcgYSBtYXJrZXIuLi5cIik7XG4gICAgdmFyIG1hcmtlciA9IG5ldyBNYXJrZXIoKTtcbiAgICBtYXJrZXIucG9zaXRpb24gPSBQb3NpdGlvbi5wb3NpdGlvbkZyb21MYXRMbmcoNDkuOTIyMzYxOSwtMTE5LjM5NzE5MjcpO1xuICAgIG1hcmtlci50aXRsZSA9IFwiS2Vsb3duYVwiO1xuICAgIG1hcmtlci5zbmlwcGV0ID0gXCJQZXJmaXQgRGVudGFsXCI7XG4gICAgbWFya2VyLnVzZXJEYXRhID0ge2luZGV4OiAxfTtcbiAgICB2YXIgbWFya2VyMiA9IG5ldyBNYXJrZXIoKTtcbiAgICBtYXJrZXIyLnBvc2l0aW9uPVBvc2l0aW9uLnBvc2l0aW9uRnJvbUxhdExuZyh0aGlzLmxhdGl0dWRlLCB0aGlzLmxvbmdpdHVkZSk7XG4gICAgbWFya2VyMi50aXRsZT1cIlVuaXZlcnNpdHkgb2YgQnJpdGlzaCBDb2x1bWJpYVwiO1xuICAgIG1hcmtlcjIuc25pcHBldCA9IFwiS2Vsb3duYVwiO1xuICAgIG1hcmtlcjIudXNlckRhdGEgPSB7aW5kZXg6Mn07XG4gICAgXG4gICAgXG4gICAgIC8vIGNoZWNrIGlmIGdlb2xvY2F0aW9uIGlzIG5vdCBlbmFibGVkXG4gICAgICAgIEdlb2xvY2F0aW9uLmVuYWJsZUxvY2F0aW9uUmVxdWVzdCgpOyAvLyByZXF1ZXN0IGZvciB0aGUgdXNlciB0byBlbmFibGUgaXRcbiAgICAgIFxuICAgIHRoaXMubWFwVmlldy5hZGRNYXJrZXIobWFya2VyKTtcbiAgICB0aGlzLm1hcFZpZXcuYWRkTWFya2VyKG1hcmtlcjIpO1xuXG5cbn1cbnByaXZhdGUgZ2V0RGV2aWNlTG9jYXRpb24oKTogUHJvbWlzZTxhbnk+IHtcbiAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIEdlb2xvY2F0aW9uLmVuYWJsZUxvY2F0aW9uUmVxdWVzdCgpLnRoZW4oKCkgPT4ge1xuICAgICAgICAgIEdlb2xvY2F0aW9uLmdldEN1cnJlbnRMb2NhdGlvbih7dGltZW91dDogMTAwMDB9KS50aGVuKGxvY2F0aW9uID0+IHtcbiAgICAgICAgICAgICAgcmVzb2x2ZShsb2NhdGlvbik7XG4gICAgICAgICAgfSkuY2F0Y2goZXJyb3IgPT4ge1xuICAgICAgICAgICAgICByZWplY3QoZXJyb3IpO1xuICAgICAgICAgIH0pO1xuICAgICAgfSk7XG4gIH0pO1xufVxuXG5wdWJsaWMgdXBkYXRlTG9jYXRpb24oKSB7XG4gIFxuICB0aGlzLmdldERldmljZUxvY2F0aW9uKCkudGhlbihyZXN1bHQgPT4ge1xuICAgICAgdGhpcy5sYXRpdHVkZSA9IHJlc3VsdC5sYXRpdHVkZTtcbiAgICAgIHRoaXMubG9uZ2l0dWRlID0gcmVzdWx0LmxvbmdpdHVkZTtcbiAgICAgICAgICAgXG4gIH0sIGVycm9yID0+IHtcbiAgICAgIGNvbnNvbGUuZXJyb3IoZXJyb3IpO1xuICB9KTtcbn1cblxucHVibGljIHN0YXJ0V2F0Y2hpbmdMb2NhdGlvbigpIHtcbiAgR2VvbG9jYXRpb24uZW5hYmxlTG9jYXRpb25SZXF1ZXN0KCk7IC8vIHJlcXVlc3QgZm9yIHRoZSB1c2VyIHRvIGVuYWJsZSBpdFxuICB0aGlzLndhdGNoSWQgPSBHZW9sb2NhdGlvbi53YXRjaExvY2F0aW9uKGxvY2F0aW9uID0+IHtcbiAgICAgIGlmKGxvY2F0aW9uKSB7XG4gICAgICAgICAgdGhpcy56b25lLnJ1bigoKSA9PiB7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgICAgdGhpcy5sYXRpdHVkZSA9IGxvY2F0aW9uLmxhdGl0dWRlO1xuICAgICAgICAgICAgICB0aGlzLmxvbmdpdHVkZSA9IGxvY2F0aW9uLmxvbmdpdHVkZTtcbiAgICAgICAgICAgICAgY29uc29sZS5sb2codGhpcy5sYXRpdHVkZSk7XG4gICAgICAgICAgICAgIGNvbnNvbGUubG9nKHRoaXMubG9uZ2l0dWRlKTtcbiAgICAgICAgICAgICAgdmFyIG1hcmtlcjMgPSBuZXcgTWFya2VyKCk7XG4gICAgICAgICAgICAgIG1hcmtlcjMucG9zaXRpb249UG9zaXRpb24ucG9zaXRpb25Gcm9tTGF0TG5nKHRoaXMubGF0aXR1ZGUsIHRoaXMubG9uZ2l0dWRlKTtcbiAgICAgICAgICAgICAgbWFya2VyMy50aXRsZT1cIllvdXIgbG9jYXRpb25cIjtcbiAgICAgICAgICAgICAgbWFya2VyMy5zbmlwcGV0ID0gdGhpcy5sYXRpdHVkZS50b1N0cmluZygpICsgXCIsXCIgKyB0aGlzLmxvbmdpdHVkZS50b1N0cmluZygpO1xuICAgICAgICAgICAgICBtYXJrZXIzLnVzZXJEYXRhID0ge2luZGV4OjJ9O1xuXG4gICAgICAgICAgICAgIGxldCBpbWdTcmMgPSBuZXcgSW1hZ2VTb3VyY2UoKTtcbiAgICAgICAgICAgICAgaW1nU3JjLmZyb21GaWxlKFwifi9pbWFnZXMvbG9jYXRpb24ucG5nXCIpO1xuICAgICAgXG4gICAgICAgICAgICAgIGxldCBpbWFnZSA9IG5ldyBJbWFnZSgpO1xuICAgICAgICAgICAgICBpbWFnZS5pbWFnZVNvdXJjZSA9IGltZ1NyYztcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgICBtYXJrZXIzLmljb24gPSBpbWFnZTtcbiAgICAgICAgICAgICAgdGhpcy5tYXBWaWV3LmFkZE1hcmtlcihtYXJrZXIzKTtcbiAgICAgICAgICAgICAgXG4gICAgICAgICAgfSk7XG4gICAgICB9XG4gIH0sIGVycm9yID0+IHtcbiAgICAgIGNvbnNvbGUubG9nKGVycm9yKTtcbiAgfSwgeyB1cGRhdGVEaXN0YW5jZTogMSwgbWluaW11bVVwZGF0ZVRpbWU6IDEwMDAgfSk7XG59XG5cbnB1YmxpYyBzdG9wV2F0Y2hpbmdMb2NhdGlvbigpIHtcbiAgaWYodGhpcy53YXRjaElkKSB7XG4gICAgICBHZW9sb2NhdGlvbi5jbGVhcldhdGNoKHRoaXMud2F0Y2hJZCk7XG4gICAgICB0aGlzLndhdGNoSWQgPSBudWxsO1xuICB9XG59XG5vbkNvb3JkaW5hdGVUYXBwZWQoYXJncykge1xuICAgIGNvbnNvbGUubG9nKFwiQ29vcmRpbmF0ZSBUYXBwZWQsIExhdDogXCIgKyBhcmdzLnBvc2l0aW9uLmxhdGl0dWRlICsgXCIsIExvbjogXCIgKyBhcmdzLnBvc2l0aW9uLmxvbmdpdHVkZSwgYXJncyk7XG59XG5cbm9uTWFya2VyRXZlbnQoYXJncykge1xuICAgIGNvbnNvbGUubG9nKFwiTWFya2VyIEV2ZW50OiAnXCIgKyBhcmdzLmV2ZW50TmFtZVxuICAgICAgICArIFwiJyB0cmlnZ2VyZWQgb246IFwiICsgYXJncy5tYXJrZXIudGl0bGVcbiAgICAgICAgKyBcIiwgTGF0OiBcIiArIGFyZ3MubWFya2VyLnBvc2l0aW9uLmxhdGl0dWRlICsgXCIsIExvbjogXCIgKyBhcmdzLm1hcmtlci5wb3NpdGlvbi5sb25naXR1ZGUsIGFyZ3MpO1xufVxuXG5vbkNhbWVyYUNoYW5nZWQoYXJncykge1xuICAgIGNvbnNvbGUubG9nKFwiQ2FtZXJhIGNoYW5nZWQ6IFwiICsgSlNPTi5zdHJpbmdpZnkoYXJncy5jYW1lcmEpLCBKU09OLnN0cmluZ2lmeShhcmdzLmNhbWVyYSkgPT09IHRoaXMubGFzdENhbWVyYSk7XG4gICAgdGhpcy5sYXN0Q2FtZXJhID0gSlNPTi5zdHJpbmdpZnkoYXJncy5jYW1lcmEpO1xufVxuICAvLyBpbml0aWFsaXplIHRoZSBmaXJlYmFzZSBjb25uZWN0aW9uXG4gIC8vIGdldCBkYXRhIGZyb20gZmlyZXN0b3JlXG4gIG5nT25Jbml0KCk6IHZvaWQge1xuXG4gICAgZmlyZWJhc2VGQ00uYWRkT25NZXNzYWdlUmVjZWl2ZWRDYWxsYmFjayhcbiAgICAgIChtZXNzYWdlKSA9PiB7XG4gICAgICAgIGNvbnNvbGUubG9nKFwiVXBkYXRlIFZJQSBCYWNrZ3JvdW5kIFB1c2ggTm90aWZpY2F0aW9uXCIpICAgICAgICBcbiAgICAgICAgdGhpcy56b25lLnJ1bigoKSA9PiB7IC8vIDw9PSBhZGRlZFxuICAgICAgICAgIHRoaXMuZmlyZXN0b3JlQ29sbGVjdGlvbk9ic2VydmFibGUoKTsgXG4gICAgICB9KTtcbiAgICAgICAgXG4gICAgICB9XG4gICAgKTtcblxuICAgIGZpcmViYXNlLmluaXRpYWxpemVBcHAoe1xuICAgICAgcGVyc2lzdDogZmFsc2VcbiAgICB9KS50aGVuKCgpID0+IHtcbiAgICAgIGNvbnNvbGUubG9nKFwiRmlyZWJhc2UgaW5pdGlhbGl6ZWRcIik7XG4gICAgfSk7XG4gICAgIC8vdGhpcy5maXJlc3RvcmVDb2xsZWN0aW9uT2JzZXJ2YWJsZSgpO1xuICB9XG5cblxuICBwdWJsaWMgZmlyZXN0b3JlQ29sbGVjdGlvbk9ic2VydmFibGUoKTogdm9pZCB7XG4gICAgY29uc29sZS5sb2coXCJGdW5jdGlvbiBDYWxsZWQ6IGZpcmVzdG9yZUNvbGxlY3Rpb25PYnNlcnZhYmxlKClcIik7XG4gICAgdGhpcy5teUl0ZW1zJCA9IE9ic2VydmFibGUuY3JlYXRlKHN1YnNjcmliZXIgPT4ge1xuICAgICAgY29uc3QgY29sUmVmOiBmaXJlc3RvcmUuQ29sbGVjdGlvblJlZmVyZW5jZSA9IGZpcmViYXNlLmZpcmVzdG9yZSgpLmNvbGxlY3Rpb24oXCJpdGVtc1wiKTtcbiAgICAgIGNvbFJlZi5vblNuYXBzaG90KChzbmFwc2hvdDogZmlyZXN0b3JlLlF1ZXJ5U25hcHNob3QpID0+IHtcbiAgICAgICAgdGhpcy56b25lLnJ1bigoKSA9PiB7XG4gICAgICAgICAgdGhpcy5pdGVtcyA9IFtdO1xuICAgICAgICAgIHNuYXBzaG90LmZvckVhY2goZG9jU25hcCA9PiB0aGlzLml0ZW1zLnB1c2goPEl0ZW0+ZG9jU25hcC5kYXRhKCkpKTtcbiAgICAgICAgICBzdWJzY3JpYmVyLm5leHQodGhpcy5pdGVtcyk7XG4gICAgICAgIH0pO1xuICAgICAgfSk7XG4gICAgfSk7XG4gIH1cblxuICBwdWJsaWMgZmlyZXN0b3JlV2hlcmVFdmVyeW9uZSgpOiB2b2lkIHtcbiAgICB0aGlzLm15SXRlbXMkID0gT2JzZXJ2YWJsZS5jcmVhdGUoc3Vic2NyaWJlciA9PiB7XG4gICAgIGNvbnN0IHF1ZXJ5OiBmaXJlc3RvcmUuUXVlcnkgPSBmaXJlYmFzZS5maXJlc3RvcmUoKS5jb2xsZWN0aW9uKFwiaXRlbXNcIilcbiAgICAgICAgLndoZXJlKFwicGVybWlzc2lvbnNcIiwgXCI9PVwiLCB0aGlzLnF1ZXJ5KTtcbiAgICBxdWVyeVxuICAgICAgICAuZ2V0KClcbiAgICAgICAgLnRoZW4oKHF1ZXJ5U25hcHNob3Q6IGZpcmVzdG9yZS5RdWVyeVNuYXBzaG90KSA9PiB7XG4gICAgICAgICAgcXVlcnlTbmFwc2hvdC5mb3JFYWNoKGRvYyA9PiB7XG5cbiAgICAgICAgICAgIHRoaXMuaXRlbXMgPSBbXTtcbiAgICAgICAgICAgIHF1ZXJ5U25hcHNob3QuZm9yRWFjaChkb2NTbmFwID0+IHRoaXMuaXRlbXMucHVzaCg8SXRlbT5kb2NTbmFwLmRhdGEoKSkpO1xuICAgICAgICAgICAgc3Vic2NyaWJlci5uZXh0KHRoaXMuaXRlbXMpO1xuXG4gICAgICAgICAgICAvL2NvbnNvbGUubG9nKGBEZW50aXN0IFBlcm1pc3Npb25zOiAke2RvYy5pZH0gPT4gJHtKU09OLnN0cmluZ2lmeShkb2MuZGF0YSgpKX1gKTtcbiAgICAgICAgICAgfSk7XG4gICAgfSk7XG4gIH0pO1xufVxuICBcbnB1YmxpYyBmaXJlc3RvcmVXaGVyZURlbnRpc3RzKCk6IHZvaWQge1xuICAgIHRoaXMubXlJdGVtcyQgPSBPYnNlcnZhYmxlLmNyZWF0ZShzdWJzY3JpYmVyID0+IHtcbiAgICAgY29uc3QgcXVlcnk6IGZpcmVzdG9yZS5RdWVyeSA9IGZpcmViYXNlLmZpcmVzdG9yZSgpLmNvbGxlY3Rpb24oXCJpdGVtc1wiKVxuICAgICAgICAud2hlcmUoXCJwZXJtaXNzaW9uc1wiLCBcIj09XCIsIHRoaXMucXVlcnkpO1xuICAgIHF1ZXJ5XG4gICAgICAgIC5nZXQoKVxuICAgICAgICAudGhlbigocXVlcnlTbmFwc2hvdDogZmlyZXN0b3JlLlF1ZXJ5U25hcHNob3QpID0+IHtcbiAgICAgICAgICBxdWVyeVNuYXBzaG90LmZvckVhY2goZG9jID0+IHtcblxuICAgICAgICAgICAgdGhpcy5pdGVtcyA9IFtdO1xuICAgICAgICAgICAgcXVlcnlTbmFwc2hvdC5mb3JFYWNoKGRvY1NuYXAgPT4gdGhpcy5pdGVtcy5wdXNoKDxJdGVtPmRvY1NuYXAuZGF0YSgpKSk7XG4gICAgICAgICAgICBzdWJzY3JpYmVyLm5leHQodGhpcy5pdGVtcyk7XG4gICAgICAgICAgIC8vIGNvbnNvbGUubG9nKGBEZW50aXN0IFBlcm1pc3Npb25zOiAke2RvYy5pZH0gPT4gJHtKU09OLnN0cmluZ2lmeShkb2MuZGF0YSgpKX1gKTtcbiAgICAgICAgICAgfSk7XG4gICAgfSk7XG4gIH0pO1xufVxuXG5cblxudmlld0RldGFpbCh0aXRsZTogc3RyaW5nKXtcbiAgY29uc29sZS5sb2coXCJjbGlja2luZyB2aWV3IGRldGFpbFwiICsgdGl0bGUpO1xuXG5sZXQgbmF2aWdhdGlvbkV4dHJhczogTmF2aWdhdGlvbkV4dHJhcyA9IHtcbiAgcXVlcnlQYXJhbXM6IHtcbiAgICAgIFwiVGl0bGVcIjogdGl0bGUsXG4gIH1cbn07XG50aGlzLnJvdXRlci5uYXZpZ2F0ZShbXCJkZXRhaWxcIl0sIG5hdmlnYXRpb25FeHRyYXMpO1xuICBjb25zb2xlLmxvZyhcIm5hdmlnYXRpbmdcIik7XG4gIC8vIHRoaXMucm91dGVyLm5hdmlnYXRlKFtcIi9kZXRhaWxcIl0pO1xufVxuXG5cblxufVxuIl19