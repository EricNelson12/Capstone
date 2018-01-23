"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var element_registry_1 = require("nativescript-angular/element-registry");
element_registry_1.registerElement("PullToRefresh", function () { return require("nativescript-pulltorefresh").PullToRefresh; });
//firebase
var Observable_1 = require("rxjs/Observable");
var firebase = require("nativescript-plugin-firebase/app");
var firebaseWebApi = require("nativescript-plugin-firebase/app");
var MapBox = require("nativescript-mapbox");
var tabsComponent = (function () {
    function tabsComponent(zone) {
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
        this.cities = [];
        // AngularFireModule.initializeApp({});
    }
    // initialize the firebase connection
    // get data from firestore
    tabsComponent.prototype.ngOnInit = function () {
        firebase.initializeApp({
            persist: false
        }).then(function () {
            console.log("Firebase initialized");
        });
        this.firestoreCollectionObservable();
    };
    tabsComponent.prototype.refreshList = function (args) {
        var pullRefresh = args.object;
        setTimeout(function () {
            pullRefresh.refreshing = false;
        }, 1000);
    };
    tabsComponent.prototype.firestoreCollectionObservable = function () {
        var _this = this;
        this.myCities$ = Observable_1.Observable.create(function (subscriber) {
            var colRef = firebase.firestore().collection("items");
            colRef.onSnapshot(function (snapshot) {
                _this.zone.run(function () {
                    _this.cities = [];
                    snapshot.forEach(function (docSnap) { return _this.cities.push(docSnap.data()); });
                    subscriber.next(_this.cities);
                });
            });
        });
    };
    //function to get firebase data
    tabsComponent.prototype.firestoreGet = function () {
        var _this = this;
        var collectionRef = firebase.firestore().collection("items");
        collectionRef.get()
            .then(function (querySnapshot) {
            querySnapshot.forEach(function (doc) {
                //console.log("Items:  "+`${doc.id} => ${JSON.stringify(doc.data())}`);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFicy5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJ0YWJzLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUF1RDtBQUt2RCwwRUFBd0U7QUFDeEUsa0NBQWUsQ0FBQyxlQUFlLEVBQUUsY0FBTSxPQUFBLE9BQU8sQ0FBQyw0QkFBNEIsQ0FBQyxDQUFDLGFBQWEsRUFBbkQsQ0FBbUQsQ0FBQyxDQUFDO0FBRzVGLFVBQVU7QUFDViw4Q0FBNkM7QUFFN0MsSUFBTSxRQUFRLEdBQUcsT0FBTyxDQUFDLGtDQUFrQyxDQUFDLENBQUM7QUFDN0QsSUFBTSxjQUFjLEdBQUcsT0FBTyxDQUFDLGtDQUFrQyxDQUFDLENBQUM7QUFDbkUsSUFBTSxNQUFNLEdBQUcsT0FBTyxDQUFDLHFCQUFxQixDQUFDLENBQUM7QUFnQjlDO0lBdUJFLHVCQUFvQixJQUFZO1FBQVosU0FBSSxHQUFKLElBQUksQ0FBUTtRQXJCakMsdUJBQXVCO1FBQ3RCLFNBQUksR0FBUztZQUNULEtBQUssRUFBRSxFQUFFO1lBQ1QsV0FBVyxFQUFFLEVBQUU7WUFDZixXQUFXLEVBQUUsRUFBRTtZQUNmLFdBQVcsRUFBRSxFQUFFO1lBQ2YsSUFBSSxFQUFFLEVBQUU7WUFDUixRQUFRLEVBQUUsRUFBRTtZQUNaLEdBQUcsRUFBRSxFQUFFO1lBQ1AsSUFBSSxFQUFFLEVBQUU7U0FDVCxDQUFBO1FBTUssV0FBTSxHQUFnQixFQUFFLENBQUM7UUFNL0IsdUNBQXVDO0lBQ3pDLENBQUM7SUFFRCxxQ0FBcUM7SUFDckMsMEJBQTBCO0lBQzFCLGdDQUFRLEdBQVI7UUFDRSxRQUFRLENBQUMsYUFBYSxDQUFDO1lBQ3JCLE9BQU8sRUFBRSxLQUFLO1NBQ2YsQ0FBQyxDQUFDLElBQUksQ0FBQztZQUNOLE9BQU8sQ0FBQyxHQUFHLENBQUMsc0JBQXNCLENBQUMsQ0FBQztRQUN0QyxDQUFDLENBQUMsQ0FBQztRQUVGLElBQUksQ0FBQyw2QkFBNkIsRUFBRSxDQUFDO0lBRXhDLENBQUM7SUFJRCxtQ0FBVyxHQUFYLFVBQVksSUFBSTtRQUNULElBQUksV0FBVyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUM7UUFDOUIsVUFBVSxDQUFDO1lBQ1IsV0FBVyxDQUFDLFVBQVUsR0FBRyxLQUFLLENBQUM7UUFDbEMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQ2QsQ0FBQztJQUVILHFEQUE2QixHQUE3QjtRQUFBLGlCQVdDO1FBVkMsSUFBSSxDQUFDLFNBQVMsR0FBRyx1QkFBVSxDQUFDLE1BQU0sQ0FBQyxVQUFBLFVBQVU7WUFDM0MsSUFBTSxNQUFNLEdBQWtDLFFBQVEsQ0FBQyxTQUFTLEVBQUUsQ0FBQyxVQUFVLENBQUMsT0FBTyxDQUFDLENBQUM7WUFDdkYsTUFBTSxDQUFDLFVBQVUsQ0FBQyxVQUFDLFFBQWlDO2dCQUNsRCxLQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQztvQkFDWixLQUFJLENBQUMsTUFBTSxHQUFHLEVBQUUsQ0FBQztvQkFDakIsUUFBUSxDQUFDLE9BQU8sQ0FBQyxVQUFBLE9BQU8sSUFBSSxPQUFBLEtBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFPLE9BQU8sQ0FBQyxJQUFJLEVBQUUsQ0FBQyxFQUF0QyxDQUFzQyxDQUFDLENBQUM7b0JBQ3BFLFVBQVUsQ0FBQyxJQUFJLENBQUMsS0FBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO2dCQUMvQixDQUFDLENBQUMsQ0FBQztZQUNMLENBQUMsQ0FBQyxDQUFDO1FBQ0wsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDO0lBSUYsK0JBQStCO0lBQ3hCLG9DQUFZLEdBQW5CO1FBQUEsaUJBdUJFO1FBdEJDLElBQU0sYUFBYSxHQUFrQyxRQUFRLENBQUMsU0FBUyxFQUFFLENBQUMsVUFBVSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQzlGLGFBQWEsQ0FBQyxHQUFHLEVBQUU7YUFDZCxJQUFJLENBQUMsVUFBQyxhQUFzQztZQUMzQyxhQUFhLENBQUMsT0FBTyxDQUFDLFVBQUEsR0FBRztnQkFFdkIsdUVBQXVFO2dCQUd2RSxLQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssR0FBRyxHQUFHLENBQUMsSUFBSSxFQUFFLENBQUMsS0FBSyxDQUFDO2dCQUNuQyxLQUFJLENBQUMsSUFBSSxDQUFDLFdBQVcsR0FBRyxHQUFHLENBQUMsSUFBSSxFQUFFLENBQUMsV0FBVyxDQUFDO2dCQUMvQyxLQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsR0FBRyxHQUFHLENBQUMsSUFBSSxFQUFFLENBQUMsUUFBUSxDQUFDO2dCQUN6QyxLQUFJLENBQUMsSUFBSSxDQUFDLFdBQVcsR0FBRyxHQUFHLENBQUMsSUFBSSxFQUFFLENBQUMsV0FBVyxDQUFDO2dCQUMvQyxLQUFJLENBQUMsSUFBSSxDQUFDLElBQUksR0FBRyxHQUFHLENBQUMsSUFBSSxFQUFFLENBQUMsSUFBSSxDQUFDO2dCQUNqQyxLQUFJLENBQUMsSUFBSSxDQUFDLFdBQVcsR0FBRyxHQUFHLENBQUMsSUFBSSxFQUFFLENBQUMsV0FBVyxDQUFDO2dCQUMvQyxLQUFJLENBQUMsSUFBSSxDQUFDLElBQUksR0FBRyxHQUFHLENBQUMsSUFBSSxFQUFFLENBQUMsSUFBSSxDQUFDO2dCQUNqQyxLQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsR0FBRyxHQUFHLENBQUMsSUFBSSxFQUFFLENBQUMsR0FBRyxDQUFDO2dCQUMvQixPQUFPLENBQUMsR0FBRyxDQUFDLGVBQWUsQ0FBQyxDQUFDO1lBRS9CLENBQUMsQ0FBQyxDQUFDO1FBQ0wsQ0FBQyxDQUFDO2FBQ0QsS0FBSyxDQUFDLFVBQUEsR0FBRyxJQUFJLE9BQUEsT0FBTyxDQUFDLEdBQUcsRUFBRSxFQUFiLENBQWEsQ0FBQyxDQUFDO1FBQzNCLDhFQUE4RTtJQUN0RixDQUFDO0lBeEZVLGFBQWE7UUFMekIsZ0JBQVMsQ0FBQztZQUNULFFBQVEsRUFBRSxNQUFNO1lBQ2hCLFdBQVcsRUFBRSw0QkFBNEI7WUFDekMsU0FBUyxFQUFDLENBQUMsMkJBQTJCLENBQUM7U0FDeEMsQ0FBQzt5Q0F3QjBCLGFBQU07T0F2QnJCLGFBQWEsQ0EwRnpCO0lBQUQsb0JBQUM7Q0FBQSxBQTFGRCxJQTBGQztBQTFGWSxzQ0FBYSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7Q29tcG9uZW50LE9uSW5pdCxOZ1pvbmUgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuaW1wb3J0ICogYXMgbGlzdFZpZXdNb2R1bGUgZnJvbSBcInRucy1jb3JlLW1vZHVsZXMvdWkvbGlzdC12aWV3XCI7XG5pbXBvcnQgKiBhcyBJbWFnZU1vZHVsZSBmcm9tIFwidG5zLWNvcmUtbW9kdWxlcy91aS9pbWFnZVwiO1xuaW1wb3J0IHsgSW1hZ2UgfSBmcm9tIFwidG5zLWNvcmUtbW9kdWxlcy91aS9pbWFnZVwiO1xuaW1wb3J0IHsgSW5mb30gZnJvbSAnLi9pbmZvJztcbmltcG9ydCB7IHJlZ2lzdGVyRWxlbWVudCB9IGZyb20gXCJuYXRpdmVzY3JpcHQtYW5ndWxhci9lbGVtZW50LXJlZ2lzdHJ5XCI7XG5yZWdpc3RlckVsZW1lbnQoXCJQdWxsVG9SZWZyZXNoXCIsICgpID0+IHJlcXVpcmUoXCJuYXRpdmVzY3JpcHQtcHVsbHRvcmVmcmVzaFwiKS5QdWxsVG9SZWZyZXNoKTtcbiBcblxuLy9maXJlYmFzZVxuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gXCJyeGpzL09ic2VydmFibGVcIjtcbmltcG9ydCB7IGZpcmVzdG9yZSB9IGZyb20gXCJuYXRpdmVzY3JpcHQtcGx1Z2luLWZpcmViYXNlXCI7XG5jb25zdCBmaXJlYmFzZSA9IHJlcXVpcmUoXCJuYXRpdmVzY3JpcHQtcGx1Z2luLWZpcmViYXNlL2FwcFwiKTtcbmNvbnN0IGZpcmViYXNlV2ViQXBpID0gcmVxdWlyZShcIm5hdGl2ZXNjcmlwdC1wbHVnaW4tZmlyZWJhc2UvYXBwXCIpO1xuY29uc3QgTWFwQm94ID0gcmVxdWlyZShcIm5hdGl2ZXNjcmlwdC1tYXBib3hcIik7XG5cbi8vaXRlbXNcbmltcG9ydCB7IEl0ZW0gfSBmcm9tICcuLi9pdGVtcy9pdGVtJztcblxuZXhwb3J0IGludGVyZmFjZSBDaXR5IHtcbiAgY291bnRyeTogc3RyaW5nO1xuICBuYW1lOiBzdHJpbmc7XG4gIHBvcHVsYXRpb246IG51bWJlcjtcbn1cblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiBcInRhYnNcIixcbiAgdGVtcGxhdGVVcmw6IFwiLi90YWJzL3RhYnMuY29tcG9uZW50Lmh0bWxcIixcbiAgc3R5bGVVcmxzOltcIi4vdGFicy90YWJzLmNvbXBvbmVudC5jc3NcIl1cbn0pXG5leHBvcnQgY2xhc3MgdGFic0NvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdHtcblxuIC8vaXRlbSBmcm9tIGNvbGxlY3Rpb24gXG4gIGl0ZW06IEl0ZW0gPSB7XG4gICAgICB0aXRsZTogJycsXG4gICAgICBkZXNjcmlwdGlvbjogJycsXG4gICAgICBhZG1pbnBvc3RlZDogJycsXG4gICAgICBwZXJtaXNzaW9uczogJycsXG4gICAgICB0aW1lOiAnJyxcbiAgICAgIGRhdGF0eXBlOiAnJyxcbiAgICAgIHVybDogJycsXG4gICAgICBuYW1lOiAnJyxcbiAgICB9XG4gIFxuXG4gIHB1YmxpYyBteUNpdHkkOiBPYnNlcnZhYmxlPENpdHk+O1xuICBwdWJsaWMgbXlDaXRpZXMkOiBPYnNlcnZhYmxlPEFycmF5PENpdHk+PjtcbiAgcHJpdmF0ZSBjaXR5OiBDaXR5O1xuICBwcml2YXRlIGNpdGllczogQXJyYXk8Q2l0eT4gPSBbXTtcblxuICBpdGVtczogSXRlbVtdO1xuXG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSB6b25lOiBOZ1pvbmUpIHtcbiAgICAvLyBBbmd1bGFyRmlyZU1vZHVsZS5pbml0aWFsaXplQXBwKHt9KTtcbiAgfVxuXG4gIC8vIGluaXRpYWxpemUgdGhlIGZpcmViYXNlIGNvbm5lY3Rpb25cbiAgLy8gZ2V0IGRhdGEgZnJvbSBmaXJlc3RvcmVcbiAgbmdPbkluaXQoKTogdm9pZCB7XG4gICAgZmlyZWJhc2UuaW5pdGlhbGl6ZUFwcCh7XG4gICAgICBwZXJzaXN0OiBmYWxzZVxuICAgIH0pLnRoZW4oKCkgPT4ge1xuICAgICAgY29uc29sZS5sb2coXCJGaXJlYmFzZSBpbml0aWFsaXplZFwiKTtcbiAgICB9KTtcblxuICAgICB0aGlzLmZpcmVzdG9yZUNvbGxlY3Rpb25PYnNlcnZhYmxlKCk7XG5cbiAgfVxuXG5cblxuICByZWZyZXNoTGlzdChhcmdzKSB7XG4gICAgICAgICB2YXIgcHVsbFJlZnJlc2ggPSBhcmdzLm9iamVjdDtcbiAgICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcHVsbFJlZnJlc2gucmVmcmVzaGluZyA9IGZhbHNlO1xuICAgICAgICAgfSwgMTAwMCk7XG4gICAgfVxuXG4gIGZpcmVzdG9yZUNvbGxlY3Rpb25PYnNlcnZhYmxlKCk6IHZvaWQge1xuICAgIHRoaXMubXlDaXRpZXMkID0gT2JzZXJ2YWJsZS5jcmVhdGUoc3Vic2NyaWJlciA9PiB7XG4gICAgICBjb25zdCBjb2xSZWY6IGZpcmVzdG9yZS5Db2xsZWN0aW9uUmVmZXJlbmNlID0gZmlyZWJhc2UuZmlyZXN0b3JlKCkuY29sbGVjdGlvbihcIml0ZW1zXCIpO1xuICAgICAgY29sUmVmLm9uU25hcHNob3QoKHNuYXBzaG90OiBmaXJlc3RvcmUuUXVlcnlTbmFwc2hvdCkgPT4ge1xuICAgICAgICB0aGlzLnpvbmUucnVuKCgpID0+IHtcbiAgICAgICAgICB0aGlzLmNpdGllcyA9IFtdO1xuICAgICAgICAgIHNuYXBzaG90LmZvckVhY2goZG9jU25hcCA9PiB0aGlzLmNpdGllcy5wdXNoKDxDaXR5PmRvY1NuYXAuZGF0YSgpKSk7XG4gICAgICAgICAgc3Vic2NyaWJlci5uZXh0KHRoaXMuY2l0aWVzKTtcbiAgICAgICAgfSk7XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfVxuXG5cblxuIC8vZnVuY3Rpb24gdG8gZ2V0IGZpcmViYXNlIGRhdGFcbiBwdWJsaWMgZmlyZXN0b3JlR2V0KCk6IHZvaWQge1xuICAgIGNvbnN0IGNvbGxlY3Rpb25SZWY6IGZpcmVzdG9yZS5Db2xsZWN0aW9uUmVmZXJlbmNlID0gZmlyZWJhc2UuZmlyZXN0b3JlKCkuY29sbGVjdGlvbihcIml0ZW1zXCIpO1xuICAgIGNvbGxlY3Rpb25SZWYuZ2V0KClcbiAgICAgICAgLnRoZW4oKHF1ZXJ5U25hcHNob3Q6IGZpcmVzdG9yZS5RdWVyeVNuYXBzaG90KSA9PiB7XG4gICAgICAgICAgcXVlcnlTbmFwc2hvdC5mb3JFYWNoKGRvYyA9PiB7XG5cbiAgICAgICAgICAgIC8vY29uc29sZS5sb2coXCJJdGVtczogIFwiK2Ake2RvYy5pZH0gPT4gJHtKU09OLnN0cmluZ2lmeShkb2MuZGF0YSgpKX1gKTtcbiAgICAgICAgICAgXG4gICAgICAgICAgICBcbiAgICAgICAgICAgIHRoaXMuaXRlbS50aXRsZSA9IGRvYy5kYXRhKCkudGl0bGU7XG4gICAgICAgICAgICB0aGlzLml0ZW0uZGVzY3JpcHRpb24gPSBkb2MuZGF0YSgpLmRlc2NyaXB0aW9uO1xuICAgICAgICAgICAgdGhpcy5pdGVtLmRhdGF0eXBlID0gZG9jLmRhdGEoKS5kYXRhdHlwZTtcbiAgICAgICAgICAgIHRoaXMuaXRlbS5wZXJtaXNzaW9ucyA9IGRvYy5kYXRhKCkucGVybWlzc2lvbnM7XG4gICAgICAgICAgICB0aGlzLml0ZW0ubmFtZSA9IGRvYy5kYXRhKCkubmFtZTtcbiAgICAgICAgICAgIHRoaXMuaXRlbS5hZG1pbnBvc3RlZCA9IGRvYy5kYXRhKCkuYWRtaW5wb3N0ZWQ7XG4gICAgICAgICAgICB0aGlzLml0ZW0udGltZSA9IGRvYy5kYXRhKCkudGltZTtcbiAgICAgICAgICAgIHRoaXMuaXRlbS51cmwgPSBkb2MuZGF0YSgpLnVybDtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiVXBkYXRpbmcgRGF0YVwiKTtcblxuICAgICAgICAgIH0pO1xuICAgICAgICB9KVxuICAgICAgICAuY2F0Y2goZXJyID0+IGNvbnNvbGUubG9nKCkpO1xuICAgICAgICAgIC8vY29uc29sZS5sb2coXCJUaGlzIGlzIHRoZSBzZWNvbmQgbG9nOiBcIitcIkdldCBmYWlsZWQsIGVycm9yXCIgKyBlcnIpKTsgICAgICAgICBcbiAgfVxuICBcbn1cbiJdfQ==