
import { Component, ViewChild, OnInit, AfterViewInit, ChangeDetectorRef } from "@angular/core";
import { Page } from "ui/page";
import { ActionItem } from "ui/action-bar";
import { Observable } from "data/observable";
import { RadSideDrawerComponent, SideDrawerType } from "nativescript-pro-ui/sidedrawer/angular";
import { RadSideDrawer } from 'nativescript-pro-ui/sidedrawer';
import { Switch } from "ui/switch";


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

    constructor(private _changeDetectionRef: ChangeDetectorRef) {
    }

    @ViewChild(RadSideDrawerComponent) public drawerComponent: RadSideDrawerComponent;
    private drawer: RadSideDrawer;

    ngAfterViewInit() {
        this.drawer = this.drawerComponent.sideDrawer;
        this._changeDetectionRef.detectChanges();
    }

    ngOnInit() {
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

    professionalSwitch(args){
        let profSwitch = <Switch>args.object;        
        if(profSwitch.checked){
            this.isProf = true;
            this.firebase.subscribeToTopic("prof");
        }else{
            this.isProf = false;
            this.firebase.unsubscribeFromTopic("prof");
        }
        console.log("Professional switch on: "+profSwitch.checked);
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
