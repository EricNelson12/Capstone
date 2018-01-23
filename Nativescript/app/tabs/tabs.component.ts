import {Component,OnInit,NgZone } from "@angular/core";
import * as listViewModule from "tns-core-modules/ui/list-view";
import * as ImageModule from "tns-core-modules/ui/image";
import { Image } from "tns-core-modules/ui/image";
import { Info} from './info';
import { registerElement } from "nativescript-angular/element-registry";
registerElement("PullToRefresh", () => require("nativescript-pulltorefresh").PullToRefresh);
 

//firebase
import { Observable } from "rxjs/Observable";
import { firestore } from "nativescript-plugin-firebase";
const firebase = require("nativescript-plugin-firebase/app");
const firebaseWebApi = require("nativescript-plugin-firebase/app");
const MapBox = require("nativescript-mapbox");

//items
import { Item } from '../items/item';

export interface City {
  country: string;
  name: string;
  population: number;
}

@Component({
  selector: "tabs",
  templateUrl: "./tabs/tabs.component.html",
  styleUrls:["./tabs/tabs.component.css"]
})
export class tabsComponent implements OnInit{

 //item from collection 
  item: Item = {
      title: '',
      description: '',
      adminposted: '',
      permissions: '',
      time: '',
      datatype: '',
      url: '',
      name: '',
    }
  

  public myCity$: Observable<City>;
  public myCities$: Observable<Array<City>>;
  private city: City;
  private cities: Array<City> = [];

  items: Item[];


  constructor(private zone: NgZone) {
    // AngularFireModule.initializeApp({});
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



  refreshList(args) {
         var pullRefresh = args.object;
         setTimeout(function () {
            pullRefresh.refreshing = false;
         }, 1000);
    }

  firestoreCollectionObservable(): void {
    this.myCities$ = Observable.create(subscriber => {
      const colRef: firestore.CollectionReference = firebase.firestore().collection("items");
      colRef.onSnapshot((snapshot: firestore.QuerySnapshot) => {
        this.zone.run(() => {
          this.cities = [];
          snapshot.forEach(docSnap => this.cities.push(<City>docSnap.data()));
          subscriber.next(this.cities);
        });
      });
    });
  }



 //function to get firebase data
 public firestoreGet(): void {
    const collectionRef: firestore.CollectionReference = firebase.firestore().collection("items");
    collectionRef.get()
        .then((querySnapshot: firestore.QuerySnapshot) => {
          querySnapshot.forEach(doc => {

            //console.log("Items:  "+`${doc.id} => ${JSON.stringify(doc.data())}`);
           
            
            this.item.title = doc.data().title;
            this.item.description = doc.data().description;
            this.item.datatype = doc.data().datatype;
            this.item.permissions = doc.data().permissions;
            this.item.name = doc.data().name;
            this.item.adminposted = doc.data().adminposted;
            this.item.time = doc.data().time;
            this.item.url = doc.data().url;
            console.log("Updating Data");

          });
        })
        .catch(err => console.log());
          //console.log("This is the second log: "+"Get failed, error" + err));         
  }
  
}
