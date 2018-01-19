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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFicy5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJ0YWJzLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUF1RDtBQVV2RCxJQUFNLFFBQVEsR0FBRyxPQUFPLENBQUMsa0NBQWtDLENBQUMsQ0FBQztBQUM3RCxJQUFNLGNBQWMsR0FBRyxPQUFPLENBQUMsa0NBQWtDLENBQUMsQ0FBQztBQUNuRSxJQUFNLE1BQU0sR0FBRyxPQUFPLENBQUMscUJBQXFCLENBQUMsQ0FBQztBQVc5QztJQWtCRSx1QkFBb0IsSUFBWTtRQUM5Qix1Q0FBdUM7UUFEckIsU0FBSSxHQUFKLElBQUksQ0FBUTtRQWhCakMsdUJBQXVCO1FBQ3RCLFNBQUksR0FBUztZQUNULEtBQUssRUFBRSxFQUFFO1lBQ1QsV0FBVyxFQUFFLEVBQUU7WUFDZixXQUFXLEVBQUUsRUFBRTtZQUNmLFdBQVcsRUFBRSxFQUFFO1lBQ2YsSUFBSSxFQUFFLEVBQUU7WUFDUixRQUFRLEVBQUUsRUFBRTtZQUNaLEdBQUcsRUFBRSxFQUFFO1lBQ1AsSUFBSSxFQUFFLEVBQUU7U0FDVCxDQUFBO0lBU0gsQ0FBQztJQUVELHFDQUFxQztJQUNyQywwQkFBMEI7SUFDMUIsZ0NBQVEsR0FBUjtRQUNFLFFBQVEsQ0FBQyxhQUFhLENBQUM7WUFDckIsT0FBTyxFQUFFLEtBQUs7U0FDZixDQUFDLENBQUMsSUFBSSxDQUFDO1lBQ04sT0FBTyxDQUFDLEdBQUcsQ0FBQyxzQkFBc0IsQ0FBQyxDQUFDO1FBQ3RDLENBQUMsQ0FBQyxDQUFDO1FBRUgsSUFBSSxDQUFDLFlBQVksRUFBRSxDQUFDO0lBRXRCLENBQUM7SUFHRiwrQkFBK0I7SUFDeEIsb0NBQVksR0FBbkI7UUFBQSxpQkE2QkU7UUE1QkMsSUFBTSxhQUFhLEdBQWtDLFFBQVEsQ0FBQyxTQUFTLEVBQUUsQ0FBQyxVQUFVLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDOUYsYUFBYSxDQUFDLEdBQUcsRUFBRTthQUNkLElBQUksQ0FBQyxVQUFDLGFBQXNDO1lBQzNDLGFBQWEsQ0FBQyxPQUFPLENBQUMsVUFBQSxHQUFHO2dCQUV2QixPQUFPLENBQUMsR0FBRyxDQUFDLFVBQVUsSUFBSSxHQUFHLENBQUMsRUFBRSxZQUFPLElBQUksQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLElBQUksRUFBRSxDQUFHLENBQUEsQ0FBQyxDQUFDO2dCQUNyRSwwRkFBMEY7Z0JBRzFGLGtCQUFrQjtnQkFDbEIsNERBQTREO2dCQUM1RCxzQ0FBc0M7Z0JBRXRDLEtBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxHQUFHLEdBQUcsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxLQUFLLENBQUM7Z0JBQ25DLEtBQUksQ0FBQyxJQUFJLENBQUMsV0FBVyxHQUFHLEdBQUcsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxXQUFXLENBQUM7Z0JBQy9DLEtBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxHQUFHLEdBQUcsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxRQUFRLENBQUM7Z0JBQ3pDLEtBQUksQ0FBQyxJQUFJLENBQUMsV0FBVyxHQUFHLEdBQUcsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxXQUFXLENBQUM7Z0JBQy9DLEtBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxHQUFHLEdBQUcsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxJQUFJLENBQUM7Z0JBQ2pDLEtBQUksQ0FBQyxJQUFJLENBQUMsV0FBVyxHQUFHLEdBQUcsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxXQUFXLENBQUM7Z0JBQy9DLEtBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxHQUFHLEdBQUcsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxJQUFJLENBQUM7Z0JBQ2pDLEtBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxHQUFHLEdBQUcsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxHQUFHLENBQUM7Z0JBQy9CLE9BQU8sQ0FBQyxHQUFHLENBQUMsZUFBZSxDQUFDLENBQUM7WUFFL0IsQ0FBQyxDQUFDLENBQUM7UUFDTCxDQUFDLENBQUM7YUFDRCxLQUFLLENBQUMsVUFBQSxHQUFHLElBQUksT0FBQSxPQUFPLENBQUMsR0FBRyxFQUFFLEVBQWIsQ0FBYSxDQUFDLENBQUM7UUFDM0IsOEVBQThFO0lBRXRGLENBQUM7SUFuRVUsYUFBYTtRQUx6QixnQkFBUyxDQUFDO1lBQ1QsUUFBUSxFQUFFLE1BQU07WUFDaEIsV0FBVyxFQUFFLDRCQUE0QjtZQUN6QyxTQUFTLEVBQUMsQ0FBQywyQkFBMkIsQ0FBQztTQUN4QyxDQUFDO3lDQW1CMEIsYUFBTTtPQWxCckIsYUFBYSxDQXFFekI7SUFBRCxvQkFBQztDQUFBLEFBckVELElBcUVDO0FBckVZLHNDQUFhIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtDb21wb25lbnQsT25Jbml0LE5nWm9uZSB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5pbXBvcnQgKiBhcyBsaXN0Vmlld01vZHVsZSBmcm9tIFwidG5zLWNvcmUtbW9kdWxlcy91aS9saXN0LXZpZXdcIjtcbmltcG9ydCAqIGFzIEltYWdlTW9kdWxlIGZyb20gXCJ0bnMtY29yZS1tb2R1bGVzL3VpL2ltYWdlXCI7XG5pbXBvcnQgeyBJbWFnZSB9IGZyb20gXCJ0bnMtY29yZS1tb2R1bGVzL3VpL2ltYWdlXCI7XG5pbXBvcnQgeyBJbmZvfSBmcm9tICcuL2luZm8nO1xuXG5cbi8vZmlyZWJhc2VcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tIFwicnhqcy9PYnNlcnZhYmxlXCI7XG5pbXBvcnQgeyBmaXJlc3RvcmUgfSBmcm9tIFwibmF0aXZlc2NyaXB0LXBsdWdpbi1maXJlYmFzZVwiO1xuY29uc3QgZmlyZWJhc2UgPSByZXF1aXJlKFwibmF0aXZlc2NyaXB0LXBsdWdpbi1maXJlYmFzZS9hcHBcIik7XG5jb25zdCBmaXJlYmFzZVdlYkFwaSA9IHJlcXVpcmUoXCJuYXRpdmVzY3JpcHQtcGx1Z2luLWZpcmViYXNlL2FwcFwiKTtcbmNvbnN0IE1hcEJveCA9IHJlcXVpcmUoXCJuYXRpdmVzY3JpcHQtbWFwYm94XCIpO1xuXG4vL2l0ZW1zXG5pbXBvcnQgeyBJdGVtIH0gZnJvbSAnLi4vaXRlbXMvaXRlbSc7XG5cblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiBcInRhYnNcIixcbiAgdGVtcGxhdGVVcmw6IFwiLi90YWJzL3RhYnMuY29tcG9uZW50Lmh0bWxcIixcbiAgc3R5bGVVcmxzOltcIi4vdGFicy90YWJzLmNvbXBvbmVudC5jc3NcIl1cbn0pXG5leHBvcnQgY2xhc3MgdGFic0NvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdHtcblxuIC8vaXRlbSBmcm9tIGNvbGxlY3Rpb24gXG4gIGl0ZW06IEl0ZW0gPSB7XG4gICAgICB0aXRsZTogJycsXG4gICAgICBkZXNjcmlwdGlvbjogJycsXG4gICAgICBhZG1pbnBvc3RlZDogJycsXG4gICAgICBwZXJtaXNzaW9uczogJycsXG4gICAgICB0aW1lOiAnJyxcbiAgICAgIGRhdGF0eXBlOiAnJyxcbiAgICAgIHVybDogJycsXG4gICAgICBuYW1lOiAnJyxcbiAgICB9XG4gIFxuXG4gIGl0ZW1zOiBJdGVtW107XG5cblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIHpvbmU6IE5nWm9uZSkge1xuICAgIC8vIEFuZ3VsYXJGaXJlTW9kdWxlLmluaXRpYWxpemVBcHAoe30pO1xuXG4gIH1cblxuICAvLyBpbml0aWFsaXplIHRoZSBmaXJlYmFzZSBjb25uZWN0aW9uXG4gIC8vIGdldCBkYXRhIGZyb20gZmlyZXN0b3JlXG4gIG5nT25Jbml0KCk6IHZvaWQge1xuICAgIGZpcmViYXNlLmluaXRpYWxpemVBcHAoe1xuICAgICAgcGVyc2lzdDogZmFsc2VcbiAgICB9KS50aGVuKCgpID0+IHtcbiAgICAgIGNvbnNvbGUubG9nKFwiRmlyZWJhc2UgaW5pdGlhbGl6ZWRcIik7XG4gICAgfSk7XG5cbiAgICB0aGlzLmZpcmVzdG9yZUdldCgpO1xuXG4gIH1cblxuXG4gLy9mdW5jdGlvbiB0byBnZXQgZmlyZWJhc2UgZGF0YVxuIHB1YmxpYyBmaXJlc3RvcmVHZXQoKTogdm9pZCB7XG4gICAgY29uc3QgY29sbGVjdGlvblJlZjogZmlyZXN0b3JlLkNvbGxlY3Rpb25SZWZlcmVuY2UgPSBmaXJlYmFzZS5maXJlc3RvcmUoKS5jb2xsZWN0aW9uKFwiaXRlbXNcIik7XG4gICAgY29sbGVjdGlvblJlZi5nZXQoKVxuICAgICAgICAudGhlbigocXVlcnlTbmFwc2hvdDogZmlyZXN0b3JlLlF1ZXJ5U25hcHNob3QpID0+IHtcbiAgICAgICAgICBxdWVyeVNuYXBzaG90LmZvckVhY2goZG9jID0+IHtcblxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJJdGVtczogIFwiK2Ake2RvYy5pZH0gPT4gJHtKU09OLnN0cmluZ2lmeShkb2MuZGF0YSgpKX1gKTtcbiAgICAgICAgICAgIC8vIHNpbmNlIHRoZXJlJ3MgYSByZWZlcmVuY2Ugc3RvcmVkIGhlcmUsIHdlIGNhbiB1c2UgdGhhdCB0byByZXRyaWV2ZSBpdHMgZGF0YSAgICAgICAgICAgIFxuICAgICAgICAgICAgXG5cbiAgICAgICAgICAgIC8vdGhpcy5pdGVtcy5wdXNoKFxuICAgICAgICAgICAgLy8gICBuZXcgSXRlbShcIkJvYlwiLCBcIlwiLCBcIkRldmVsb3BlclwiLCBcIjEwMFwiLCBcImdpdGh1Yi5jb21cIik7IFxuICAgICAgICAgICAgLy8pICAgICAgICAgICAgLy9zZXQgZGF0YSB0byB2YXJpYWJsZXNcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgdGhpcy5pdGVtLnRpdGxlID0gZG9jLmRhdGEoKS50aXRsZTtcbiAgICAgICAgICAgIHRoaXMuaXRlbS5kZXNjcmlwdGlvbiA9IGRvYy5kYXRhKCkuZGVzY3JpcHRpb247XG4gICAgICAgICAgICB0aGlzLml0ZW0uZGF0YXR5cGUgPSBkb2MuZGF0YSgpLmRhdGF0eXBlO1xuICAgICAgICAgICAgdGhpcy5pdGVtLnBlcm1pc3Npb25zID0gZG9jLmRhdGEoKS5wZXJtaXNzaW9ucztcbiAgICAgICAgICAgIHRoaXMuaXRlbS5uYW1lID0gZG9jLmRhdGEoKS5uYW1lO1xuICAgICAgICAgICAgdGhpcy5pdGVtLmFkbWlucG9zdGVkID0gZG9jLmRhdGEoKS5hZG1pbnBvc3RlZDtcbiAgICAgICAgICAgIHRoaXMuaXRlbS50aW1lID0gZG9jLmRhdGEoKS50aW1lO1xuICAgICAgICAgICAgdGhpcy5pdGVtLnVybCA9IGRvYy5kYXRhKCkudXJsO1xuICAgICAgICAgICAgY29uc29sZS5sb2coXCJVcGRhdGluZyBEYXRhXCIpO1xuXG4gICAgICAgICAgfSk7XG4gICAgICAgIH0pXG4gICAgICAgIC5jYXRjaChlcnIgPT4gY29uc29sZS5sb2coKSk7XG4gICAgICAgICAgLy9jb25zb2xlLmxvZyhcIlRoaXMgaXMgdGhlIHNlY29uZCBsb2c6IFwiK1wiR2V0IGZhaWxlZCwgZXJyb3JcIiArIGVycikpOyAgICAgICAgIFxuXG4gIH1cbiAgXG59XG5cbiJdfQ==