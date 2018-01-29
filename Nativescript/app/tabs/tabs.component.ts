import {Component,OnInit,NgZone } from "@angular/core";
import * as listViewModule from "tns-core-modules/ui/list-view";
import * as ImageModule from "tns-core-modules/ui/image";
import { Image } from "tns-core-modules/ui/image";
import { Info} from './info';
import { registerElement } from "nativescript-angular/element-registry";
import {ActivatedRoute} from "@angular/router";


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


  public query: string;

  constructor(private zone: NgZone, private route: ActivatedRoute) {
    this.route.queryParams.subscribe(params => {
            this.query = params["query"];
        });
  }

  show(){
    alert(this.query);
  }

  // initialize the firebase connection
  // get data from firestore
  ngOnInit(): void {
    firebase.initializeApp({
      persist: false
    }).then(() => {
      console.log("Firebase initialized");
    });
     //this.firestoreCollectionObservable();
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

  public firestoreWhereEveryone(): void {
    this.myItems$ = Observable.create(subscriber => {
     const query: firestore.Query = firebase.firestore().collection("items")
        .where("permissions", "==", this.query);
    query
        .get()
        .then((querySnapshot: firestore.QuerySnapshot) => {
          querySnapshot.forEach(doc => {

            this.items = [];
            querySnapshot.forEach(docSnap => this.items.push(<Item>docSnap.data()));
            subscriber.next(this.items);

            //console.log(`Dentist Permissions: ${doc.id} => ${JSON.stringify(doc.data())}`);
           });
    });
  });
}
  
public firestoreWhereDentists(): void {
    this.myItems$ = Observable.create(subscriber => {
     const query: firestore.Query = firebase.firestore().collection("items")
        .where("permissions", "==", this.query);
    query
        .get()
        .then((querySnapshot: firestore.QuerySnapshot) => {
          querySnapshot.forEach(doc => {

            this.items = [];
            querySnapshot.forEach(docSnap => this.items.push(<Item>docSnap.data()));
            subscriber.next(this.items);
            //console.log(`Dentist Permissions: ${doc.id} => ${JSON.stringify(doc.data())}`);
           });
    });
  });
}





}
