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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2lkZS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJzaWRlLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUNBLHNDQUErRjtBQUkvRixrRUFBZ0c7QUFHaEcsMENBQXlEO0FBU3pEO0lBTUksdUJBQW9CLG1CQUFzQyxFQUFVLE1BQWM7UUFBOUQsd0JBQW1CLEdBQW5CLG1CQUFtQixDQUFtQjtRQUFVLFdBQU0sR0FBTixNQUFNLENBQVE7UUFKbEYsYUFBUSxHQUFHLE9BQU8sQ0FBQyw4QkFBOEIsQ0FBQyxDQUFDO1FBRTVDLFdBQU0sR0FBWSxLQUFLLENBQUM7SUFHL0IsQ0FBQztJQUtELHVDQUFlLEdBQWY7UUFDSSxJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxlQUFlLENBQUMsVUFBVSxDQUFDO1FBQzlDLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxhQUFhLEVBQUUsQ0FBQztJQUM3QyxDQUFDO0lBRUQsNENBQW9CLEdBQXBCLFVBQXFCLEtBQUs7UUFDMUIsa0RBQWtEO1FBQzlDLEVBQUUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztZQUN2QixLQUFLLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyx1QkFBdUIsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUN2RCxDQUFDO0lBQ0wsQ0FBQztJQUVELHlDQUFpQixHQUFqQixVQUFrQixLQUFLO1FBQ25CLEVBQUUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztZQUN2QixLQUFLLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxVQUFVLEVBQUUsQ0FBQztRQUN0QyxDQUFDO0lBQ0wsQ0FBQztJQUVELGdDQUFRLEdBQVI7UUFDSSxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUM7SUFDcEIsQ0FBQztJQUdELGdDQUFRLEdBQVI7UUFDSSxJQUFJLGdCQUFnQixHQUFxQjtZQUNyQyxX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QWlCLEVBQWtCLGVBQU07T0FOekUsYUFBYSxDQXVHekI7SUFBRCxvQkFBQztDQUFBLEFBdkdELElBdUdDO0FBdkdZLHNDQUFhIiwic291cmNlc0NvbnRlbnQiOlsiXG5pbXBvcnQgeyBDb21wb25lbnQsIFZpZXdDaGlsZCwgT25Jbml0LCBBZnRlclZpZXdJbml0LCBDaGFuZ2VEZXRlY3RvclJlZiB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5pbXBvcnQgeyBQYWdlIH0gZnJvbSBcInVpL3BhZ2VcIjtcbmltcG9ydCB7IEFjdGlvbkl0ZW0gfSBmcm9tIFwidWkvYWN0aW9uLWJhclwiO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gXCJkYXRhL29ic2VydmFibGVcIjtcbmltcG9ydCB7IFJhZFNpZGVEcmF3ZXJDb21wb25lbnQsIFNpZGVEcmF3ZXJUeXBlIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1wcm8tdWkvc2lkZWRyYXdlci9hbmd1bGFyXCI7XG5pbXBvcnQgeyBSYWRTaWRlRHJhd2VyIH0gZnJvbSAnbmF0aXZlc2NyaXB0LXByby11aS9zaWRlZHJhd2VyJztcbmltcG9ydCB7IFN3aXRjaCB9IGZyb20gXCJ1aS9zd2l0Y2hcIjtcbmltcG9ydCB7Um91dGVyLCBOYXZpZ2F0aW9uRXh0cmFzfSBmcm9tIFwiQGFuZ3VsYXIvcm91dGVyXCI7XG5cblxuQENvbXBvbmVudCh7XG4gICAgbW9kdWxlSWQ6IG1vZHVsZS5pZCxcbiAgICBzZWxlY3RvcjogXCJzaWRlXCIsXG4gICAgdGVtcGxhdGVVcmw6ICdzaWRlLmNvbXBvbmVudC5odG1sJyxcbiAgICBzdHlsZVVybHM6IFsnc2lkZS5jb21wb25lbnQuY3NzJ11cbn0pXG5leHBvcnQgY2xhc3MgU2lkZUNvbXBvbmVudCBpbXBsZW1lbnRzIEFmdGVyVmlld0luaXQsIE9uSW5pdCB7XG5cbiAgICBmaXJlYmFzZSA9IHJlcXVpcmUoXCJuYXRpdmVzY3JpcHQtcGx1Z2luLWZpcmViYXNlXCIpO1xuICAgIHByaXZhdGUgX21haW5Db250ZW50VGV4dDogc3RyaW5nO1xuICAgIHB1YmxpYyBpc1Byb2Y6IGJvb2xlYW4gPSBmYWxzZTtcblxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgX2NoYW5nZURldGVjdGlvblJlZjogQ2hhbmdlRGV0ZWN0b3JSZWYsIHByaXZhdGUgcm91dGVyOiBSb3V0ZXIpIHtcbiAgICB9XG5cbiAgICBAVmlld0NoaWxkKFJhZFNpZGVEcmF3ZXJDb21wb25lbnQpIHB1YmxpYyBkcmF3ZXJDb21wb25lbnQ6IFJhZFNpZGVEcmF3ZXJDb21wb25lbnQ7XG4gICAgcHJpdmF0ZSBkcmF3ZXI6IFJhZFNpZGVEcmF3ZXI7XG5cbiAgICBuZ0FmdGVyVmlld0luaXQoKSB7XG4gICAgICAgIHRoaXMuZHJhd2VyID0gdGhpcy5kcmF3ZXJDb21wb25lbnQuc2lkZURyYXdlcjtcbiAgICAgICAgdGhpcy5fY2hhbmdlRGV0ZWN0aW9uUmVmLmRldGVjdENoYW5nZXMoKTtcbiAgICB9XG5cbiAgICBvblNlYXJjaExheW91dExvYWRlZChldmVudCkgeyBcbiAgICAvL1ByZXZlbnRzIHNvZnRrZXlib2FyZCBmcm9tIG9wZW5pbmcgYXV0b21hdGljYWxseVxuICAgICAgICBpZiAoZXZlbnQub2JqZWN0LmFuZHJvaWQpIHtcbiAgICAgICAgICAgIGV2ZW50Lm9iamVjdC5hbmRyb2lkLnNldEZvY3VzYWJsZUluVG91Y2hNb2RlKHRydWUpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgb25TZWFyY2hCYXJMb2FkZWQoZXZlbnQpIHtcbiAgICAgICAgaWYgKGV2ZW50Lm9iamVjdC5hbmRyb2lkKSB7XG4gICAgICAgICAgICBldmVudC5vYmplY3QuYW5kcm9pZC5jbGVhckZvY3VzKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBuZ09uSW5pdCgpIHtcbiAgICAgICAgdGhpcy5FdmVyeW9uZSgpO1xuICAgIH1cblxuXG4gICAgRXZlcnlvbmUoKXtcbiAgICAgICAgbGV0IG5hdmlnYXRpb25FeHRyYXM6IE5hdmlnYXRpb25FeHRyYXMgPSB7XG4gICAgICAgICAgICBxdWVyeVBhcmFtczoge1xuICAgICAgICAgICAgICAgIFwicXVlcnlcIjogXCJFdmVyeW9uZVwiLFxuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgICB0aGlzLnJvdXRlci5uYXZpZ2F0ZShbXCJ0YWJzXCJdLCBuYXZpZ2F0aW9uRXh0cmFzKTtcbiAgICB9XG5cbiAgICBEZW50aXN0c09ubHkoKXtcbiAgICAgICAgbGV0IG5hdmlnYXRpb25FeHRyYXM6IE5hdmlnYXRpb25FeHRyYXMgPSB7XG4gICAgICAgICAgICBxdWVyeVBhcmFtczoge1xuICAgICAgICAgICAgICAgIFwicXVlcnlcIjogXCJEZW50aXN0cy9Eb2N0b3JzIG9ubHlcIixcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy5yb3V0ZXIubmF2aWdhdGUoW1widGFic1wiXSwgbmF2aWdhdGlvbkV4dHJhcyk7XG4gICAgfVxuXG5cbiAgICBwcm9mZXNzaW9uYWxTd2l0Y2goYXJncyl7XG4gICAgICAgIGxldCBwcm9mU3dpdGNoID0gPFN3aXRjaD5hcmdzLm9iamVjdDsgICAgICAgIFxuICAgICAgICBpZihwcm9mU3dpdGNoLmNoZWNrZWQpe1xuICAgICAgICAgICAgdGhpcy5pc1Byb2YgPSB0cnVlO1xuICAgICAgICAgICAgdGhpcy5EZW50aXN0c09ubHkoKTtcbiAgICAgICAgICAgIGFsZXJ0KFwiRGVudGlzdHNcIik7XG5cbiAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICB0aGlzLmlzUHJvZiA9IGZhbHNlO1xuICAgICAgICAgICAgdGhpcy5FdmVyeW9uZSgpO1xuICAgICAgICAgICAgYWxlcnQoXCJFdmVyeW9uZVwiKTtcbiAgICAgICAgfVxuICAgICAgICBjb25zb2xlLmxvZyhcIlByb2Zlc3Npb25hbCBzd2l0Y2ggb246IFwiK3Byb2ZTd2l0Y2guY2hlY2tlZCk7XG4gICAgfVxuXG5cblxuICAgIG5vdGlmaWNhdGlvblN3aXRjaChhcmdzKXtcbiAgICAgICAgbGV0IHB1c2hTd2l0Y2ggPSA8U3dpdGNoPmFyZ3Mub2JqZWN0O1xuICAgICAgICBpZihwdXNoU3dpdGNoLmNoZWNrZWQpeyAgICAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICB0aGlzLmZpcmViYXNlLnN1YnNjcmliZVRvVG9waWMoXCJuZXdzXCIpO1xuICAgICAgICAgICAgaWYodGhpcy5pc1Byb2Ype1xuICAgICAgICAgICAgICAgIHRoaXMuZmlyZWJhc2Uuc3Vic2NyaWJlVG9Ub3BpYyhcInByb2ZcIik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1lbHNle1xuICAgICAgICAgICAgdGhpcy5maXJlYmFzZS51bnN1YnNjcmliZUZyb21Ub3BpYyhcIm5ld3NcIik7XG4gICAgICAgICAgICBpZih0aGlzLmlzUHJvZil7XG4gICAgICAgICAgICAgICAgdGhpcy5maXJlYmFzZS51bnN1YnNjcmliZUZyb21Ub3BpYyhcInByb2ZcIik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgY29uc29sZS5sb2coXCJOb3RpZmljYXRpb25zIHN3aXRjaCBvbjogXCIrcHVzaFN3aXRjaC5jaGVja2VkKTtcbiAgICB9XG5cblxuICAgIGdldCBtYWluQ29udGVudFRleHQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9tYWluQ29udGVudFRleHQ7XG4gICAgfVxuXG4gICAgc2V0IG1haW5Db250ZW50VGV4dCh2YWx1ZTogc3RyaW5nKSB7XG4gICAgICAgIHRoaXMuX21haW5Db250ZW50VGV4dCA9IHZhbHVlO1xuICAgIH1cblxuICAgIHB1YmxpYyBvcGVuRHJhd2VyKCkge1xuICAgICAgICB0aGlzLmRyYXdlci50b2dnbGVEcmF3ZXJTdGF0ZSgpO1xuICAgIH1cblxuICAgIHB1YmxpYyBvbkNsb3NlRHJhd2VyVGFwKCkge1xuICAgICAgIHRoaXMuZHJhd2VyLmNsb3NlRHJhd2VyKCk7XG4gICAgfVxufVxuIl19