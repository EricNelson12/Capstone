"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var platform_1 = require("nativescript-angular/platform");
var app_module_1 = require("./app.module");
var element_registry_1 = require("nativescript-angular/element-registry");
element_registry_1.registerElement("Mapbox", function () { return require("nativescript-mapbox").MapboxView; });
// const firebase = require("nativescript-plugin-firebase");
platform_1.platformNativeScriptDynamic().bootstrapModule(app_module_1.AppModule);
// firebase.subscribeToTopic("news");
// firebase.getCurrentPushToken().then((token: string) => {
//     // may be null if not known yet
//     console.log("Current push token: " + token);
//   }); 
