
import { Component, ViewChild, OnInit, AfterViewInit, ChangeDetectorRef } from "@angular/core";
import { Page } from "ui/page";
import { ActionItem } from "ui/action-bar";
import { Observable } from "data/observable";
import { RadSideDrawerComponent, SideDrawerType } from "nativescript-pro-ui/sidedrawer/angular";
import { RadSideDrawer } from 'nativescript-pro-ui/sidedrawer';
import { Switch } from "ui/switch";
import {Router, NavigationExtras} from "@angular/router";

import * as dialogs from "ui/dialogs";



@Component({
    moduleId: module.id,
    selector: "side",
    templateUrl: 'side.component.html',
    styleUrls: ['side.component.css']
})
export class SideComponent implements AfterViewInit, OnInit {

    firebase = require("nativescript-plugin-firebase");
    private _mainContentText: string;
    public isProf: boolean = false;

    constructor(private _changeDetectionRef: ChangeDetectorRef, private router: Router) {
    }

    @ViewChild(RadSideDrawerComponent) public drawerComponent: RadSideDrawerComponent;
    private drawer: RadSideDrawer;

    ngAfterViewInit() {
        this.drawer = this.drawerComponent.sideDrawer;
        this._changeDetectionRef.detectChanges();
    }

    onSearchLayoutLoaded(event) { 
    //Prevents softkeyboard from opening automatically
        if (event.object.android) {
            event.object.android.setFocusableInTouchMode(true);
        }
    }

    onSearchBarLoaded(event) {
        if (event.object.android) {
            event.object.android.clearFocus();
        }
    }

    ngOnInit() {
        this.Everyone();
    }


    Everyone(){
        let navigationExtras: NavigationExtras = {
            queryParams: {
                "query": "Everyone",
            }
        };
        this.router.navigate(["tabs"], navigationExtras);
    }

    DentistsOnly(){
        let navigationExtras: NavigationExtras = {
            queryParams: {
                "query": "Dentists/Doctors only",
            }
        };
        this.router.navigate(["tabs"], navigationExtras);
    }


    professionalSwitch(args){
        let profSwitch = <Switch>args.object;        
        if(profSwitch.checked){
            this.isProf = true;
            this.DentistsOnly();
            // alert("Dentists");
/**
            dialogs.prompt({
            title: "Your title",
            neutralButtonText: "Neutral text",
            defaultText: "Default text",
            inputType: dialogs.inputType.password
        }).then(r => {
            console.log("Dialog result: " + r.result + ", text: " + r.text);
        });


*/
        }else{
            this.isProf = false;
            this.Everyone();
            // alert("Everyone");
        }
        console.log("Professional switch on: "+profSwitch.checked);
    }



    notificationSwitch(args){
        let pushSwitch = <Switch>args.object;
        if(pushSwitch.checked){                       
            this.firebase.subscribeToTopic("news");
            if(this.isProf){
                this.firebase.subscribeToTopic("prof");
            }
        }else{
            this.firebase.unsubscribeFromTopic("news");
            if(this.isProf){
                this.firebase.unsubscribeFromTopic("prof");
            }
        }
        console.log("Notifications switch on: "+pushSwitch.checked);
    }


    get mainContentText() {
        return this._mainContentText;
    }

    set mainContentText(value: string) {
        this._mainContentText = value;
    }

    public openDrawer() {
        this.drawer.toggleDrawerState();
    }

    public onCloseDrawerTap() {
       this.drawer.closeDrawer();
    }
}
