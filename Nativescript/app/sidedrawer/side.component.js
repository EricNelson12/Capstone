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
        }
        else {
            this.isProf = false;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2lkZS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJzaWRlLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUNBLHNDQUErRjtBQUkvRixrRUFBZ0c7QUFXaEc7SUFNSSx1QkFBb0IsbUJBQXNDO1FBQXRDLHdCQUFtQixHQUFuQixtQkFBbUIsQ0FBbUI7UUFKMUQsYUFBUSxHQUFHLE9BQU8sQ0FBQyw4QkFBOEIsQ0FBQyxDQUFDO1FBRTVDLFdBQU0sR0FBWSxLQUFLLENBQUM7SUFHL0IsQ0FBQztJQUtELHVDQUFlLEdBQWY7UUFDSSxJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxlQUFlLENBQUMsVUFBVSxDQUFDO1FBQzlDLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxhQUFhLEVBQUUsQ0FBQztJQUM3QyxDQUFDO0lBRUQsNENBQW9CLEdBQXBCLFVBQXFCLEtBQUs7UUFDdEIsRUFBRSxDQUFDLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO1lBQ3ZCLEtBQUssQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLHVCQUF1QixDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ3ZELENBQUM7SUFDTCxDQUFDO0lBRUQseUNBQWlCLEdBQWpCLFVBQWtCLEtBQUs7UUFDbkIsRUFBRSxDQUFDLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO1lBQ3ZCLEtBQUssQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLFVBQVUsRUFBRSxDQUFDO1FBQ3RDLENBQUM7SUFDTCxDQUFDO0lBRUQsZ0NBQVEsR0FBUjtJQUNBLENBQUM7SUFFRCwwQ0FBa0IsR0FBbEIsVUFBbUIsSUFBSTtRQUNuQixJQUFJLFVBQVUsR0FBVyxJQUFJLENBQUMsTUFBTSxDQUFDO1FBQ3JDLEVBQUUsQ0FBQSxDQUFDLFVBQVUsQ0FBQyxPQUFPLENBQUMsQ0FBQSxDQUFDO1lBQ25CLElBQUksQ0FBQyxRQUFRLENBQUMsZ0JBQWdCLENBQUMsTUFBTSxDQUFDLENBQUM7WUFDdkMsRUFBRSxDQUFBLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFBLENBQUM7Z0JBQ1osSUFBSSxDQUFDLFFBQVEsQ0FBQyxnQkFBZ0IsQ0FBQyxNQUFNLENBQUMsQ0FBQztZQUMzQyxDQUFDO1FBQ0wsQ0FBQztRQUFBLElBQUksQ0FBQSxDQUFDO1lBQ0YsSUFBSSxDQUFDLFFBQVEsQ0FBQyxvQkFBb0IsQ0FBQyxNQUFNLENBQUMsQ0FBQztZQUMzQyxFQUFFLENBQUEsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUEsQ0FBQztnQkFDWixJQUFJLENBQUMsUUFBUSxDQUFDLG9CQUFvQixDQUFDLE1BQU0sQ0FBQyxDQUFDO1lBQy9DLENBQUM7UUFDTCxDQUFDO1FBQ0QsT0FBTyxDQUFDLEdBQUcsQ0FBQywyQkFBMkIsR0FBQyxVQUFVLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDaEUsQ0FBQztJQUVELDBDQUFrQixHQUFsQixVQUFtQixJQUFJO1FBQ25CLElBQUksVUFBVSxHQUFXLElBQUksQ0FBQyxNQUFNLENBQUM7UUFDckMsRUFBRSxDQUFBLENBQUMsVUFBVSxDQUFDLE9BQU8sQ0FBQyxDQUFBLENBQUM7WUFDbkIsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUM7UUFDdkIsQ0FBQztRQUFBLElBQUksQ0FBQSxDQUFDO1lBQ0YsSUFBSSxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUM7UUFDeEIsQ0FBQztRQUNELE9BQU8sQ0FBQyxHQUFHLENBQUMsMEJBQTBCLEdBQUMsVUFBVSxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBQy9ELENBQUM7SUFFRCxzQkFBSSwwQ0FBZTthQUFuQjtZQUNJLE1BQU0sQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLENBQUM7UUFDakMsQ0FBQzthQUVELFVBQW9CLEtBQWE7WUFDN0IsSUFBSSxDQUFDLGdCQUFnQixHQUFHLEtBQUssQ0FBQztRQUNsQyxDQUFDOzs7T0FKQTtJQU1NLGtDQUFVLEdBQWpCO1FBQ0ksSUFBSSxDQUFDLE1BQU0sQ0FBQyxpQkFBaUIsRUFBRSxDQUFDO0lBQ3BDLENBQUM7SUFFTSx3Q0FBZ0IsR0FBdkI7UUFDRyxJQUFJLENBQUMsTUFBTSxDQUFDLFdBQVcsRUFBRSxDQUFDO0lBQzdCLENBQUM7SUEvRGtDO1FBQWxDLGdCQUFTLENBQUMsZ0NBQXNCLENBQUM7a0NBQXlCLGdDQUFzQjswREFBQztJQVR6RSxhQUFhO1FBTnpCLGdCQUFTLENBQUM7WUFDUCxRQUFRLEVBQUUsTUFBTSxDQUFDLEVBQUU7WUFDbkIsUUFBUSxFQUFFLE1BQU07WUFDaEIsV0FBVyxFQUFFLHFCQUFxQjtZQUNsQyxTQUFTLEVBQUUsQ0FBQyxvQkFBb0IsQ0FBQztTQUNwQyxDQUFDO3lDQU8yQyx3QkFBaUI7T0FOakQsYUFBYSxDQXlFekI7SUFBRCxvQkFBQztDQUFBLEFBekVELElBeUVDO0FBekVZLHNDQUFhIiwic291cmNlc0NvbnRlbnQiOlsiXG5pbXBvcnQgeyBDb21wb25lbnQsIFZpZXdDaGlsZCwgT25Jbml0LCBBZnRlclZpZXdJbml0LCBDaGFuZ2VEZXRlY3RvclJlZiB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5pbXBvcnQgeyBQYWdlIH0gZnJvbSBcInVpL3BhZ2VcIjtcbmltcG9ydCB7IEFjdGlvbkl0ZW0gfSBmcm9tIFwidWkvYWN0aW9uLWJhclwiO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gXCJkYXRhL29ic2VydmFibGVcIjtcbmltcG9ydCB7IFJhZFNpZGVEcmF3ZXJDb21wb25lbnQsIFNpZGVEcmF3ZXJUeXBlIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1wcm8tdWkvc2lkZWRyYXdlci9hbmd1bGFyXCI7XG5pbXBvcnQgeyBSYWRTaWRlRHJhd2VyIH0gZnJvbSAnbmF0aXZlc2NyaXB0LXByby11aS9zaWRlZHJhd2VyJztcbmltcG9ydCB7IFN3aXRjaCB9IGZyb20gXCJ1aS9zd2l0Y2hcIjtcblxuXG5AQ29tcG9uZW50KHtcbiAgICBtb2R1bGVJZDogbW9kdWxlLmlkLFxuICAgIHNlbGVjdG9yOiBcInNpZGVcIixcbiAgICB0ZW1wbGF0ZVVybDogJ3NpZGUuY29tcG9uZW50Lmh0bWwnLFxuICAgIHN0eWxlVXJsczogWydzaWRlLmNvbXBvbmVudC5jc3MnXVxufSlcbmV4cG9ydCBjbGFzcyBTaWRlQ29tcG9uZW50IGltcGxlbWVudHMgQWZ0ZXJWaWV3SW5pdCwgT25Jbml0IHtcblxuICAgIGZpcmViYXNlID0gcmVxdWlyZShcIm5hdGl2ZXNjcmlwdC1wbHVnaW4tZmlyZWJhc2VcIik7XG4gICAgcHJpdmF0ZSBfbWFpbkNvbnRlbnRUZXh0OiBzdHJpbmc7XG4gICAgcHVibGljIGlzUHJvZjogYm9vbGVhbiA9IGZhbHNlO1xuXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBfY2hhbmdlRGV0ZWN0aW9uUmVmOiBDaGFuZ2VEZXRlY3RvclJlZikge1xuICAgIH1cblxuICAgIEBWaWV3Q2hpbGQoUmFkU2lkZURyYXdlckNvbXBvbmVudCkgcHVibGljIGRyYXdlckNvbXBvbmVudDogUmFkU2lkZURyYXdlckNvbXBvbmVudDtcbiAgICBwcml2YXRlIGRyYXdlcjogUmFkU2lkZURyYXdlcjtcblxuICAgIG5nQWZ0ZXJWaWV3SW5pdCgpIHtcbiAgICAgICAgdGhpcy5kcmF3ZXIgPSB0aGlzLmRyYXdlckNvbXBvbmVudC5zaWRlRHJhd2VyO1xuICAgICAgICB0aGlzLl9jaGFuZ2VEZXRlY3Rpb25SZWYuZGV0ZWN0Q2hhbmdlcygpO1xuICAgIH1cblxuICAgIG9uU2VhcmNoTGF5b3V0TG9hZGVkKGV2ZW50KSB7IC8vUHJldmVudHMgc29mdGtleWJvYXJkIGZyb20gb3BlbmluZyBhdXRvbWF0aWNhbGx5XG4gICAgICAgIGlmIChldmVudC5vYmplY3QuYW5kcm9pZCkge1xuICAgICAgICAgICAgZXZlbnQub2JqZWN0LmFuZHJvaWQuc2V0Rm9jdXNhYmxlSW5Ub3VjaE1vZGUodHJ1ZSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBvblNlYXJjaEJhckxvYWRlZChldmVudCkge1xuICAgICAgICBpZiAoZXZlbnQub2JqZWN0LmFuZHJvaWQpIHtcbiAgICAgICAgICAgIGV2ZW50Lm9iamVjdC5hbmRyb2lkLmNsZWFyRm9jdXMoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIG5nT25Jbml0KCkge1xuICAgIH1cblxuICAgIG5vdGlmaWNhdGlvblN3aXRjaChhcmdzKXtcbiAgICAgICAgbGV0IHB1c2hTd2l0Y2ggPSA8U3dpdGNoPmFyZ3Mub2JqZWN0O1xuICAgICAgICBpZihwdXNoU3dpdGNoLmNoZWNrZWQpeyAgICAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICB0aGlzLmZpcmViYXNlLnN1YnNjcmliZVRvVG9waWMoXCJuZXdzXCIpO1xuICAgICAgICAgICAgaWYodGhpcy5pc1Byb2Ype1xuICAgICAgICAgICAgICAgIHRoaXMuZmlyZWJhc2Uuc3Vic2NyaWJlVG9Ub3BpYyhcInByb2ZcIik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1lbHNle1xuICAgICAgICAgICAgdGhpcy5maXJlYmFzZS51bnN1YnNjcmliZUZyb21Ub3BpYyhcIm5ld3NcIik7XG4gICAgICAgICAgICBpZih0aGlzLmlzUHJvZil7XG4gICAgICAgICAgICAgICAgdGhpcy5maXJlYmFzZS51bnN1YnNjcmliZUZyb21Ub3BpYyhcInByb2ZcIik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgY29uc29sZS5sb2coXCJOb3RpZmljYXRpb25zIHN3aXRjaCBvbjogXCIrcHVzaFN3aXRjaC5jaGVja2VkKTtcbiAgICB9XG5cbiAgICBwcm9mZXNzaW9uYWxTd2l0Y2goYXJncyl7XG4gICAgICAgIGxldCBwcm9mU3dpdGNoID0gPFN3aXRjaD5hcmdzLm9iamVjdDsgICAgICAgIFxuICAgICAgICBpZihwcm9mU3dpdGNoLmNoZWNrZWQpe1xuICAgICAgICAgICAgdGhpcy5pc1Byb2YgPSB0cnVlO1xuICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgIHRoaXMuaXNQcm9mID0gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgY29uc29sZS5sb2coXCJQcm9mZXNzaW9uYWwgc3dpdGNoIG9uOiBcIitwcm9mU3dpdGNoLmNoZWNrZWQpO1xuICAgIH1cblxuICAgIGdldCBtYWluQ29udGVudFRleHQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9tYWluQ29udGVudFRleHQ7XG4gICAgfVxuXG4gICAgc2V0IG1haW5Db250ZW50VGV4dCh2YWx1ZTogc3RyaW5nKSB7XG4gICAgICAgIHRoaXMuX21haW5Db250ZW50VGV4dCA9IHZhbHVlO1xuICAgIH1cblxuICAgIHB1YmxpYyBvcGVuRHJhd2VyKCkge1xuICAgICAgICB0aGlzLmRyYXdlci50b2dnbGVEcmF3ZXJTdGF0ZSgpO1xuICAgIH1cblxuICAgIHB1YmxpYyBvbkNsb3NlRHJhd2VyVGFwKCkge1xuICAgICAgIHRoaXMuZHJhd2VyLmNsb3NlRHJhd2VyKCk7XG4gICAgfVxufVxuIl19