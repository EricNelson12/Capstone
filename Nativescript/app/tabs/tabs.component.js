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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFicy5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJ0YWJzLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUF1RDtBQVV2RCxJQUFNLFFBQVEsR0FBRyxPQUFPLENBQUMsa0NBQWtDLENBQUMsQ0FBQztBQUM3RCxJQUFNLGNBQWMsR0FBRyxPQUFPLENBQUMsa0NBQWtDLENBQUMsQ0FBQztBQUNuRSxJQUFNLE1BQU0sR0FBRyxPQUFPLENBQUMscUJBQXFCLENBQUMsQ0FBQztBQVc5QztJQWtCRSx1QkFBb0IsSUFBWTtRQUM5Qix1Q0FBdUM7UUFEckIsU0FBSSxHQUFKLElBQUksQ0FBUTtRQWhCakMsdUJBQXVCO1FBQ3RCLFNBQUksR0FBUztZQUNULEtBQUssRUFBRSxFQUFFO1lBQ1QsV0FBVyxFQUFFLEVBQUU7WUFDZixXQUFXLEVBQUUsRUFBRTtZQUNmLFdBQVcsRUFBRSxFQUFFO1lBQ2YsSUFBSSxFQUFFLEVBQUU7WUFDUixRQUFRLEVBQUUsRUFBRTtZQUNaLEdBQUcsRUFBRSxFQUFFO1lBQ1AsSUFBSSxFQUFFLEVBQUU7U0FDVCxDQUFBO0lBU0gsQ0FBQztJQUVELHFDQUFxQztJQUNyQywwQkFBMEI7SUFDMUIsZ0NBQVEsR0FBUjtRQUNFLFFBQVEsQ0FBQyxhQUFhLENBQUM7WUFDckIsT0FBTyxFQUFFLEtBQUs7U0FDZixDQUFDLENBQUMsSUFBSSxDQUFDO1lBQ04sT0FBTyxDQUFDLEdBQUcsQ0FBQyxzQkFBc0IsQ0FBQyxDQUFDO1FBQ3RDLENBQUMsQ0FBQyxDQUFDO1FBRUgsSUFBSSxDQUFDLFlBQVksRUFBRSxDQUFDO0lBRXRCLENBQUM7SUFHRiwrQkFBK0I7SUFDeEIsb0NBQVksR0FBbkI7UUFBQSxpQkE2QkU7UUE1QkMsSUFBTSxhQUFhLEdBQWtDLFFBQVEsQ0FBQyxTQUFTLEVBQUUsQ0FBQyxVQUFVLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDOUYsYUFBYSxDQUFDLEdBQUcsRUFBRTthQUNkLElBQUksQ0FBQyxVQUFDLGFBQXNDO1lBQzNDLGFBQWEsQ0FBQyxPQUFPLENBQUMsVUFBQSxHQUFHO2dCQUV2QixPQUFPLENBQUMsR0FBRyxDQUFDLFVBQVUsSUFBSSxHQUFHLENBQUMsRUFBRSxZQUFPLElBQUksQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLElBQUksRUFBRSxDQUFHLENBQUEsQ0FBQyxDQUFDO2dCQUNyRSwwRkFBMEY7Z0JBRzFGLGtCQUFrQjtnQkFDbEIsNERBQTREO2dCQUM1RCxzQ0FBc0M7Z0JBRXRDLEtBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxHQUFHLEdBQUcsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxLQUFLLENBQUM7Z0JBQ25DLEtBQUksQ0FBQyxJQUFJLENBQUMsV0FBVyxHQUFHLEdBQUcsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxXQUFXLENBQUM7Z0JBQy9DLEtBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxHQUFHLEdBQUcsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxRQUFRLENBQUM7Z0JBQ3pDLEtBQUksQ0FBQyxJQUFJLENBQUMsV0FBVyxHQUFHLEdBQUcsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxXQUFXLENBQUM7Z0JBQy9DLEtBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxHQUFHLEdBQUcsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxJQUFJLENBQUM7Z0JBQ2pDLEtBQUksQ0FBQyxJQUFJLENBQUMsV0FBVyxHQUFHLEdBQUcsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxXQUFXLENBQUM7Z0JBQy9DLEtBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxHQUFHLEdBQUcsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxJQUFJLENBQUM7Z0JBQ2pDLEtBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxHQUFHLEdBQUcsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxHQUFHLENBQUM7Z0JBQy9CLE9BQU8sQ0FBQyxHQUFHLENBQUMsZUFBZSxDQUFDLENBQUM7WUFFL0IsQ0FBQyxDQUFDLENBQUM7UUFDTCxDQUFDLENBQUM7YUFDRCxLQUFLLENBQUMsVUFBQSxHQUFHLElBQUksT0FBQSxPQUFPLENBQUMsR0FBRyxFQUFFLEVBQWIsQ0FBYSxDQUFDLENBQUM7UUFDM0IsOEVBQThFO0lBRXRGLENBQUM7SUFuRVUsYUFBYTtRQUx6QixnQkFBUyxDQUFDO1lBQ1QsUUFBUSxFQUFFLE1BQU07WUFDaEIsV0FBVyxFQUFFLDRCQUE0QjtZQUN6QyxTQUFTLEVBQUMsQ0FBQywyQkFBMkIsQ0FBQztTQUN4QyxDQUFDO3lDQW1CMEIsYUFBTTtPQWxCckIsYUFBYSxDQXFFekI7SUFBRCxvQkFBQztDQUFBLEFBckVELElBcUVDO0FBckVZLHNDQUFhIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtDb21wb25lbnQsT25Jbml0LE5nWm9uZSB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XHJcbmltcG9ydCAqIGFzIGxpc3RWaWV3TW9kdWxlIGZyb20gXCJ0bnMtY29yZS1tb2R1bGVzL3VpL2xpc3Qtdmlld1wiO1xyXG5pbXBvcnQgKiBhcyBJbWFnZU1vZHVsZSBmcm9tIFwidG5zLWNvcmUtbW9kdWxlcy91aS9pbWFnZVwiO1xyXG5pbXBvcnQgeyBJbWFnZSB9IGZyb20gXCJ0bnMtY29yZS1tb2R1bGVzL3VpL2ltYWdlXCI7XHJcbmltcG9ydCB7IEluZm99IGZyb20gJy4vaW5mbyc7XHJcblxyXG5cclxuLy9maXJlYmFzZVxyXG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSBcInJ4anMvT2JzZXJ2YWJsZVwiO1xyXG5pbXBvcnQgeyBmaXJlc3RvcmUgfSBmcm9tIFwibmF0aXZlc2NyaXB0LXBsdWdpbi1maXJlYmFzZVwiO1xyXG5jb25zdCBmaXJlYmFzZSA9IHJlcXVpcmUoXCJuYXRpdmVzY3JpcHQtcGx1Z2luLWZpcmViYXNlL2FwcFwiKTtcclxuY29uc3QgZmlyZWJhc2VXZWJBcGkgPSByZXF1aXJlKFwibmF0aXZlc2NyaXB0LXBsdWdpbi1maXJlYmFzZS9hcHBcIik7XHJcbmNvbnN0IE1hcEJveCA9IHJlcXVpcmUoXCJuYXRpdmVzY3JpcHQtbWFwYm94XCIpO1xyXG5cclxuLy9pdGVtc1xyXG5pbXBvcnQgeyBJdGVtIH0gZnJvbSAnLi4vaXRlbXMvaXRlbSc7XHJcblxyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgc2VsZWN0b3I6IFwidGFic1wiLFxyXG4gIHRlbXBsYXRlVXJsOiBcIi4vdGFicy90YWJzLmNvbXBvbmVudC5odG1sXCIsXHJcbiAgc3R5bGVVcmxzOltcIi4vdGFicy90YWJzLmNvbXBvbmVudC5jc3NcIl1cclxufSlcclxuZXhwb3J0IGNsYXNzIHRhYnNDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXR7XHJcblxyXG4gLy9pdGVtIGZyb20gY29sbGVjdGlvbiBcclxuICBpdGVtOiBJdGVtID0ge1xyXG4gICAgICB0aXRsZTogJycsXHJcbiAgICAgIGRlc2NyaXB0aW9uOiAnJyxcclxuICAgICAgYWRtaW5wb3N0ZWQ6ICcnLFxyXG4gICAgICBwZXJtaXNzaW9uczogJycsXHJcbiAgICAgIHRpbWU6ICcnLFxyXG4gICAgICBkYXRhdHlwZTogJycsXHJcbiAgICAgIHVybDogJycsXHJcbiAgICAgIG5hbWU6ICcnLFxyXG4gICAgfVxyXG4gIFxyXG5cclxuICBpdGVtczogSXRlbVtdO1xyXG5cclxuXHJcbiAgY29uc3RydWN0b3IocHJpdmF0ZSB6b25lOiBOZ1pvbmUpIHtcclxuICAgIC8vIEFuZ3VsYXJGaXJlTW9kdWxlLmluaXRpYWxpemVBcHAoe30pO1xyXG5cclxuICB9XHJcblxyXG4gIC8vIGluaXRpYWxpemUgdGhlIGZpcmViYXNlIGNvbm5lY3Rpb25cclxuICAvLyBnZXQgZGF0YSBmcm9tIGZpcmVzdG9yZVxyXG4gIG5nT25Jbml0KCk6IHZvaWQge1xyXG4gICAgZmlyZWJhc2UuaW5pdGlhbGl6ZUFwcCh7XHJcbiAgICAgIHBlcnNpc3Q6IGZhbHNlXHJcbiAgICB9KS50aGVuKCgpID0+IHtcclxuICAgICAgY29uc29sZS5sb2coXCJGaXJlYmFzZSBpbml0aWFsaXplZFwiKTtcclxuICAgIH0pO1xyXG5cclxuICAgIHRoaXMuZmlyZXN0b3JlR2V0KCk7XHJcblxyXG4gIH1cclxuXHJcblxyXG4gLy9mdW5jdGlvbiB0byBnZXQgZmlyZWJhc2UgZGF0YVxyXG4gcHVibGljIGZpcmVzdG9yZUdldCgpOiB2b2lkIHtcclxuICAgIGNvbnN0IGNvbGxlY3Rpb25SZWY6IGZpcmVzdG9yZS5Db2xsZWN0aW9uUmVmZXJlbmNlID0gZmlyZWJhc2UuZmlyZXN0b3JlKCkuY29sbGVjdGlvbihcIml0ZW1zXCIpO1xyXG4gICAgY29sbGVjdGlvblJlZi5nZXQoKVxyXG4gICAgICAgIC50aGVuKChxdWVyeVNuYXBzaG90OiBmaXJlc3RvcmUuUXVlcnlTbmFwc2hvdCkgPT4ge1xyXG4gICAgICAgICAgcXVlcnlTbmFwc2hvdC5mb3JFYWNoKGRvYyA9PiB7XHJcblxyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIkl0ZW1zOiAgXCIrYCR7ZG9jLmlkfSA9PiAke0pTT04uc3RyaW5naWZ5KGRvYy5kYXRhKCkpfWApO1xyXG4gICAgICAgICAgICAvLyBzaW5jZSB0aGVyZSdzIGEgcmVmZXJlbmNlIHN0b3JlZCBoZXJlLCB3ZSBjYW4gdXNlIHRoYXQgdG8gcmV0cmlldmUgaXRzIGRhdGEgICAgICAgICAgICBcclxuICAgICAgICAgICAgXHJcblxyXG4gICAgICAgICAgICAvL3RoaXMuaXRlbXMucHVzaChcclxuICAgICAgICAgICAgLy8gICBuZXcgSXRlbShcIkJvYlwiLCBcIlwiLCBcIkRldmVsb3BlclwiLCBcIjEwMFwiLCBcImdpdGh1Yi5jb21cIik7IFxyXG4gICAgICAgICAgICAvLykgICAgICAgICAgICAvL3NldCBkYXRhIHRvIHZhcmlhYmxlc1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgdGhpcy5pdGVtLnRpdGxlID0gZG9jLmRhdGEoKS50aXRsZTtcclxuICAgICAgICAgICAgdGhpcy5pdGVtLmRlc2NyaXB0aW9uID0gZG9jLmRhdGEoKS5kZXNjcmlwdGlvbjtcclxuICAgICAgICAgICAgdGhpcy5pdGVtLmRhdGF0eXBlID0gZG9jLmRhdGEoKS5kYXRhdHlwZTtcclxuICAgICAgICAgICAgdGhpcy5pdGVtLnBlcm1pc3Npb25zID0gZG9jLmRhdGEoKS5wZXJtaXNzaW9ucztcclxuICAgICAgICAgICAgdGhpcy5pdGVtLm5hbWUgPSBkb2MuZGF0YSgpLm5hbWU7XHJcbiAgICAgICAgICAgIHRoaXMuaXRlbS5hZG1pbnBvc3RlZCA9IGRvYy5kYXRhKCkuYWRtaW5wb3N0ZWQ7XHJcbiAgICAgICAgICAgIHRoaXMuaXRlbS50aW1lID0gZG9jLmRhdGEoKS50aW1lO1xyXG4gICAgICAgICAgICB0aGlzLml0ZW0udXJsID0gZG9jLmRhdGEoKS51cmw7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiVXBkYXRpbmcgRGF0YVwiKTtcclxuXHJcbiAgICAgICAgICB9KTtcclxuICAgICAgICB9KVxyXG4gICAgICAgIC5jYXRjaChlcnIgPT4gY29uc29sZS5sb2coKSk7XHJcbiAgICAgICAgICAvL2NvbnNvbGUubG9nKFwiVGhpcyBpcyB0aGUgc2Vjb25kIGxvZzogXCIrXCJHZXQgZmFpbGVkLCBlcnJvclwiICsgZXJyKSk7ICAgICAgICAgXHJcblxyXG4gIH1cclxuICBcclxufVxyXG5cclxuIl19