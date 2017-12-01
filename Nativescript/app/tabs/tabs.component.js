"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var news = (function () {
    function news(id, name) {
        this.id = id;
        this.name = name;
    }
    return news;
}());
var tabsComponent = (function () {
    function tabsComponent() {
        this.info = [
            {
                id: 'Traditional Dentures', name: 'Traditional Dentures get more loose over time...'
            },
            { id: 'Try before you buy', name: 'Free Consultation, design your perfect smile...' },
            { id: 'Comparison', name: 'How do we compare? Replace missing teeth...' }
        ];
    }
    tabsComponent = __decorate([
        core_1.Component({
            selector: "tabs",
            templateUrl: "./tabs/tabs.component.html",
            styleUrls: ["./tabs/tabs.component.css"]
        }),
        __metadata("design:paramtypes", [])
    ], tabsComponent);
    return tabsComponent;
}());
exports.tabsComponent = tabsComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFicy5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJ0YWJzLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUF5QztBQUt6QztJQUNFLGNBQW1CLEVBQVcsRUFBUyxJQUFZO1FBQWhDLE9BQUUsR0FBRixFQUFFLENBQVM7UUFBUyxTQUFJLEdBQUosSUFBSSxDQUFRO0lBQUUsQ0FBQztJQUN4RCxXQUFDO0FBQUQsQ0FBQyxBQUZELElBRUM7QUFRRDtJQUVFO1FBQ0UsSUFBSSxDQUFDLElBQUksR0FBRTtZQUNUO2dCQUNDLEVBQUUsRUFBRSxzQkFBc0IsRUFBRSxJQUFJLEVBQUUsa0RBQWtEO2FBQUM7WUFDdEYsRUFBQyxFQUFFLEVBQUUsb0JBQW9CLEVBQUUsSUFBSSxFQUFFLGlEQUFpRCxFQUFDO1lBQ25GLEVBQUMsRUFBRSxFQUFFLFlBQVksRUFBRSxJQUFJLEVBQUUsNkNBQTZDLEVBQUM7U0FDeEUsQ0FBQTtJQUNILENBQUM7SUFUVSxhQUFhO1FBTHpCLGdCQUFTLENBQUM7WUFDVCxRQUFRLEVBQUUsTUFBTTtZQUNoQixXQUFXLEVBQUUsNEJBQTRCO1lBQ3pDLFNBQVMsRUFBQyxDQUFDLDJCQUEyQixDQUFDO1NBQ3hDLENBQUM7O09BQ1csYUFBYSxDQVV6QjtJQUFELG9CQUFDO0NBQUEsQUFWRCxJQVVDO0FBVlksc0NBQWEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0NvbXBvbmVudCB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XHJcbmltcG9ydCB7IFBhZ2UgfSBmcm9tIFwidWkvcGFnZVwiOyAvLyB0byBoaWRlIGFjdGlvbiBiYXJcclxuaW1wb3J0ICogYXMgbGlzdFZpZXdNb2R1bGUgZnJvbSBcInRucy1jb3JlLW1vZHVsZXMvdWkvbGlzdC12aWV3XCI7XHJcbmltcG9ydCB7SW5wdXQsIENoYW5nZURldGVjdGlvblN0cmF0ZWd5fSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuXHJcbmNsYXNzIG5ld3N7XHJcbiAgY29uc3RydWN0b3IocHVibGljIGlkIDogc3RyaW5nLCBwdWJsaWMgbmFtZTogc3RyaW5nKXt9XHJcbn1cclxuXHJcblxyXG5AQ29tcG9uZW50KHtcclxuICBzZWxlY3RvcjogXCJ0YWJzXCIsXHJcbiAgdGVtcGxhdGVVcmw6IFwiLi90YWJzL3RhYnMuY29tcG9uZW50Lmh0bWxcIixcclxuICBzdHlsZVVybHM6W1wiLi90YWJzL3RhYnMuY29tcG9uZW50LmNzc1wiXVxyXG59KVxyXG5leHBvcnQgY2xhc3MgdGFic0NvbXBvbmVudCB7XHJcbiAgaW5mbzogbmV3c1tdO1xyXG4gIGNvbnN0cnVjdG9yKCl7XHJcbiAgICB0aGlzLmluZm89IFtcclxuICAgICAge1xyXG4gICAgICAgaWQ6ICdUcmFkaXRpb25hbCBEZW50dXJlcycsIG5hbWU6ICdUcmFkaXRpb25hbCBEZW50dXJlcyBnZXQgbW9yZSBsb29zZSBvdmVyIHRpbWUuLi4nfSxcclxuICAgICAge2lkOiAnVHJ5IGJlZm9yZSB5b3UgYnV5JywgbmFtZTogJ0ZyZWUgQ29uc3VsdGF0aW9uLCBkZXNpZ24geW91ciBwZXJmZWN0IHNtaWxlLi4uJ30sXHJcbiAgICAgIHtpZDogJ0NvbXBhcmlzb24nLCBuYW1lOiAnSG93IGRvIHdlIGNvbXBhcmU/IFJlcGxhY2UgbWlzc2luZyB0ZWV0aC4uLid9XHJcbiAgICBdXHJcbiAgfVxyXG59XHJcbiJdfQ==