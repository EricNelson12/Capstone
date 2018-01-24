"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var firebase = require("nativescript-plugin-firebase/app");
var firebaseWebApi = require("nativescript-plugin-firebase/app");
var MapBox = require("nativescript-mapbox");
var tabsComponent = (function () {
    function tabsComponent(zone) {
        // AngularFireModule.initializeApp({});
        this.zone = zone;
        //item from collection 
        this.item = {
            title: '',
            description: '',
            adminposted: '',
            permissions: '',
            time: '',
            datatype: '',
            url: '',
            name: '',
        };
    }
    // initialize the firebase connection
    // get data from firestore
    tabsComponent.prototype.ngOnInit = function () {
        firebase.initializeApp({
            persist: false
        }).then(function () {
            console.log("Firebase initialized");
        });
        this.firestoreGet();
    };
    //function to get firebase data
    tabsComponent.prototype.firestoreGet = function () {
        var _this = this;
        var collectionRef = firebase.firestore().collection("items");
        collectionRef.get()
            .then(function (querySnapshot) {
            querySnapshot.forEach(function (doc) {
                console.log("Items:  " + (doc.id + " => " + JSON.stringify(doc.data())));
                // since there's a reference stored here, we can use that to retrieve its data            
                //this.items.push(
                //   new Item("Bob", "", "Developer", "100", "github.com"); 
                //)            //set data to variables
                _this.item.title = doc.data().title;
                _this.item.description = doc.data().description;
                _this.item.datatype = doc.data().datatype;
                _this.item.permissions = doc.data().permissions;
                _this.item.name = doc.data().name;
                _this.item.adminposted = doc.data().adminposted;
                _this.item.time = doc.data().time;
                _this.item.url = doc.data().url;
                console.log("Updating Data");
            });
        })
            .catch(function (err) { return console.log(); });
        //console.log("This is the second log: "+"Get failed, error" + err));         
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
