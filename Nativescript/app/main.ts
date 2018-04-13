import { platformNativeScriptDynamic } from "nativescript-angular/platform";
import { AppModule } from "./app.module";
import { registerElement } from "nativescript-angular/element-registry";
const firebase = require("nativescript-plugin-firebase");

platformNativeScriptDynamic().bootstrapModule(AppModule);


firebase.subscribeToTopic("update");

// firebase.getCurrentPushToken().then((token: string) => {
//     // may be null if not known yet
//     console.log("Current push token: " + token);
//   });