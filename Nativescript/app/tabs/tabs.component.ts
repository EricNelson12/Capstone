import {Component,OnInit,NgZone } from "@angular/core";
import * as listViewModule from "tns-core-modules/ui/list-view";
import * as ImageModule from "tns-core-modules/ui/image";
import { Image } from "tns-core-modules/ui/image";
import { Info} from './info';


//firebase
import { Observable } from "rxjs/Observable";
import { firestore } from "nativescript-plugin-firebase";
const firebase = require("nativescript-plugin-firebase/app");
const firebaseWebApi = require("nativescript-plugin-firebase/app");
const MapBox = require("nativescript-mapbox");

//items
import { Item } from '../items/item';


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

    this.firestoreGet();

  }


 //function to get firebase data
 public firestoreGet(): void {
    const collectionRef: firestore.CollectionReference = firebase.firestore().collection("items");
    collectionRef.get()
        .then((querySnapshot: firestore.QuerySnapshot) => {
          querySnapshot.forEach(doc => {

            console.log("Items:  "+`${doc.id} => ${JSON.stringify(doc.data())}`);
            // since there's a reference stored here, we can use that to retrieve its data            
            

            //this.items.push(
            //   new Item("Bob", "", "Developer", "100", "github.com"); 
            //)            //set data to variables
            
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

