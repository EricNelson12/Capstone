import {Component,OnInit,NgZone } from "@angular/core";
import * as listViewModule from "tns-core-modules/ui/list-view";
import * as ImageModule from "tns-core-modules/ui/image";
import { Image } from "tns-core-modules/ui/image";
import { Info} from './info';
import { registerElement } from "nativescript-angular/element-registry";
registerElement("PullToRefresh", () => require("nativescript-pulltorefresh").PullToRefresh);
import {ElementRef, ViewChild} from '@angular/core';
import { MapView, Marker, Position } from 'nativescript-google-maps-sdk';

// Important - must register MapView plugin in order to use in Angular templates
registerElement("MapView", () => require("nativescript-google-maps-sdk").MapView);

//firebase
import { Observable } from "rxjs/Observable";
import { firestore } from "nativescript-plugin-firebase";
const firebase = require("nativescript-plugin-firebase/app");
const firebaseWebApi = require("nativescript-plugin-firebase/app");
const MapBox = require("nativescript-mapbox");

//items

export interface Item{
  id:string;
  title:string;
  description:string;
  adminposted:string;
  permissions:string;
  time:string;
  datatype:string;
  url: string;
  name: string;
}



@Component({
  selector: "tabs",
  templateUrl: "./tabs/tabs.component.html",
  styleUrls:["./tabs/tabs.component.css"]
})
export class tabsComponent implements OnInit{

 //item from collection 

  public myItem$: Observable<Item>;
  public myItems$: Observable<Array<Item>>;
  private item: Item;
  private items: Array<Item> = [];


  constructor(private zone: NgZone) {
    // AngularFireModule.initializeApp({});
  }


latitude =  49.9298;
longitude = -119.3968;
zoom = 12;
bearing = 0;
tilt = 0;
padding = [40, 40, 40, 40];
mapView: MapView;

lastCamera: String;



//Map events
onMapReady(event) {
    console.log('Map Ready');

    this.mapView = event.object;

    console.log("Setting a marker...");

    var marker = new Marker();
    marker.position = Position.positionFromLatLng(49.9223619,-119.3971927);
    marker.title = "Kelowna";
    marker.snippet = "Perfit Dental";
    marker.userData = {index: 1};
    
    var marker2 = new Marker();
    marker2.position=Position.positionFromLatLng(49.9398, -119.3968);
    marker2.title="University of British Columbia";
    marker2.snippet = "Kelowna";
    marker2.userData = {index:2};
    this.mapView.addMarker(marker);
    this.mapView.addMarker(marker2);
}

onCoordinateTapped(args) {
    console.log("Coordinate Tapped, Lat: " + args.position.latitude + ", Lon: " + args.position.longitude, args);
}

onMarkerEvent(args) {
    console.log("Marker Event: '" + args.eventName
        + "' triggered on: " + args.marker.title
        + ", Lat: " + args.marker.position.latitude + ", Lon: " + args.marker.position.longitude, args);
}

onCameraChanged(args) {
    console.log("Camera changed: " + JSON.stringify(args.camera), JSON.stringify(args.camera) === this.lastCamera);
    this.lastCamera = JSON.stringify(args.camera);
}
  // initialize the firebase connection
  // get data from firestore
  ngOnInit(): void {
    firebase.initializeApp({
      persist: false
    }).then(() => {
      console.log("Firebase initialized");
    });

     this.firestoreCollectionObservable();

  }


  firestoreCollectionObservable(): void {
    this.myItems$ = Observable.create(subscriber => {
      const colRef: firestore.CollectionReference = firebase.firestore().collection("items");
      colRef.onSnapshot((snapshot: firestore.QuerySnapshot) => {
        this.zone.run(() => {
          this.items = [];
          snapshot.forEach(docSnap => this.items.push(<Item>docSnap.data()));
          subscriber.next(this.items);
        });
      });
    });
  }


  
}
