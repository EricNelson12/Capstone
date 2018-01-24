"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var angular_1 = require("nativescript-pro-ui/sidedrawer/angular");
var SideComponent = (function () {
    function SideComponent(_changeDetectionRef) {
        this._changeDetectionRef = _changeDetectionRef;
        this.firebase = require("nativescript-plugin-firebase");
        this.isProf = false;
    }
    SideComponent.prototype.ngAfterViewInit = function () {
        this.drawer = this.drawerComponent.sideDrawer;
        this._changeDetectionRef.detectChanges();
    };
    SideComponent.prototype.onSearchLayoutLoaded = function (event) {
        if (event.object.android) {
            event.object.android.setFocusableInTouchMode(true);
        }
    };
    SideComponent.prototype.onSearchBarLoaded = function (event) {
        if (event.object.android) {
            event.object.android.clearFocus();
        }
    };
    SideComponent.prototype.ngOnInit = function () {
    };
    SideComponent.prototype.notificationSwitch = function (args) {
        var pushSwitch = args.object;
        if (pushSwitch.checked) {
            this.firebase.subscribeToTopic("news");
            if (this.isProf) {
                this.firebase.subscribeToTopic("prof");
            }
        }
        else {
            this.firebase.unsubscribeFromTopic("news");
            if (this.isProf) {
                this.firebase.unsubscribeFromTopic("prof");
            }
        }
        console.log("Notifications switch on: " + pushSwitch.checked);
    };
    SideComponent.prototype.professionalSwitch = function (args) {
        var profSwitch = args.object;
        if (profSwitch.checked) {
            this.isProf = true;
            this.firebase.subscribeToTopic("prof");
        }
        else {
            this.isProf = false;
            this.firebase.unsubscribeFromTopic("prof");
        }
        console.log("Professional switch on: " + profSwitch.checked);
    };
    Object.defineProperty(SideComponent.prototype, "mainContentText", {
        get: function () {
            return this._mainContentText;
        },
        set: function (value) {
            this._mainContentText = value;
        },
        enumerable: true,
        configurable: true
    });
    SideComponent.prototype.openDrawer = function () {
        this.drawer.toggleDrawerState();
    };
    SideComponent.prototype.onCloseDrawerTap = function () {
        this.drawer.closeDrawer();
    };
    __decorate([
        core_1.ViewChild(angular_1.RadSideDrawerComponent),
        __metadata("design:type", angular_1.RadSideDrawerComponent)
    ], SideComponent.prototype, "drawerComponent", void 0);
    SideComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: "side",
            templateUrl: 'side.component.html',
            styleUrls: ['side.component.css']
        }),
        __metadata("design:paramtypes", [core_1.ChangeDetectorRef])
    ], SideComponent);
    return SideComponent;
}());
exports.SideComponent = SideComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2lkZS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJzaWRlLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUNBLHNDQUErRjtBQUkvRixrRUFBZ0c7QUFXaEc7SUFNSSx1QkFBb0IsbUJBQXNDO1FBQXRDLHdCQUFtQixHQUFuQixtQkFBbUIsQ0FBbUI7UUFKMUQsYUFBUSxHQUFHLE9BQU8sQ0FBQyw4QkFBOEIsQ0FBQyxDQUFDO1FBRTVDLFdBQU0sR0FBWSxLQUFLLENBQUM7SUFHL0IsQ0FBQztJQUtELHVDQUFlLEdBQWY7UUFDSSxJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxlQUFlLENBQUMsVUFBVSxDQUFDO1FBQzlDLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxhQUFhLEVBQUUsQ0FBQztJQUM3QyxDQUFDO0lBRUQsNENBQW9CLEdBQXBCLFVBQXFCLEtBQUs7UUFDdEIsRUFBRSxDQUFDLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO1lBQ3ZCLEtBQUssQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLHVCQUF1QixDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ3ZELENBQUM7SUFDTCxDQUFDO0lBRUQseUNBQWlCLEdBQWpCLFVBQWtCLEtBQUs7UUFDbkIsRUFBRSxDQUFDLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO1lBQ3ZCLEtBQUssQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLFVBQVUsRUFBRSxDQUFDO1FBQ3RDLENBQUM7SUFDTCxDQUFDO0lBRUQsZ0NBQVEsR0FBUjtJQUNBLENBQUM7SUFFRCwwQ0FBa0IsR0FBbEIsVUFBbUIsSUFBSTtRQUNuQixJQUFJLFVBQVUsR0FBVyxJQUFJLENBQUMsTUFBTSxDQUFDO1FBQ3JDLEVBQUUsQ0FBQSxDQUFDLFVBQVUsQ0FBQyxPQUFPLENBQUMsQ0FBQSxDQUFDO1lBQ25CLElBQUksQ0FBQyxRQUFRLENBQUMsZ0JBQWdCLENBQUMsTUFBTSxDQUFDLENBQUM7WUFDdkMsRUFBRSxDQUFBLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFBLENBQUM7Z0JBQ1osSUFBSSxDQUFDLFFBQVEsQ0FBQyxnQkFBZ0IsQ0FBQyxNQUFNLENBQUMsQ0FBQztZQUMzQyxDQUFDO1FBQ0wsQ0FBQztRQUFBLElBQUksQ0FBQSxDQUFDO1lBQ0YsSUFBSSxDQUFDLFFBQVEsQ0FBQyxvQkFBb0IsQ0FBQyxNQUFNLENBQUMsQ0FBQztZQUMzQyxFQUFFLENBQUEsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUEsQ0FBQztnQkFDWixJQUFJLENBQUMsUUFBUSxDQUFDLG9CQUFvQixDQUFDLE1BQU0sQ0FBQyxDQUFDO1lBQy9DLENBQUM7UUFDTCxDQUFDO1FBQ0QsT0FBTyxDQUFDLEdBQUcsQ0FBQywyQkFBMkIsR0FBQyxVQUFVLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDaEUsQ0FBQztJQUVELDBDQUFrQixHQUFsQixVQUFtQixJQUFJO1FBQ25CLElBQUksVUFBVSxHQUFXLElBQUksQ0FBQyxNQUFNLENBQUM7UUFDckMsRUFBRSxDQUFBLENBQUMsVUFBVSxDQUFDLE9BQU8sQ0FBQyxDQUFBLENBQUM7WUFDbkIsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUM7WUFDbkIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxnQkFBZ0IsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUMzQyxDQUFDO1FBQUEsSUFBSSxDQUFBLENBQUM7WUFDRixJQUFJLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQztZQUNwQixJQUFJLENBQUMsUUFBUSxDQUFDLG9CQUFvQixDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQy9DLENBQUM7UUFDRCxPQUFPLENBQUMsR0FBRyxDQUFDLDBCQUEwQixHQUFDLFVBQVUsQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUMvRCxDQUFDO0lBRUQsc0JBQUksMENBQWU7YUFBbkI7WUFDSSxNQUFNLENBQUMsSUFBSSxDQUFDLGdCQUFnQixDQUFDO1FBQ2pDLENBQUM7YUFFRCxVQUFvQixLQUFhO1lBQzdCLElBQUksQ0FBQyxnQkFBZ0IsR0FBRyxLQUFLLENBQUM7UUFDbEMsQ0FBQzs7O09BSkE7SUFNTSxrQ0FBVSxHQUFqQjtRQUNJLElBQUksQ0FBQyxNQUFNLENBQUMsaUJBQWlCLEVBQUUsQ0FBQztJQUNwQyxDQUFDO0lBRU0sd0NBQWdCLEdBQXZCO1FBQ0csSUFBSSxDQUFDLE1BQU0sQ0FBQyxXQUFXLEVBQUUsQ0FBQztJQUM3QixDQUFDO0lBakVrQztRQUFsQyxnQkFBUyxDQUFDLGdDQUFzQixDQUFDO2tDQUF5QixnQ0FBc0I7MERBQUM7SUFUekUsYUFBYTtRQU56QixnQkFBUyxDQUFDO1lBQ1AsUUFBUSxFQUFFLE1BQU0sQ0FBQyxFQUFFO1lBQ25CLFFBQVEsRUFBRSxNQUFNO1lBQ2hCLFdBQVcsRUFBRSxxQkFBcUI7WUFDbEMsU0FBUyxFQUFFLENBQUMsb0JBQW9CLENBQUM7U0FDcEMsQ0FBQzt5Q0FPMkMsd0JBQWlCO09BTmpELGFBQWEsQ0EyRXpCO0lBQUQsb0JBQUM7Q0FBQSxBQTNFRCxJQTJFQztBQTNFWSxzQ0FBYSIsInNvdXJjZXNDb250ZW50IjpbIlxyXG5pbXBvcnQgeyBDb21wb25lbnQsIFZpZXdDaGlsZCwgT25Jbml0LCBBZnRlclZpZXdJbml0LCBDaGFuZ2VEZXRlY3RvclJlZiB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XHJcbmltcG9ydCB7IFBhZ2UgfSBmcm9tIFwidWkvcGFnZVwiO1xyXG5pbXBvcnQgeyBBY3Rpb25JdGVtIH0gZnJvbSBcInVpL2FjdGlvbi1iYXJcIjtcclxuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gXCJkYXRhL29ic2VydmFibGVcIjtcclxuaW1wb3J0IHsgUmFkU2lkZURyYXdlckNvbXBvbmVudCwgU2lkZURyYXdlclR5cGUgfSBmcm9tIFwibmF0aXZlc2NyaXB0LXByby11aS9zaWRlZHJhd2VyL2FuZ3VsYXJcIjtcclxuaW1wb3J0IHsgUmFkU2lkZURyYXdlciB9IGZyb20gJ25hdGl2ZXNjcmlwdC1wcm8tdWkvc2lkZWRyYXdlcic7XHJcbmltcG9ydCB7IFN3aXRjaCB9IGZyb20gXCJ1aS9zd2l0Y2hcIjtcclxuXHJcblxyXG5AQ29tcG9uZW50KHtcclxuICAgIG1vZHVsZUlkOiBtb2R1bGUuaWQsXHJcbiAgICBzZWxlY3RvcjogXCJzaWRlXCIsXHJcbiAgICB0ZW1wbGF0ZVVybDogJ3NpZGUuY29tcG9uZW50Lmh0bWwnLFxyXG4gICAgc3R5bGVVcmxzOiBbJ3NpZGUuY29tcG9uZW50LmNzcyddXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBTaWRlQ29tcG9uZW50IGltcGxlbWVudHMgQWZ0ZXJWaWV3SW5pdCwgT25Jbml0IHtcclxuXHJcbiAgICBmaXJlYmFzZSA9IHJlcXVpcmUoXCJuYXRpdmVzY3JpcHQtcGx1Z2luLWZpcmViYXNlXCIpO1xyXG4gICAgcHJpdmF0ZSBfbWFpbkNvbnRlbnRUZXh0OiBzdHJpbmc7XHJcbiAgICBwdWJsaWMgaXNQcm9mOiBib29sZWFuID0gZmFsc2U7XHJcblxyXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBfY2hhbmdlRGV0ZWN0aW9uUmVmOiBDaGFuZ2VEZXRlY3RvclJlZikge1xyXG4gICAgfVxyXG5cclxuICAgIEBWaWV3Q2hpbGQoUmFkU2lkZURyYXdlckNvbXBvbmVudCkgcHVibGljIGRyYXdlckNvbXBvbmVudDogUmFkU2lkZURyYXdlckNvbXBvbmVudDtcclxuICAgIHByaXZhdGUgZHJhd2VyOiBSYWRTaWRlRHJhd2VyO1xyXG5cclxuICAgIG5nQWZ0ZXJWaWV3SW5pdCgpIHtcclxuICAgICAgICB0aGlzLmRyYXdlciA9IHRoaXMuZHJhd2VyQ29tcG9uZW50LnNpZGVEcmF3ZXI7XHJcbiAgICAgICAgdGhpcy5fY2hhbmdlRGV0ZWN0aW9uUmVmLmRldGVjdENoYW5nZXMoKTtcclxuICAgIH1cclxuXHJcbiAgICBvblNlYXJjaExheW91dExvYWRlZChldmVudCkgeyAvL1ByZXZlbnRzIHNvZnRrZXlib2FyZCBmcm9tIG9wZW5pbmcgYXV0b21hdGljYWxseVxyXG4gICAgICAgIGlmIChldmVudC5vYmplY3QuYW5kcm9pZCkge1xyXG4gICAgICAgICAgICBldmVudC5vYmplY3QuYW5kcm9pZC5zZXRGb2N1c2FibGVJblRvdWNoTW9kZSh0cnVlKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgb25TZWFyY2hCYXJMb2FkZWQoZXZlbnQpIHtcclxuICAgICAgICBpZiAoZXZlbnQub2JqZWN0LmFuZHJvaWQpIHtcclxuICAgICAgICAgICAgZXZlbnQub2JqZWN0LmFuZHJvaWQuY2xlYXJGb2N1cygpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBuZ09uSW5pdCgpIHtcclxuICAgIH1cclxuXHJcbiAgICBub3RpZmljYXRpb25Td2l0Y2goYXJncyl7XHJcbiAgICAgICAgbGV0IHB1c2hTd2l0Y2ggPSA8U3dpdGNoPmFyZ3Mub2JqZWN0O1xyXG4gICAgICAgIGlmKHB1c2hTd2l0Y2guY2hlY2tlZCl7ICAgICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgdGhpcy5maXJlYmFzZS5zdWJzY3JpYmVUb1RvcGljKFwibmV3c1wiKTtcclxuICAgICAgICAgICAgaWYodGhpcy5pc1Byb2Ype1xyXG4gICAgICAgICAgICAgICAgdGhpcy5maXJlYmFzZS5zdWJzY3JpYmVUb1RvcGljKFwicHJvZlwiKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICB0aGlzLmZpcmViYXNlLnVuc3Vic2NyaWJlRnJvbVRvcGljKFwibmV3c1wiKTtcclxuICAgICAgICAgICAgaWYodGhpcy5pc1Byb2Ype1xyXG4gICAgICAgICAgICAgICAgdGhpcy5maXJlYmFzZS51bnN1YnNjcmliZUZyb21Ub3BpYyhcInByb2ZcIik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJOb3RpZmljYXRpb25zIHN3aXRjaCBvbjogXCIrcHVzaFN3aXRjaC5jaGVja2VkKTtcclxuICAgIH1cclxuXHJcbiAgICBwcm9mZXNzaW9uYWxTd2l0Y2goYXJncyl7XHJcbiAgICAgICAgbGV0IHByb2ZTd2l0Y2ggPSA8U3dpdGNoPmFyZ3Mub2JqZWN0OyAgICAgICAgXHJcbiAgICAgICAgaWYocHJvZlN3aXRjaC5jaGVja2VkKXtcclxuICAgICAgICAgICAgdGhpcy5pc1Byb2YgPSB0cnVlO1xyXG4gICAgICAgICAgICB0aGlzLmZpcmViYXNlLnN1YnNjcmliZVRvVG9waWMoXCJwcm9mXCIpO1xyXG4gICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICB0aGlzLmlzUHJvZiA9IGZhbHNlO1xyXG4gICAgICAgICAgICB0aGlzLmZpcmViYXNlLnVuc3Vic2NyaWJlRnJvbVRvcGljKFwicHJvZlwiKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJQcm9mZXNzaW9uYWwgc3dpdGNoIG9uOiBcIitwcm9mU3dpdGNoLmNoZWNrZWQpO1xyXG4gICAgfVxyXG5cclxuICAgIGdldCBtYWluQ29udGVudFRleHQoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX21haW5Db250ZW50VGV4dDtcclxuICAgIH1cclxuXHJcbiAgICBzZXQgbWFpbkNvbnRlbnRUZXh0KHZhbHVlOiBzdHJpbmcpIHtcclxuICAgICAgICB0aGlzLl9tYWluQ29udGVudFRleHQgPSB2YWx1ZTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgb3BlbkRyYXdlcigpIHtcclxuICAgICAgICB0aGlzLmRyYXdlci50b2dnbGVEcmF3ZXJTdGF0ZSgpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBvbkNsb3NlRHJhd2VyVGFwKCkge1xyXG4gICAgICAgdGhpcy5kcmF3ZXIuY2xvc2VEcmF3ZXIoKTtcclxuICAgIH1cclxufVxyXG4iXX0=