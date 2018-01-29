"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var angular_1 = require("nativescript-pro-ui/sidedrawer/angular");
var router_1 = require("@angular/router");
var SideComponent = (function () {
    function SideComponent(_changeDetectionRef, router) {
        this._changeDetectionRef = _changeDetectionRef;
        this.router = router;
        this.firebase = require("nativescript-plugin-firebase");
        this.isProf = false;
    }
    SideComponent.prototype.ngAfterViewInit = function () {
        this.drawer = this.drawerComponent.sideDrawer;
        this._changeDetectionRef.detectChanges();
    };
    SideComponent.prototype.onSearchLayoutLoaded = function (event) {
        //Prevents softkeyboard from opening automatically
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
        this.Everyone();
    };
    SideComponent.prototype.Everyone = function () {
        var navigationExtras = {
            queryParams: {
                "query": "Everyone",
            }
        };
        this.router.navigate(["tabs"], navigationExtras);
    };
    SideComponent.prototype.DentistsOnly = function () {
        var navigationExtras = {
            queryParams: {
                "query": "Dentists/Doctors only",
            }
        };
        this.router.navigate(["tabs"], navigationExtras);
    };
    SideComponent.prototype.professionalSwitch = function (args) {
        var profSwitch = args.object;
        if (profSwitch.checked) {
            this.isProf = true;
            this.DentistsOnly();
            alert("Dentists");
        }
        else {
            this.isProf = false;
            this.Everyone();
            alert("Everyone");
        }
        console.log("Professional switch on: " + profSwitch.checked);
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
        __metadata("design:paramtypes", [core_1.ChangeDetectorRef, router_1.Router])
    ], SideComponent);
    return SideComponent;
}());
exports.SideComponent = SideComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2lkZS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJzaWRlLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUNBLHNDQUErRjtBQUkvRixrRUFBZ0c7QUFHaEcsMENBQXlEO0FBU3pEO0lBTUksdUJBQW9CLG1CQUFzQyxFQUFVLE1BQWM7UUFBOUQsd0JBQW1CLEdBQW5CLG1CQUFtQixDQUFtQjtRQUFVLFdBQU0sR0FBTixNQUFNLENBQVE7UUFKbEYsYUFBUSxHQUFHLE9BQU8sQ0FBQyw4QkFBOEIsQ0FBQyxDQUFDO1FBRTVDLFdBQU0sR0FBWSxLQUFLLENBQUM7SUFHL0IsQ0FBQztJQUtELHVDQUFlLEdBQWY7UUFDSSxJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxlQUFlLENBQUMsVUFBVSxDQUFDO1FBQzlDLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxhQUFhLEVBQUUsQ0FBQztJQUM3QyxDQUFDO0lBRUQsNENBQW9CLEdBQXBCLFVBQXFCLEtBQUs7UUFDMUIsa0RBQWtEO1FBQzlDLEVBQUUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztZQUN2QixLQUFLLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyx1QkFBdUIsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUN2RCxDQUFDO0lBQ0wsQ0FBQztJQUVELHlDQUFpQixHQUFqQixVQUFrQixLQUFLO1FBQ25CLEVBQUUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztZQUN2QixLQUFLLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxVQUFVLEVBQUUsQ0FBQztRQUN0QyxDQUFDO0lBQ0wsQ0FBQztJQUVELGdDQUFRLEdBQVI7UUFDSSxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUM7SUFDcEIsQ0FBQztJQUdELGdDQUFRLEdBQVI7UUFDSSxJQUFJLGdCQUFnQixHQUFxQjtZQUNyQyxX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QWlCLEVBQWtCLGVBQU07T0FOekUsYUFBYSxDQXVHekI7SUFBRCxvQkFBQztDQUFBLEFBdkdELElBdUdDO0FBdkdZLHNDQUFhIiwic291cmNlc0NvbnRlbnQiOlsiXHJcbmltcG9ydCB7IENvbXBvbmVudCwgVmlld0NoaWxkLCBPbkluaXQsIEFmdGVyVmlld0luaXQsIENoYW5nZURldGVjdG9yUmVmIH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcclxuaW1wb3J0IHsgUGFnZSB9IGZyb20gXCJ1aS9wYWdlXCI7XHJcbmltcG9ydCB7IEFjdGlvbkl0ZW0gfSBmcm9tIFwidWkvYWN0aW9uLWJhclwiO1xyXG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSBcImRhdGEvb2JzZXJ2YWJsZVwiO1xyXG5pbXBvcnQgeyBSYWRTaWRlRHJhd2VyQ29tcG9uZW50LCBTaWRlRHJhd2VyVHlwZSB9IGZyb20gXCJuYXRpdmVzY3JpcHQtcHJvLXVpL3NpZGVkcmF3ZXIvYW5ndWxhclwiO1xyXG5pbXBvcnQgeyBSYWRTaWRlRHJhd2VyIH0gZnJvbSAnbmF0aXZlc2NyaXB0LXByby11aS9zaWRlZHJhd2VyJztcclxuaW1wb3J0IHsgU3dpdGNoIH0gZnJvbSBcInVpL3N3aXRjaFwiO1xyXG5pbXBvcnQge1JvdXRlciwgTmF2aWdhdGlvbkV4dHJhc30gZnJvbSBcIkBhbmd1bGFyL3JvdXRlclwiO1xyXG5cclxuXHJcbkBDb21wb25lbnQoe1xyXG4gICAgbW9kdWxlSWQ6IG1vZHVsZS5pZCxcclxuICAgIHNlbGVjdG9yOiBcInNpZGVcIixcclxuICAgIHRlbXBsYXRlVXJsOiAnc2lkZS5jb21wb25lbnQuaHRtbCcsXHJcbiAgICBzdHlsZVVybHM6IFsnc2lkZS5jb21wb25lbnQuY3NzJ11cclxufSlcclxuZXhwb3J0IGNsYXNzIFNpZGVDb21wb25lbnQgaW1wbGVtZW50cyBBZnRlclZpZXdJbml0LCBPbkluaXQge1xyXG5cclxuICAgIGZpcmViYXNlID0gcmVxdWlyZShcIm5hdGl2ZXNjcmlwdC1wbHVnaW4tZmlyZWJhc2VcIik7XHJcbiAgICBwcml2YXRlIF9tYWluQ29udGVudFRleHQ6IHN0cmluZztcclxuICAgIHB1YmxpYyBpc1Byb2Y6IGJvb2xlYW4gPSBmYWxzZTtcclxuXHJcbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIF9jaGFuZ2VEZXRlY3Rpb25SZWY6IENoYW5nZURldGVjdG9yUmVmLCBwcml2YXRlIHJvdXRlcjogUm91dGVyKSB7XHJcbiAgICB9XHJcblxyXG4gICAgQFZpZXdDaGlsZChSYWRTaWRlRHJhd2VyQ29tcG9uZW50KSBwdWJsaWMgZHJhd2VyQ29tcG9uZW50OiBSYWRTaWRlRHJhd2VyQ29tcG9uZW50O1xyXG4gICAgcHJpdmF0ZSBkcmF3ZXI6IFJhZFNpZGVEcmF3ZXI7XHJcblxyXG4gICAgbmdBZnRlclZpZXdJbml0KCkge1xyXG4gICAgICAgIHRoaXMuZHJhd2VyID0gdGhpcy5kcmF3ZXJDb21wb25lbnQuc2lkZURyYXdlcjtcclxuICAgICAgICB0aGlzLl9jaGFuZ2VEZXRlY3Rpb25SZWYuZGV0ZWN0Q2hhbmdlcygpO1xyXG4gICAgfVxyXG5cclxuICAgIG9uU2VhcmNoTGF5b3V0TG9hZGVkKGV2ZW50KSB7IFxyXG4gICAgLy9QcmV2ZW50cyBzb2Z0a2V5Ym9hcmQgZnJvbSBvcGVuaW5nIGF1dG9tYXRpY2FsbHlcclxuICAgICAgICBpZiAoZXZlbnQub2JqZWN0LmFuZHJvaWQpIHtcclxuICAgICAgICAgICAgZXZlbnQub2JqZWN0LmFuZHJvaWQuc2V0Rm9jdXNhYmxlSW5Ub3VjaE1vZGUodHJ1ZSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIG9uU2VhcmNoQmFyTG9hZGVkKGV2ZW50KSB7XHJcbiAgICAgICAgaWYgKGV2ZW50Lm9iamVjdC5hbmRyb2lkKSB7XHJcbiAgICAgICAgICAgIGV2ZW50Lm9iamVjdC5hbmRyb2lkLmNsZWFyRm9jdXMoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgbmdPbkluaXQoKSB7XHJcbiAgICAgICAgdGhpcy5FdmVyeW9uZSgpO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICBFdmVyeW9uZSgpe1xyXG4gICAgICAgIGxldCBuYXZpZ2F0aW9uRXh0cmFzOiBOYXZpZ2F0aW9uRXh0cmFzID0ge1xyXG4gICAgICAgICAgICBxdWVyeVBhcmFtczoge1xyXG4gICAgICAgICAgICAgICAgXCJxdWVyeVwiOiBcIkV2ZXJ5b25lXCIsXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9O1xyXG4gICAgICAgIHRoaXMucm91dGVyLm5hdmlnYXRlKFtcInRhYnNcIl0sIG5hdmlnYXRpb25FeHRyYXMpO1xyXG4gICAgfVxyXG5cclxuICAgIERlbnRpc3RzT25seSgpe1xyXG4gICAgICAgIGxldCBuYXZpZ2F0aW9uRXh0cmFzOiBOYXZpZ2F0aW9uRXh0cmFzID0ge1xyXG4gICAgICAgICAgICBxdWVyeVBhcmFtczoge1xyXG4gICAgICAgICAgICAgICAgXCJxdWVyeVwiOiBcIkRlbnRpc3RzL0RvY3RvcnMgb25seVwiLFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfTtcclxuICAgICAgICB0aGlzLnJvdXRlci5uYXZpZ2F0ZShbXCJ0YWJzXCJdLCBuYXZpZ2F0aW9uRXh0cmFzKTtcclxuICAgIH1cclxuXHJcblxyXG4gICAgcHJvZmVzc2lvbmFsU3dpdGNoKGFyZ3Mpe1xyXG4gICAgICAgIGxldCBwcm9mU3dpdGNoID0gPFN3aXRjaD5hcmdzLm9iamVjdDsgICAgICAgIFxyXG4gICAgICAgIGlmKHByb2ZTd2l0Y2guY2hlY2tlZCl7XHJcbiAgICAgICAgICAgIHRoaXMuaXNQcm9mID0gdHJ1ZTtcclxuICAgICAgICAgICAgdGhpcy5EZW50aXN0c09ubHkoKTtcclxuICAgICAgICAgICAgYWxlcnQoXCJEZW50aXN0c1wiKTtcclxuXHJcbiAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgIHRoaXMuaXNQcm9mID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHRoaXMuRXZlcnlvbmUoKTtcclxuICAgICAgICAgICAgYWxlcnQoXCJFdmVyeW9uZVwiKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJQcm9mZXNzaW9uYWwgc3dpdGNoIG9uOiBcIitwcm9mU3dpdGNoLmNoZWNrZWQpO1xyXG4gICAgfVxyXG5cclxuXHJcblxyXG4gICAgbm90aWZpY2F0aW9uU3dpdGNoKGFyZ3Mpe1xyXG4gICAgICAgIGxldCBwdXNoU3dpdGNoID0gPFN3aXRjaD5hcmdzLm9iamVjdDtcclxuICAgICAgICBpZihwdXNoU3dpdGNoLmNoZWNrZWQpeyAgICAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIHRoaXMuZmlyZWJhc2Uuc3Vic2NyaWJlVG9Ub3BpYyhcIm5ld3NcIik7XHJcbiAgICAgICAgICAgIGlmKHRoaXMuaXNQcm9mKXtcclxuICAgICAgICAgICAgICAgIHRoaXMuZmlyZWJhc2Uuc3Vic2NyaWJlVG9Ub3BpYyhcInByb2ZcIik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgdGhpcy5maXJlYmFzZS51bnN1YnNjcmliZUZyb21Ub3BpYyhcIm5ld3NcIik7XHJcbiAgICAgICAgICAgIGlmKHRoaXMuaXNQcm9mKXtcclxuICAgICAgICAgICAgICAgIHRoaXMuZmlyZWJhc2UudW5zdWJzY3JpYmVGcm9tVG9waWMoXCJwcm9mXCIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiTm90aWZpY2F0aW9ucyBzd2l0Y2ggb246IFwiK3B1c2hTd2l0Y2guY2hlY2tlZCk7XHJcbiAgICB9XHJcblxyXG5cclxuICAgIGdldCBtYWluQ29udGVudFRleHQoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX21haW5Db250ZW50VGV4dDtcclxuICAgIH1cclxuXHJcbiAgICBzZXQgbWFpbkNvbnRlbnRUZXh0KHZhbHVlOiBzdHJpbmcpIHtcclxuICAgICAgICB0aGlzLl9tYWluQ29udGVudFRleHQgPSB2YWx1ZTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgb3BlbkRyYXdlcigpIHtcclxuICAgICAgICB0aGlzLmRyYXdlci50b2dnbGVEcmF3ZXJTdGF0ZSgpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBvbkNsb3NlRHJhd2VyVGFwKCkge1xyXG4gICAgICAgdGhpcy5kcmF3ZXIuY2xvc2VEcmF3ZXIoKTtcclxuICAgIH1cclxufVxyXG4iXX0=