import {Component, OnInit, NgZone } from "@angular/core";
import {ActivatedRoute} from "@angular/router";
import {Router} from '@angular/router';
import {Item} from "../tabs/tabs.component";
import {tabsComponent} from "../tabs/tabs.component";

//firebase
import { Observable } from "rxjs/Observable";
import { firestore } from "nativescript-plugin-firebase";
const firebase = require("nativescript-plugin-firebase/app");
const firebaseWebApi = require("nativescript-plugin-firebase/app");

import { PDFView } from 'nativescript-pdf-view';
import { registerElement } from 'nativescript-angular';



@Component({
    selector: "detail",
    templateUrl: "./details/details.component.html",
    styleUrls:["./tabs/tabs.component.css"]
  })


export class detailsComponent implements OnInit{

    public myItem$: Observable<Item>;
    private item: Item;
    public myItems$: Observable<Array<Item>>;
    private items: Array<Item> = [];


    public title;

    constructor(private zone: NgZone, private route: ActivatedRoute, private router: Router,
    private Tabscomponent: tabsComponent) {
        this.route.queryParams.subscribe(params => {
            this.title = params["Title"];
        })
        // this.route.queryParams.subscribe(params => {
        //         this.title = params["title"];
        //     });
      }
      public getNewsDetail(Title: string): Item[] {
        this.myItems$ = Observable.create(subscriber => {
          const query: firestore.Query = firebase.firestore().collection("items")
             .where("title", "==", Title);
         query
             .get()
             .then((querySnapshot: firestore.QuerySnapshot) => {
               querySnapshot.forEach(doc => {
      
                 this.items = [];
                 querySnapshot.forEach(docSnap => this.items.push(<Item>docSnap.data()));
                 subscriber.next(this.items);
                // console.log(`Dentist Permissions: ${doc.id} => ${JSON.stringify(doc.data())}`);
                });
         });
       });
       return this.items;
      }

    ngOnInit() {
        console.log("onit log");
        // const title = this.route.snapshot.params["title"];
        this.item = this.getNewsDetail(this.title)[0];
    }
 
}