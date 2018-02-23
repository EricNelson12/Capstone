"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var image_1 = require("tns-core-modules/ui/image");
var image_source_1 = require("image-source");
var element_registry_1 = require("nativescript-angular/element-registry");
var nativescript_google_maps_sdk_1 = require("nativescript-google-maps-sdk");
var router_1 = require("@angular/router");
var Geolocation = require("nativescript-geolocation");
var router_2 = require("@angular/router");
// Important - must register MapView plugin in order to use in Angular templates
element_registry_1.registerElement("MapView", function () { return require("nativescript-google-maps-sdk").MapView; });
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
                    //console.log(`Dentist Permissions: ${doc.id} => ${JSON.stringify(doc.data())}`);
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
        __metadata("design:paramtypes", [core_1.NgZone, router_1.ActivatedRoute, router_2.Router])
    ], tabsComponent);
    return tabsComponent;
}());
exports.tabsComponent = tabsComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFicy5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJ0YWJzLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUF1RDtBQUd2RCxtREFBa0Q7QUFDbEQsNkNBQTJDO0FBRTNDLDBFQUF3RTtBQUV4RSw2RUFBeUU7QUFDekUsMENBQStDO0FBQy9DLHNEQUF3RDtBQUN4RCwwQ0FBdUM7QUFHdkMsZ0ZBQWdGO0FBQ2hGLGtDQUFlLENBQUMsU0FBUyxFQUFFLGNBQU0sT0FBQSxPQUFPLENBQUMsOEJBQThCLENBQUMsQ0FBQyxPQUFPLEVBQS9DLENBQStDLENBQUMsQ0FBQztBQUNsRixrQ0FBZSxDQUFDLGFBQWEsRUFBRSxjQUFNLE9BQUEsT0FBTyxDQUFDLDBCQUEwQixDQUFDLENBQUMsS0FBSyxFQUF6QyxDQUF5QyxDQUFDLENBQUM7QUFJaEYsVUFBVTtBQUNWLDhDQUE2QztBQUU3QyxJQUFNLFFBQVEsR0FBRyxPQUFPLENBQUMsa0NBQWtDLENBQUMsQ0FBQztBQUM3RCxJQUFNLFdBQVcsR0FBRyxPQUFPLENBQUMsOEJBQThCLENBQUMsQ0FBQztBQUM1RCxJQUFNLGNBQWMsR0FBRyxPQUFPLENBQUMsa0NBQWtDLENBQUMsQ0FBQztBQUNuRSxJQUFNLE1BQU0sR0FBRyxPQUFPLENBQUMscUJBQXFCLENBQUMsQ0FBQztBQXNCOUM7SUFlRSx1QkFBb0IsSUFBWSxFQUFVLEtBQXFCLEVBQVUsTUFBYztRQUF2RixpQkFLQztRQUxtQixTQUFJLEdBQUosSUFBSSxDQUFRO1FBQVUsVUFBSyxHQUFMLEtBQUssQ0FBZ0I7UUFBVSxXQUFNLEdBQU4sTUFBTSxDQUFRO1FBSi9FLFVBQUssR0FBZ0IsRUFBRSxDQUFDO1FBcUNsQyxhQUFRLEdBQUksT0FBTyxDQUFDO1FBQ3BCLGNBQVMsR0FBRyxDQUFDLFFBQVEsQ0FBQztRQUN0QixTQUFJLEdBQUcsRUFBRSxDQUFDO1FBQ1YsWUFBTyxHQUFHLENBQUMsQ0FBQztRQUNaLFNBQUksR0FBRyxDQUFDLENBQUM7UUFDVCxZQUFPLEdBQUcsQ0FBQyxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLENBQUMsQ0FBQztRQUVwQix1QkFBa0IsR0FBRyxJQUFJLENBQUM7UUF0QzdCLElBQUksQ0FBQyxLQUFLLENBQUMsV0FBVyxDQUFDLFNBQVMsQ0FBQyxVQUFBLE1BQU07WUFDL0IsS0FBSSxDQUFDLEtBQUssR0FBRyxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDakMsQ0FBQyxDQUFDLENBQUM7SUFDVCxDQUFDO0lBR0QscUNBQXFDO0lBQ3JDLDBCQUEwQjtJQUMxQixnQ0FBUSxHQUFSO1FBQUEsaUJBa0JDO1FBaEJDLFdBQVcsQ0FBQyw0QkFBNEIsQ0FDdEMsVUFBQyxPQUFPO1lBQ04sT0FBTyxDQUFDLEdBQUcsQ0FBQyx5Q0FBeUMsQ0FBQyxDQUFBO1lBQ3RELEtBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDO2dCQUNaLEtBQUksQ0FBQyw2QkFBNkIsRUFBRSxDQUFDO1lBQ3pDLENBQUMsQ0FBQyxDQUFDO1FBRUgsQ0FBQyxDQUNGLENBQUM7UUFFRixRQUFRLENBQUMsYUFBYSxDQUFDO1lBQ3JCLE9BQU8sRUFBRSxLQUFLO1NBQ2YsQ0FBQyxDQUFDLElBQUksQ0FBQztZQUNOLE9BQU8sQ0FBQyxHQUFHLENBQUMsc0JBQXNCLENBQUMsQ0FBQztRQUN0QyxDQUFDLENBQUMsQ0FBQztRQUNGLElBQUksQ0FBQyw2QkFBNkIsRUFBRSxDQUFDO0lBQ3hDLENBQUM7SUFpQkgsWUFBWTtJQUNaLGtDQUFVLEdBQVYsVUFBVyxLQUFLO1FBQ1osT0FBTyxDQUFDLEdBQUcsQ0FBQyxXQUFXLENBQUMsQ0FBQztRQUV6QixJQUFJLENBQUMsT0FBTyxHQUFHLEtBQUssQ0FBQyxNQUFNLENBQUM7UUFFNUIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDO1FBQ25DLElBQUksTUFBTSxHQUFHLElBQUkscUNBQU0sRUFBRSxDQUFDO1FBQzFCLE1BQU0sQ0FBQyxRQUFRLEdBQUcsdUNBQVEsQ0FBQyxrQkFBa0IsQ0FBQyxVQUFVLEVBQUMsQ0FBQyxXQUFXLENBQUMsQ0FBQztRQUN2RSxNQUFNLENBQUMsS0FBSyxHQUFHLFNBQVMsQ0FBQztRQUN6QixNQUFNLENBQUMsT0FBTyxHQUFHLGVBQWUsQ0FBQztRQUNqQyxNQUFNLENBQUMsUUFBUSxHQUFHLEVBQUMsS0FBSyxFQUFFLENBQUMsRUFBQyxDQUFDO1FBQzdCLElBQUksT0FBTyxHQUFHLElBQUkscUNBQU0sRUFBRSxDQUFDO1FBQzNCLE9BQU8sQ0FBQyxRQUFRLEdBQUMsdUNBQVEsQ0FBQyxrQkFBa0IsQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUM1RSxPQUFPLENBQUMsS0FBSyxHQUFDLGdDQUFnQyxDQUFDO1FBQy9DLE9BQU8sQ0FBQyxPQUFPLEdBQUcsU0FBUyxDQUFDO1FBQzVCLE9BQU8sQ0FBQyxRQUFRLEdBQUcsRUFBQyxLQUFLLEVBQUMsQ0FBQyxFQUFDLENBQUM7UUFHNUIsc0NBQXNDO1FBQ25DLFdBQVcsQ0FBQyxxQkFBcUIsRUFBRSxDQUFDLENBQUMsb0NBQW9DO1FBRTdFLElBQUksQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQy9CLElBQUksQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBR3BDLENBQUM7SUFDTyx5Q0FBaUIsR0FBekI7UUFDRSxNQUFNLENBQUMsSUFBSSxPQUFPLENBQUMsVUFBQyxPQUFPLEVBQUUsTUFBTTtZQUMvQixXQUFXLENBQUMscUJBQXFCLEVBQUUsQ0FBQyxJQUFJLENBQUM7Z0JBQ3JDLFdBQVcsQ0FBQyxrQkFBa0IsQ0FBQyxFQUFDLE9BQU8sRUFBRSxLQUFLLEVBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFBLFFBQVE7b0JBQzFELE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQztnQkFDdEIsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLFVBQUEsS0FBSztvQkFDVixNQUFNLENBQUMsS0FBSyxDQUFDLENBQUM7Z0JBQ2xCLENBQUMsQ0FBQyxDQUFDO1lBQ1AsQ0FBQyxDQUFDLENBQUM7UUFDUCxDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7SUFFTSxzQ0FBYyxHQUFyQjtRQUFBLGlCQVNDO1FBUEMsSUFBSSxDQUFDLGlCQUFpQixFQUFFLENBQUMsSUFBSSxDQUFDLFVBQUEsTUFBTTtZQUNoQyxLQUFJLENBQUMsUUFBUSxHQUFHLE1BQU0sQ0FBQyxRQUFRLENBQUM7WUFDaEMsS0FBSSxDQUFDLFNBQVMsR0FBRyxNQUFNLENBQUMsU0FBUyxDQUFDO1FBRXRDLENBQUMsRUFBRSxVQUFBLEtBQUs7WUFDSixPQUFPLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ3pCLENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUVNLDZDQUFxQixHQUE1QjtRQUFBLGlCQThCQztRQTdCQyxXQUFXLENBQUMscUJBQXFCLEVBQUUsQ0FBQyxDQUFDLG9DQUFvQztRQUN6RSxJQUFJLENBQUMsT0FBTyxHQUFHLFdBQVcsQ0FBQyxhQUFhLENBQUMsVUFBQSxRQUFRO1lBQzdDLEVBQUUsQ0FBQSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7Z0JBQ1YsS0FBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUM7b0JBRVYsS0FBSSxDQUFDLFFBQVEsR0FBRyxRQUFRLENBQUMsUUFBUSxDQUFDO29CQUNsQyxLQUFJLENBQUMsU0FBUyxHQUFHLFFBQVEsQ0FBQyxTQUFTLENBQUM7b0JBQ3BDLE9BQU8sQ0FBQyxHQUFHLENBQUMsS0FBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO29CQUMzQixPQUFPLENBQUMsR0FBRyxDQUFDLEtBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztvQkFDNUIsSUFBSSxPQUFPLEdBQUcsSUFBSSxxQ0FBTSxFQUFFLENBQUM7b0JBQzNCLE9BQU8sQ0FBQyxRQUFRLEdBQUMsdUNBQVEsQ0FBQyxrQkFBa0IsQ0FBQyxLQUFJLENBQUMsUUFBUSxFQUFFLEtBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztvQkFDNUUsT0FBTyxDQUFDLEtBQUssR0FBQyxlQUFlLENBQUM7b0JBQzlCLE9BQU8sQ0FBQyxPQUFPLEdBQUcsS0FBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLEVBQUUsR0FBRyxHQUFHLEdBQUcsS0FBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRLEVBQUUsQ0FBQztvQkFDN0UsT0FBTyxDQUFDLFFBQVEsR0FBRyxFQUFDLEtBQUssRUFBQyxDQUFDLEVBQUMsQ0FBQztvQkFFN0IsSUFBSSxNQUFNLEdBQUcsSUFBSSwwQkFBVyxFQUFFLENBQUM7b0JBQy9CLE1BQU0sQ0FBQyxRQUFRLENBQUMsdUJBQXVCLENBQUMsQ0FBQztvQkFFekMsSUFBSSxLQUFLLEdBQUcsSUFBSSxhQUFLLEVBQUUsQ0FBQztvQkFDeEIsS0FBSyxDQUFDLFdBQVcsR0FBRyxNQUFNLENBQUM7b0JBRTNCLE9BQU8sQ0FBQyxJQUFJLEdBQUcsS0FBSyxDQUFDO29CQUNyQixLQUFJLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsQ0FBQztnQkFFcEMsQ0FBQyxDQUFDLENBQUM7WUFDUCxDQUFDO1FBQ0wsQ0FBQyxFQUFFLFVBQUEsS0FBSztZQUNKLE9BQU8sQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDdkIsQ0FBQyxFQUFFLEVBQUUsY0FBYyxFQUFFLENBQUMsRUFBRSxpQkFBaUIsRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDO0lBQ3JELENBQUM7SUFFTSw0Q0FBb0IsR0FBM0I7UUFDRSxFQUFFLENBQUEsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztZQUNkLFdBQVcsQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1lBQ3JDLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDO1FBQ3hCLENBQUM7SUFDSCxDQUFDO0lBQ0QsMENBQWtCLEdBQWxCLFVBQW1CLElBQUk7UUFDbkIsT0FBTyxDQUFDLEdBQUcsQ0FBQywwQkFBMEIsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsR0FBRyxTQUFTLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxTQUFTLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDakgsQ0FBQztJQUVELHFDQUFhLEdBQWIsVUFBYyxJQUFJO1FBQ2QsT0FBTyxDQUFDLEdBQUcsQ0FBQyxpQkFBaUIsR0FBRyxJQUFJLENBQUMsU0FBUztjQUN4QyxrQkFBa0IsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUs7Y0FDdEMsU0FBUyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLFFBQVEsR0FBRyxTQUFTLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsU0FBUyxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQ3hHLENBQUM7SUFFRCx1Q0FBZSxHQUFmLFVBQWdCLElBQUk7UUFDaEIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxrQkFBa0IsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7UUFDL0csSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUNsRCxDQUFDO0lBSVEscURBQTZCLEdBQXBDO1FBQUEsaUJBWUM7UUFYQyxPQUFPLENBQUMsR0FBRyxDQUFDLGtEQUFrRCxDQUFDLENBQUM7UUFDaEUsSUFBSSxDQUFDLFFBQVEsR0FBRyx1QkFBVSxDQUFDLE1BQU0sQ0FBQyxVQUFBLFVBQVU7WUFDMUMsSUFBTSxNQUFNLEdBQWtDLFFBQVEsQ0FBQyxTQUFTLEVBQUUsQ0FBQyxVQUFVLENBQUMsT0FBTyxDQUFDLENBQUM7WUFDdkYsTUFBTSxDQUFDLFVBQVUsQ0FBQyxVQUFDLFFBQWlDO2dCQUNsRCxLQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQztvQkFDWixLQUFJLENBQUMsS0FBSyxHQUFHLEVBQUUsQ0FBQztvQkFDaEIsUUFBUSxDQUFDLE9BQU8sQ0FBQyxVQUFBLE9BQU8sSUFBSSxPQUFBLEtBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFPLE9BQU8sQ0FBQyxJQUFJLEVBQUUsQ0FBQyxFQUFyQyxDQUFxQyxDQUFDLENBQUM7b0JBQ25FLFVBQVUsQ0FBQyxJQUFJLENBQUMsS0FBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO2dCQUM5QixDQUFDLENBQUMsQ0FBQztZQUNMLENBQUMsQ0FBQyxDQUFDO1FBQ0wsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDO0lBRU0sOENBQXNCLEdBQTdCO1FBQUEsaUJBaUJEO1FBaEJHLElBQUksQ0FBQyxRQUFRLEdBQUcsdUJBQVUsQ0FBQyxNQUFNLENBQUMsVUFBQSxVQUFVO1lBQzNDLElBQU0sS0FBSyxHQUFvQixRQUFRLENBQUMsU0FBUyxFQUFFLENBQUMsVUFBVSxDQUFDLE9BQU8sQ0FBQztpQkFDbkUsS0FBSyxDQUFDLGFBQWEsRUFBRSxJQUFJLEVBQUUsS0FBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQzVDLEtBQUs7aUJBQ0EsR0FBRyxFQUFFO2lCQUNMLElBQUksQ0FBQyxVQUFDLGFBQXNDO2dCQUMzQyxhQUFhLENBQUMsT0FBTyxDQUFDLFVBQUEsR0FBRztvQkFFdkIsS0FBSSxDQUFDLEtBQUssR0FBRyxFQUFFLENBQUM7b0JBQ2hCLGFBQWEsQ0FBQyxPQUFPLENBQUMsVUFBQSxPQUFPLElBQUksT0FBQSxLQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBTyxPQUFPLENBQUMsSUFBSSxFQUFFLENBQUMsRUFBckMsQ0FBcUMsQ0FBQyxDQUFDO29CQUN4RSxVQUFVLENBQUMsSUFBSSxDQUFDLEtBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztvQkFFNUIsaUZBQWlGO2dCQUNsRixDQUFDLENBQUMsQ0FBQztZQUNWLENBQUMsQ0FBQyxDQUFDO1FBQ0wsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDO0lBRU0sOENBQXNCLEdBQTdCO1FBQUEsaUJBZ0JDO1FBZkcsSUFBSSxDQUFDLFFBQVEsR0FBRyx1QkFBVSxDQUFDLE1BQU0sQ0FBQyxVQUFBLFVBQVU7WUFDM0MsSUFBTSxLQUFLLEdBQW9CLFFBQVEsQ0FBQyxTQUFTLEVBQUUsQ0FBQyxVQUFVLENBQUMsT0FBTyxDQUFDO2lCQUNuRSxLQUFLLENBQUMsYUFBYSxFQUFFLElBQUksRUFBRSxLQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDNUMsS0FBSztpQkFDQSxHQUFHLEVBQUU7aUJBQ0wsSUFBSSxDQUFDLFVBQUMsYUFBc0M7Z0JBQzNDLGFBQWEsQ0FBQyxPQUFPLENBQUMsVUFBQSxHQUFHO29CQUV2QixLQUFJLENBQUMsS0FBSyxHQUFHLEVBQUUsQ0FBQztvQkFDaEIsYUFBYSxDQUFDLE9BQU8sQ0FBQyxVQUFBLE9BQU8sSUFBSSxPQUFBLEtBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFPLE9BQU8sQ0FBQyxJQUFJLEVBQUUsQ0FBQyxFQUFyQyxDQUFxQyxDQUFDLENBQUM7b0JBQ3hFLFVBQVUsQ0FBQyxJQUFJLENBQUMsS0FBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO29CQUM1QixpRkFBaUY7Z0JBQ2xGLENBQUMsQ0FBQyxDQUFDO1lBQ1YsQ0FBQyxDQUFDLENBQUM7UUFDTCxDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7SUFFRCxrQ0FBVSxHQUFWLFVBQVcsS0FBYTtRQUN0QixPQUFPLENBQUMsR0FBRyxDQUFDLHNCQUFzQixHQUFHLEtBQUssQ0FBQyxDQUFDO1FBRTlDLElBQUksZ0JBQWdCLEdBQXFCO1lBQ3ZDLFdBQVcsRUFBRTtnQkFDVCxPQUFPLEVBQUUsS0FBSzthQUNqQjtTQUNGLENBQUM7UUFDRixJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxFQUFFLGdCQUFnQixDQUFDLENBQUM7UUFDakQsT0FBTyxDQUFDLEdBQUcsQ0FBQyxZQUFZLENBQUMsQ0FBQztRQUMxQixxQ0FBcUM7SUFDdkMsQ0FBQztJQW5PWSxhQUFhO1FBTHpCLGdCQUFTLENBQUM7WUFDVCxRQUFRLEVBQUUsTUFBTTtZQUNoQixXQUFXLEVBQUUsNEJBQTRCO1lBQ3pDLFNBQVMsRUFBQyxDQUFDLDJCQUEyQixDQUFDO1NBQ3hDLENBQUM7eUNBZ0IwQixhQUFNLEVBQWlCLHVCQUFjLEVBQWtCLGVBQU07T0FmNUUsYUFBYSxDQXVPekI7SUFBRCxvQkFBQztDQUFBLEFBdk9ELElBdU9DO0FBdk9ZLHNDQUFhIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtDb21wb25lbnQsT25Jbml0LE5nWm9uZSB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5pbXBvcnQgKiBhcyBsaXN0Vmlld01vZHVsZSBmcm9tIFwidG5zLWNvcmUtbW9kdWxlcy91aS9saXN0LXZpZXdcIjtcbmltcG9ydCAqIGFzIEltYWdlTW9kdWxlIGZyb20gXCJ0bnMtY29yZS1tb2R1bGVzL3VpL2ltYWdlXCI7XG5pbXBvcnQgeyBJbWFnZSB9IGZyb20gXCJ0bnMtY29yZS1tb2R1bGVzL3VpL2ltYWdlXCI7XG5pbXBvcnQgeyBJbWFnZVNvdXJjZSB9IGZyb20gXCJpbWFnZS1zb3VyY2VcIjtcbmltcG9ydCB7IEluZm99IGZyb20gJy4vaW5mbyc7XG5pbXBvcnQgeyByZWdpc3RlckVsZW1lbnQgfSBmcm9tIFwibmF0aXZlc2NyaXB0LWFuZ3VsYXIvZWxlbWVudC1yZWdpc3RyeVwiO1xuaW1wb3J0IHtFbGVtZW50UmVmLCBWaWV3Q2hpbGR9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgTWFwVmlldywgTWFya2VyLCBQb3NpdGlvbiB9IGZyb20gJ25hdGl2ZXNjcmlwdC1nb29nbGUtbWFwcy1zZGsnO1xuaW1wb3J0IHtBY3RpdmF0ZWRSb3V0ZX0gZnJvbSBcIkBhbmd1bGFyL3JvdXRlclwiO1xuaW1wb3J0ICogYXMgR2VvbG9jYXRpb24gZnJvbSBcIm5hdGl2ZXNjcmlwdC1nZW9sb2NhdGlvblwiO1xuaW1wb3J0IHtSb3V0ZXJ9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XG5cblxuLy8gSW1wb3J0YW50IC0gbXVzdCByZWdpc3RlciBNYXBWaWV3IHBsdWdpbiBpbiBvcmRlciB0byB1c2UgaW4gQW5ndWxhciB0ZW1wbGF0ZXNcbnJlZ2lzdGVyRWxlbWVudChcIk1hcFZpZXdcIiwgKCkgPT4gcmVxdWlyZShcIm5hdGl2ZXNjcmlwdC1nb29nbGUtbWFwcy1zZGtcIikuTWFwVmlldyk7XG5yZWdpc3RlckVsZW1lbnQoXCJWaWRlb1BsYXllclwiLCAoKSA9PiByZXF1aXJlKFwibmF0aXZlc2NyaXB0LXZpZGVvcGxheWVyXCIpLlZpZGVvKTtcblxuaW1wb3J0IHtOYXZpZ2F0aW9uRXh0cmFzfSBmcm9tIFwiQGFuZ3VsYXIvcm91dGVyXCI7XG5cbi8vZmlyZWJhc2VcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tIFwicnhqcy9PYnNlcnZhYmxlXCI7XG5pbXBvcnQgeyBmaXJlc3RvcmUgfSBmcm9tIFwibmF0aXZlc2NyaXB0LXBsdWdpbi1maXJlYmFzZVwiO1xuY29uc3QgZmlyZWJhc2UgPSByZXF1aXJlKFwibmF0aXZlc2NyaXB0LXBsdWdpbi1maXJlYmFzZS9hcHBcIik7XG5jb25zdCBmaXJlYmFzZUZDTSA9IHJlcXVpcmUoXCJuYXRpdmVzY3JpcHQtcGx1Z2luLWZpcmViYXNlXCIpO1xuY29uc3QgZmlyZWJhc2VXZWJBcGkgPSByZXF1aXJlKFwibmF0aXZlc2NyaXB0LXBsdWdpbi1maXJlYmFzZS9hcHBcIik7XG5jb25zdCBNYXBCb3ggPSByZXF1aXJlKFwibmF0aXZlc2NyaXB0LW1hcGJveFwiKTtcblxuLy9pdGVtc1xuXG5leHBvcnQgaW50ZXJmYWNlIEl0ZW17XG4gIGlkOnN0cmluZztcbiAgdGl0bGU6c3RyaW5nO1xuICBkZXNjcmlwdGlvbjpzdHJpbmc7XG4gIGFkbWlucG9zdGVkOnN0cmluZztcbiAgcGVybWlzc2lvbnM6c3RyaW5nO1xuICB0aW1lOnN0cmluZztcbiAgZGF0YXR5cGU6c3RyaW5nO1xuICB1cmw6IHN0cmluZztcbiAgbmFtZTogc3RyaW5nO1xufVxuXG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogXCJ0YWJzXCIsXG4gIHRlbXBsYXRlVXJsOiBcIi4vdGFicy90YWJzLmNvbXBvbmVudC5odG1sXCIsXG4gIHN0eWxlVXJsczpbXCIuL3RhYnMvdGFicy5jb21wb25lbnQuY3NzXCJdXG59KVxuZXhwb3J0IGNsYXNzIHRhYnNDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuXG5cblxuXG5cblxuICAvL2l0ZW0gZnJvbSBjb2xsZWN0aW9uIFxuICBwdWJsaWMgbXlJdGVtJDogT2JzZXJ2YWJsZTxJdGVtPjtcbiAgcHVibGljIG15SXRlbXMkOiBPYnNlcnZhYmxlPEFycmF5PEl0ZW0+PjtcbiAgcHJpdmF0ZSBpdGVtOiBJdGVtO1xuICBwcml2YXRlIGl0ZW1zOiBBcnJheTxJdGVtPiA9IFtdO1xuXG4gIHB1YmxpYyBxdWVyeTogc3RyaW5nO1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgem9uZTogTmdab25lLCBwcml2YXRlIHJvdXRlOiBBY3RpdmF0ZWRSb3V0ZSwgcHJpdmF0ZSByb3V0ZXI6IFJvdXRlcikge1xuXG4gICAgdGhpcy5yb3V0ZS5xdWVyeVBhcmFtcy5zdWJzY3JpYmUocGFyYW1zID0+IHtcbiAgICAgICAgICAgIHRoaXMucXVlcnkgPSBwYXJhbXNbXCJxdWVyeVwiXTtcbiAgICAgICAgfSk7XG4gIH1cblxuXG4gIC8vIGluaXRpYWxpemUgdGhlIGZpcmViYXNlIGNvbm5lY3Rpb25cbiAgLy8gZ2V0IGRhdGEgZnJvbSBmaXJlc3RvcmVcbiAgbmdPbkluaXQoKTogdm9pZCB7XG5cbiAgICBmaXJlYmFzZUZDTS5hZGRPbk1lc3NhZ2VSZWNlaXZlZENhbGxiYWNrKFxuICAgICAgKG1lc3NhZ2UpID0+IHtcbiAgICAgICAgY29uc29sZS5sb2coXCJVcGRhdGUgVklBIEJhY2tncm91bmQgUHVzaCBOb3RpZmljYXRpb25cIikgICAgICAgIFxuICAgICAgICB0aGlzLnpvbmUucnVuKCgpID0+IHsgLy8gPD09IGFkZGVkXG4gICAgICAgICAgdGhpcy5maXJlc3RvcmVDb2xsZWN0aW9uT2JzZXJ2YWJsZSgpOyBcbiAgICAgIH0pO1xuICAgICAgICBcbiAgICAgIH1cbiAgICApO1xuXG4gICAgZmlyZWJhc2UuaW5pdGlhbGl6ZUFwcCh7XG4gICAgICBwZXJzaXN0OiBmYWxzZVxuICAgIH0pLnRoZW4oKCkgPT4ge1xuICAgICAgY29uc29sZS5sb2coXCJGaXJlYmFzZSBpbml0aWFsaXplZFwiKTtcbiAgICB9KTtcbiAgICAgdGhpcy5maXJlc3RvcmVDb2xsZWN0aW9uT2JzZXJ2YWJsZSgpO1xuICB9XG5cbiBcblxuXG5sYXRpdHVkZSA9ICA0OS45Mjk4O1xubG9uZ2l0dWRlID0gLTExOS4zOTY4O1xuem9vbSA9IDEyO1xuYmVhcmluZyA9IDA7XG50aWx0ID0gMDtcbnBhZGRpbmcgPSBbNDAsIDQwLCA0MCwgNDBdO1xubWFwVmlldzogTWFwVmlldztcbnB1YmxpYyBjdXJyZW50R2VvTG9jYXRpb24gPSBudWxsO1xubGFzdENhbWVyYTogU3RyaW5nO1xuXG5wcml2YXRlIHdhdGNoSWQ6IG51bWJlcjtcblxuLy9NYXAgZXZlbnRzXG5vbk1hcFJlYWR5KGV2ZW50KSB7XG4gICAgY29uc29sZS5sb2coJ01hcCBSZWFkeScpO1xuXG4gICAgdGhpcy5tYXBWaWV3ID0gZXZlbnQub2JqZWN0O1xuXG4gICAgY29uc29sZS5sb2coXCJTZXR0aW5nIGEgbWFya2VyLi4uXCIpO1xuICAgIHZhciBtYXJrZXIgPSBuZXcgTWFya2VyKCk7XG4gICAgbWFya2VyLnBvc2l0aW9uID0gUG9zaXRpb24ucG9zaXRpb25Gcm9tTGF0TG5nKDQ5LjkyMjM2MTksLTExOS4zOTcxOTI3KTtcbiAgICBtYXJrZXIudGl0bGUgPSBcIktlbG93bmFcIjtcbiAgICBtYXJrZXIuc25pcHBldCA9IFwiUGVyZml0IERlbnRhbFwiO1xuICAgIG1hcmtlci51c2VyRGF0YSA9IHtpbmRleDogMX07XG4gICAgdmFyIG1hcmtlcjIgPSBuZXcgTWFya2VyKCk7XG4gICAgbWFya2VyMi5wb3NpdGlvbj1Qb3NpdGlvbi5wb3NpdGlvbkZyb21MYXRMbmcodGhpcy5sYXRpdHVkZSwgdGhpcy5sb25naXR1ZGUpO1xuICAgIG1hcmtlcjIudGl0bGU9XCJVbml2ZXJzaXR5IG9mIEJyaXRpc2ggQ29sdW1iaWFcIjtcbiAgICBtYXJrZXIyLnNuaXBwZXQgPSBcIktlbG93bmFcIjtcbiAgICBtYXJrZXIyLnVzZXJEYXRhID0ge2luZGV4OjJ9O1xuICAgIFxuICAgIFxuICAgICAvLyBjaGVjayBpZiBnZW9sb2NhdGlvbiBpcyBub3QgZW5hYmxlZFxuICAgICAgICBHZW9sb2NhdGlvbi5lbmFibGVMb2NhdGlvblJlcXVlc3QoKTsgLy8gcmVxdWVzdCBmb3IgdGhlIHVzZXIgdG8gZW5hYmxlIGl0XG4gICAgICBcbiAgICB0aGlzLm1hcFZpZXcuYWRkTWFya2VyKG1hcmtlcik7XG4gICAgdGhpcy5tYXBWaWV3LmFkZE1hcmtlcihtYXJrZXIyKTtcblxuXG59XG5wcml2YXRlIGdldERldmljZUxvY2F0aW9uKCk6IFByb21pc2U8YW55PiB7XG4gIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICBHZW9sb2NhdGlvbi5lbmFibGVMb2NhdGlvblJlcXVlc3QoKS50aGVuKCgpID0+IHtcbiAgICAgICAgICBHZW9sb2NhdGlvbi5nZXRDdXJyZW50TG9jYXRpb24oe3RpbWVvdXQ6IDEwMDAwfSkudGhlbihsb2NhdGlvbiA9PiB7XG4gICAgICAgICAgICAgIHJlc29sdmUobG9jYXRpb24pO1xuICAgICAgICAgIH0pLmNhdGNoKGVycm9yID0+IHtcbiAgICAgICAgICAgICAgcmVqZWN0KGVycm9yKTtcbiAgICAgICAgICB9KTtcbiAgICAgIH0pO1xuICB9KTtcbn1cblxucHVibGljIHVwZGF0ZUxvY2F0aW9uKCkge1xuICBcbiAgdGhpcy5nZXREZXZpY2VMb2NhdGlvbigpLnRoZW4ocmVzdWx0ID0+IHtcbiAgICAgIHRoaXMubGF0aXR1ZGUgPSByZXN1bHQubGF0aXR1ZGU7XG4gICAgICB0aGlzLmxvbmdpdHVkZSA9IHJlc3VsdC5sb25naXR1ZGU7XG4gICAgICAgICAgIFxuICB9LCBlcnJvciA9PiB7XG4gICAgICBjb25zb2xlLmVycm9yKGVycm9yKTtcbiAgfSk7XG59XG5cbnB1YmxpYyBzdGFydFdhdGNoaW5nTG9jYXRpb24oKSB7XG4gIEdlb2xvY2F0aW9uLmVuYWJsZUxvY2F0aW9uUmVxdWVzdCgpOyAvLyByZXF1ZXN0IGZvciB0aGUgdXNlciB0byBlbmFibGUgaXRcbiAgdGhpcy53YXRjaElkID0gR2VvbG9jYXRpb24ud2F0Y2hMb2NhdGlvbihsb2NhdGlvbiA9PiB7XG4gICAgICBpZihsb2NhdGlvbikge1xuICAgICAgICAgIHRoaXMuem9uZS5ydW4oKCkgPT4ge1xuICAgICAgICAgICAgXG4gICAgICAgICAgICAgIHRoaXMubGF0aXR1ZGUgPSBsb2NhdGlvbi5sYXRpdHVkZTtcbiAgICAgICAgICAgICAgdGhpcy5sb25naXR1ZGUgPSBsb2NhdGlvbi5sb25naXR1ZGU7XG4gICAgICAgICAgICAgIGNvbnNvbGUubG9nKHRoaXMubGF0aXR1ZGUpO1xuICAgICAgICAgICAgICBjb25zb2xlLmxvZyh0aGlzLmxvbmdpdHVkZSk7XG4gICAgICAgICAgICAgIHZhciBtYXJrZXIzID0gbmV3IE1hcmtlcigpO1xuICAgICAgICAgICAgICBtYXJrZXIzLnBvc2l0aW9uPVBvc2l0aW9uLnBvc2l0aW9uRnJvbUxhdExuZyh0aGlzLmxhdGl0dWRlLCB0aGlzLmxvbmdpdHVkZSk7XG4gICAgICAgICAgICAgIG1hcmtlcjMudGl0bGU9XCJZb3VyIGxvY2F0aW9uXCI7XG4gICAgICAgICAgICAgIG1hcmtlcjMuc25pcHBldCA9IHRoaXMubGF0aXR1ZGUudG9TdHJpbmcoKSArIFwiLFwiICsgdGhpcy5sb25naXR1ZGUudG9TdHJpbmcoKTtcbiAgICAgICAgICAgICAgbWFya2VyMy51c2VyRGF0YSA9IHtpbmRleDoyfTtcblxuICAgICAgICAgICAgICBsZXQgaW1nU3JjID0gbmV3IEltYWdlU291cmNlKCk7XG4gICAgICAgICAgICAgIGltZ1NyYy5mcm9tRmlsZShcIn4vaW1hZ2VzL2xvY2F0aW9uLnBuZ1wiKTtcbiAgICAgIFxuICAgICAgICAgICAgICBsZXQgaW1hZ2UgPSBuZXcgSW1hZ2UoKTtcbiAgICAgICAgICAgICAgaW1hZ2UuaW1hZ2VTb3VyY2UgPSBpbWdTcmM7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgICAgbWFya2VyMy5pY29uID0gaW1hZ2U7XG4gICAgICAgICAgICAgIHRoaXMubWFwVmlldy5hZGRNYXJrZXIobWFya2VyMyk7XG4gICAgICAgICAgICAgIFxuICAgICAgICAgIH0pO1xuICAgICAgfVxuICB9LCBlcnJvciA9PiB7XG4gICAgICBjb25zb2xlLmxvZyhlcnJvcik7XG4gIH0sIHsgdXBkYXRlRGlzdGFuY2U6IDEsIG1pbmltdW1VcGRhdGVUaW1lOiAxMDAwIH0pO1xufVxuXG5wdWJsaWMgc3RvcFdhdGNoaW5nTG9jYXRpb24oKSB7XG4gIGlmKHRoaXMud2F0Y2hJZCkge1xuICAgICAgR2VvbG9jYXRpb24uY2xlYXJXYXRjaCh0aGlzLndhdGNoSWQpO1xuICAgICAgdGhpcy53YXRjaElkID0gbnVsbDtcbiAgfVxufVxub25Db29yZGluYXRlVGFwcGVkKGFyZ3MpIHtcbiAgICBjb25zb2xlLmxvZyhcIkNvb3JkaW5hdGUgVGFwcGVkLCBMYXQ6IFwiICsgYXJncy5wb3NpdGlvbi5sYXRpdHVkZSArIFwiLCBMb246IFwiICsgYXJncy5wb3NpdGlvbi5sb25naXR1ZGUsIGFyZ3MpO1xufVxuXG5vbk1hcmtlckV2ZW50KGFyZ3MpIHtcbiAgICBjb25zb2xlLmxvZyhcIk1hcmtlciBFdmVudDogJ1wiICsgYXJncy5ldmVudE5hbWVcbiAgICAgICAgKyBcIicgdHJpZ2dlcmVkIG9uOiBcIiArIGFyZ3MubWFya2VyLnRpdGxlXG4gICAgICAgICsgXCIsIExhdDogXCIgKyBhcmdzLm1hcmtlci5wb3NpdGlvbi5sYXRpdHVkZSArIFwiLCBMb246IFwiICsgYXJncy5tYXJrZXIucG9zaXRpb24ubG9uZ2l0dWRlLCBhcmdzKTtcbn1cblxub25DYW1lcmFDaGFuZ2VkKGFyZ3MpIHtcbiAgICBjb25zb2xlLmxvZyhcIkNhbWVyYSBjaGFuZ2VkOiBcIiArIEpTT04uc3RyaW5naWZ5KGFyZ3MuY2FtZXJhKSwgSlNPTi5zdHJpbmdpZnkoYXJncy5jYW1lcmEpID09PSB0aGlzLmxhc3RDYW1lcmEpO1xuICAgIHRoaXMubGFzdENhbWVyYSA9IEpTT04uc3RyaW5naWZ5KGFyZ3MuY2FtZXJhKTtcbn1cblxuXG5cbiAgcHVibGljIGZpcmVzdG9yZUNvbGxlY3Rpb25PYnNlcnZhYmxlKCk6IHZvaWQge1xuICAgIGNvbnNvbGUubG9nKFwiRnVuY3Rpb24gQ2FsbGVkOiBmaXJlc3RvcmVDb2xsZWN0aW9uT2JzZXJ2YWJsZSgpXCIpO1xuICAgIHRoaXMubXlJdGVtcyQgPSBPYnNlcnZhYmxlLmNyZWF0ZShzdWJzY3JpYmVyID0+IHtcbiAgICAgIGNvbnN0IGNvbFJlZjogZmlyZXN0b3JlLkNvbGxlY3Rpb25SZWZlcmVuY2UgPSBmaXJlYmFzZS5maXJlc3RvcmUoKS5jb2xsZWN0aW9uKFwiaXRlbXNcIik7XG4gICAgICBjb2xSZWYub25TbmFwc2hvdCgoc25hcHNob3Q6IGZpcmVzdG9yZS5RdWVyeVNuYXBzaG90KSA9PiB7XG4gICAgICAgIHRoaXMuem9uZS5ydW4oKCkgPT4ge1xuICAgICAgICAgIHRoaXMuaXRlbXMgPSBbXTtcbiAgICAgICAgICBzbmFwc2hvdC5mb3JFYWNoKGRvY1NuYXAgPT4gdGhpcy5pdGVtcy5wdXNoKDxJdGVtPmRvY1NuYXAuZGF0YSgpKSk7XG4gICAgICAgICAgc3Vic2NyaWJlci5uZXh0KHRoaXMuaXRlbXMpO1xuICAgICAgICB9KTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9XG5cbiAgcHVibGljIGZpcmVzdG9yZVdoZXJlRXZlcnlvbmUoKTogdm9pZCB7XG4gICAgdGhpcy5teUl0ZW1zJCA9IE9ic2VydmFibGUuY3JlYXRlKHN1YnNjcmliZXIgPT4ge1xuICAgICBjb25zdCBxdWVyeTogZmlyZXN0b3JlLlF1ZXJ5ID0gZmlyZWJhc2UuZmlyZXN0b3JlKCkuY29sbGVjdGlvbihcIml0ZW1zXCIpXG4gICAgICAgIC53aGVyZShcInBlcm1pc3Npb25zXCIsIFwiPT1cIiwgdGhpcy5xdWVyeSk7XG4gICAgcXVlcnlcbiAgICAgICAgLmdldCgpXG4gICAgICAgIC50aGVuKChxdWVyeVNuYXBzaG90OiBmaXJlc3RvcmUuUXVlcnlTbmFwc2hvdCkgPT4ge1xuICAgICAgICAgIHF1ZXJ5U25hcHNob3QuZm9yRWFjaChkb2MgPT4ge1xuXG4gICAgICAgICAgICB0aGlzLml0ZW1zID0gW107XG4gICAgICAgICAgICBxdWVyeVNuYXBzaG90LmZvckVhY2goZG9jU25hcCA9PiB0aGlzLml0ZW1zLnB1c2goPEl0ZW0+ZG9jU25hcC5kYXRhKCkpKTtcbiAgICAgICAgICAgIHN1YnNjcmliZXIubmV4dCh0aGlzLml0ZW1zKTtcblxuICAgICAgICAgICAgLy9jb25zb2xlLmxvZyhgRGVudGlzdCBQZXJtaXNzaW9uczogJHtkb2MuaWR9ID0+ICR7SlNPTi5zdHJpbmdpZnkoZG9jLmRhdGEoKSl9YCk7XG4gICAgICAgICAgIH0pO1xuICAgIH0pO1xuICB9KTtcbn1cbiAgXG5wdWJsaWMgZmlyZXN0b3JlV2hlcmVEZW50aXN0cygpOiB2b2lkIHtcbiAgICB0aGlzLm15SXRlbXMkID0gT2JzZXJ2YWJsZS5jcmVhdGUoc3Vic2NyaWJlciA9PiB7XG4gICAgIGNvbnN0IHF1ZXJ5OiBmaXJlc3RvcmUuUXVlcnkgPSBmaXJlYmFzZS5maXJlc3RvcmUoKS5jb2xsZWN0aW9uKFwiaXRlbXNcIilcbiAgICAgICAgLndoZXJlKFwicGVybWlzc2lvbnNcIiwgXCI9PVwiLCB0aGlzLnF1ZXJ5KTtcbiAgICBxdWVyeVxuICAgICAgICAuZ2V0KClcbiAgICAgICAgLnRoZW4oKHF1ZXJ5U25hcHNob3Q6IGZpcmVzdG9yZS5RdWVyeVNuYXBzaG90KSA9PiB7XG4gICAgICAgICAgcXVlcnlTbmFwc2hvdC5mb3JFYWNoKGRvYyA9PiB7XG5cbiAgICAgICAgICAgIHRoaXMuaXRlbXMgPSBbXTtcbiAgICAgICAgICAgIHF1ZXJ5U25hcHNob3QuZm9yRWFjaChkb2NTbmFwID0+IHRoaXMuaXRlbXMucHVzaCg8SXRlbT5kb2NTbmFwLmRhdGEoKSkpO1xuICAgICAgICAgICAgc3Vic2NyaWJlci5uZXh0KHRoaXMuaXRlbXMpO1xuICAgICAgICAgICAgLy9jb25zb2xlLmxvZyhgRGVudGlzdCBQZXJtaXNzaW9uczogJHtkb2MuaWR9ID0+ICR7SlNPTi5zdHJpbmdpZnkoZG9jLmRhdGEoKSl9YCk7XG4gICAgICAgICAgIH0pO1xuICAgIH0pO1xuICB9KTtcbn1cblxudmlld0RldGFpbCh0aXRsZTogc3RyaW5nKXtcbiAgY29uc29sZS5sb2coXCJjbGlja2luZyB2aWV3IGRldGFpbFwiICsgdGl0bGUpO1xuXG5sZXQgbmF2aWdhdGlvbkV4dHJhczogTmF2aWdhdGlvbkV4dHJhcyA9IHtcbiAgcXVlcnlQYXJhbXM6IHtcbiAgICAgIFwiVGl0bGVcIjogdGl0bGUsXG4gIH1cbn07XG50aGlzLnJvdXRlci5uYXZpZ2F0ZShbXCJkZXRhaWxcIl0sIG5hdmlnYXRpb25FeHRyYXMpO1xuICBjb25zb2xlLmxvZyhcIm5hdmlnYXRpbmdcIik7XG4gIC8vIHRoaXMucm91dGVyLm5hdmlnYXRlKFtcIi9kZXRhaWxcIl0pO1xufVxuXG5cblxufVxuIl19