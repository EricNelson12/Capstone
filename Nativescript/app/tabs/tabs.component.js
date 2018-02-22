"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var news = (function () {
    function news(id, Topic, author, pic, prev, body) {
        this.id = id;
        this.Topic = Topic;
        this.author = author;
        this.pic = pic;
        this.prev = prev;
        this.body = body;
    }
    return news;
}());
exports.news = news;
var tabsComponent = (function () {
    function tabsComponent() {
        this.News = [
            { id: 0,
                Topic: 'Random News about Nothing',
                author: 'James Lock',
                pic: "https://www.w3schools.com" + "/images/w3schools_green.jpg",
                prev: "This is the preview to nothing ...",
                body: "This si the preview to nothing and i have nothing else to say" },
            { id: 1,
                Topic: 'Who is Dr. Blankface',
                author: 'Dr. Real Face',
                pic: "https://www.w3schools.com" + "/w3css/img_avatar3.png",
                prev: "This is the preview to who Dr. no face is dont read into it too much okay ...",
                body: "This si the preview to nothing and i have nothing else to say" },
            { id: 2,
                Topic: 'Random News about Everything',
                author: 'Yank Mike Rotch',
                pic: "https://www.w3schools.com" + "/images/w3schools_green.jpg",
                prev: "This is the preview to everything ...",
                body: "This si the preview to nothing and i have nothing else to say" },
            { id: 3,
                Topic: 'THE END IS NIGH!!!',
                author: 'Reverend Donations',
                pic: "https://www.cleverfiles.com/howto/wp-content/uploads/2016/08/mini.jpg",
                prev: "This is the to everything as we know it",
                body: "This si the preview to nothing and i have nothing else to say" },
            { id: 4,
                Topic: 'Sayians Hate Him!!!',
                author: 'Gangstalicious',
                pic: "~/images/LilBill.png",
                prev: "Learn how this teenager found out the secret to unlock sayian..",
                body: "This si the preview to nothing and i have nothing else to say" }
        ];
    }
    tabsComponent.prototype.ngOnInit = function () {
    };
    tabsComponent.prototype.onSelect = function (item) {
        this.selectedNews = item;
    };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFicy5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJ0YWJzLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUF5RTtBQVd6RTtJQUNFLGNBQ1MsRUFBVSxFQUNWLEtBQWMsRUFDZCxNQUFjLEVBQ2QsR0FBVyxFQUNYLElBQVksRUFDWixJQUFZO1FBTFosT0FBRSxHQUFGLEVBQUUsQ0FBUTtRQUNWLFVBQUssR0FBTCxLQUFLLENBQVM7UUFDZCxXQUFNLEdBQU4sTUFBTSxDQUFRO1FBQ2QsUUFBRyxHQUFILEdBQUcsQ0FBUTtRQUNYLFNBQUksR0FBSixJQUFJLENBQVE7UUFDWixTQUFJLEdBQUosSUFBSSxDQUFRO0lBQUcsQ0FBQztJQUMzQixXQUFDO0FBQUQsQ0FBQyxBQVJELElBUUM7QUFSWSxvQkFBSTtBQWdCakI7SUFFRTtRQUNFLElBQUksQ0FBQyxJQUFJLEdBQUU7WUFDVCxFQUFDLEVBQUUsRUFBRSxDQUFDO2dCQUNOLEtBQUssRUFBRSwyQkFBMkI7Z0JBQ2xDLE1BQU0sRUFBRSxZQUFZO2dCQUNwQixHQUFHLEVBQUUsMkJBQTJCLEdBQUUsNkJBQTZCO2dCQUMvRCxJQUFJLEVBQUUsb0NBQW9DO2dCQUMxQyxJQUFJLEVBQUUsK0RBQStELEVBQUU7WUFDdkUsRUFBQyxFQUFFLEVBQUUsQ0FBQztnQkFDTixLQUFLLEVBQUUsc0JBQXNCO2dCQUM3QixNQUFNLEVBQUUsZUFBZTtnQkFDdkIsR0FBRyxFQUFFLDJCQUEyQixHQUFFLHdCQUF3QjtnQkFDMUQsSUFBSSxFQUFFLCtFQUErRTtnQkFDckYsSUFBSSxFQUFFLCtEQUErRCxFQUFFO1lBQ3ZFLEVBQUMsRUFBRSxFQUFFLENBQUM7Z0JBQ04sS0FBSyxFQUFFLDhCQUE4QjtnQkFDckMsTUFBTSxFQUFFLGlCQUFpQjtnQkFDekIsR0FBRyxFQUFFLDJCQUEyQixHQUFDLDZCQUE2QjtnQkFDOUQsSUFBSSxFQUFFLHVDQUF1QztnQkFDN0MsSUFBSSxFQUFFLCtEQUErRCxFQUFFO1lBQ3ZFLEVBQUMsRUFBRSxFQUFFLENBQUM7Z0JBQ0osS0FBSyxFQUFFLG9CQUFvQjtnQkFDM0IsTUFBTSxFQUFFLG9CQUFvQjtnQkFDNUIsR0FBRyxFQUFFLHVFQUF1RTtnQkFDNUUsSUFBSSxFQUFFLHlDQUF5QztnQkFDL0MsSUFBSSxFQUFFLCtEQUErRCxFQUFFO1lBQ3ZFLEVBQUMsRUFBRSxFQUFFLENBQUM7Z0JBQ0osS0FBSyxFQUFFLHFCQUFxQjtnQkFDNUIsTUFBTSxFQUFFLGdCQUFnQjtnQkFDeEIsR0FBRyxFQUFFLHNCQUFzQjtnQkFDM0IsSUFBSSxFQUFFLGlFQUFpRTtnQkFDdkUsSUFBSSxFQUFFLCtEQUErRCxFQUFFO1NBQzVFLENBQUE7SUFDSCxDQUFDO0lBRUMsZ0NBQVEsR0FBUjtJQUNBLENBQUM7SUFFRCxnQ0FBUSxHQUFSLFVBQVMsSUFBVTtRQUNqQixJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQztJQUMzQixDQUFDO0lBMUNRLGFBQWE7UUFMekIsZ0JBQVMsQ0FBQztZQUNULFFBQVEsRUFBRSxNQUFNO1lBQ2hCLFdBQVcsRUFBRSw0QkFBNEI7WUFDekMsU0FBUyxFQUFDLENBQUMsMkJBQTJCLENBQUM7U0FDeEMsQ0FBQzs7T0FDVyxhQUFhLENBMkN2QjtJQUFELG9CQUFDO0NBQUEsQUEzQ0gsSUEyQ0c7QUEzQ1Usc0NBQWEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0NvbXBvbmVudCwgSW5wdXQsIENoYW5nZURldGVjdGlvblN0cmF0ZWd5IH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcbmltcG9ydCB7IFBhZ2UgfSBmcm9tIFwidWkvcGFnZVwiOyAvLyB0byBoaWRlIGFjdGlvbiBiYXJcbmltcG9ydCAqIGFzIGxpc3RWaWV3TW9kdWxlIGZyb20gXCJ0bnMtY29yZS1tb2R1bGVzL3VpL2xpc3Qtdmlld1wiO1xuaW1wb3J0ICogYXMgSW1hZ2VNb2R1bGUgZnJvbSBcInRucy1jb3JlLW1vZHVsZXMvdWkvaW1hZ2VcIjtcbmltcG9ydCB7IEltYWdlIH0gZnJvbSBcInRucy1jb3JlLW1vZHVsZXMvdWkvaW1hZ2VcIjtcbmltcG9ydCB7IE9uSW5pdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgSW5mb30gZnJvbSAnLi9pbmZvJztcblxuXG5cblxuZXhwb3J0IGNsYXNzIG5ld3N7XG4gIGNvbnN0cnVjdG9yKFxuICAgIHB1YmxpYyBpZDogbnVtYmVyLFxuICAgIHB1YmxpYyBUb3BpYyA6IFN0cmluZywgXG4gICAgcHVibGljIGF1dGhvcjogc3RyaW5nLCBcbiAgICBwdWJsaWMgcGljOiBzdHJpbmcsIFxuICAgIHB1YmxpYyBwcmV2OiBTdHJpbmcsXG4gICAgcHVibGljIGJvZHk6IFN0cmluZyApe31cbn1cblxuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6IFwidGFic1wiLFxuICB0ZW1wbGF0ZVVybDogXCIuL3RhYnMvdGFicy5jb21wb25lbnQuaHRtbFwiLFxuICBzdHlsZVVybHM6W1wiLi90YWJzL3RhYnMuY29tcG9uZW50LmNzc1wiXVxufSlcbmV4cG9ydCBjbGFzcyB0YWJzQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0e1xuICBOZXdzOiBuZXdzW107XG4gIGNvbnN0cnVjdG9yKCl7XG4gICAgdGhpcy5OZXdzPSBbXG4gICAgICB7aWQ6IDAsXG4gICAgICBUb3BpYzogJ1JhbmRvbSBOZXdzIGFib3V0IE5vdGhpbmcnLFxuICAgICAgYXV0aG9yOiAnSmFtZXMgTG9jaycsIFxuICAgICAgcGljOiBcImh0dHBzOi8vd3d3Lnczc2Nob29scy5jb21cIiArXCIvaW1hZ2VzL3czc2Nob29sc19ncmVlbi5qcGdcIiwgXG4gICAgICBwcmV2OiBcIlRoaXMgaXMgdGhlIHByZXZpZXcgdG8gbm90aGluZyAuLi5cIixcbiAgICAgIGJvZHk6IFwiVGhpcyBzaSB0aGUgcHJldmlldyB0byBub3RoaW5nIGFuZCBpIGhhdmUgbm90aGluZyBlbHNlIHRvIHNheVwiIH0sXG4gICAgICB7aWQ6IDEsXG4gICAgICBUb3BpYzogJ1dobyBpcyBEci4gQmxhbmtmYWNlJyxcbiAgICAgIGF1dGhvcjogJ0RyLiBSZWFsIEZhY2UnLCBcbiAgICAgIHBpYzogXCJodHRwczovL3d3dy53M3NjaG9vbHMuY29tXCIgK1wiL3czY3NzL2ltZ19hdmF0YXIzLnBuZ1wiLCBcbiAgICAgIHByZXY6IFwiVGhpcyBpcyB0aGUgcHJldmlldyB0byB3aG8gRHIuIG5vIGZhY2UgaXMgZG9udCByZWFkIGludG8gaXQgdG9vIG11Y2ggb2theSAuLi5cIixcbiAgICAgIGJvZHk6IFwiVGhpcyBzaSB0aGUgcHJldmlldyB0byBub3RoaW5nIGFuZCBpIGhhdmUgbm90aGluZyBlbHNlIHRvIHNheVwiIH0sXG4gICAgICB7aWQ6IDIsXG4gICAgICBUb3BpYzogJ1JhbmRvbSBOZXdzIGFib3V0IEV2ZXJ5dGhpbmcnLFxuICAgICAgYXV0aG9yOiAnWWFuayBNaWtlIFJvdGNoJywgXG4gICAgICBwaWM6IFwiaHR0cHM6Ly93d3cudzNzY2hvb2xzLmNvbVwiK1wiL2ltYWdlcy93M3NjaG9vbHNfZ3JlZW4uanBnXCIsIFxuICAgICAgcHJldjogXCJUaGlzIGlzIHRoZSBwcmV2aWV3IHRvIGV2ZXJ5dGhpbmcgLi4uXCIsXG4gICAgICBib2R5OiBcIlRoaXMgc2kgdGhlIHByZXZpZXcgdG8gbm90aGluZyBhbmQgaSBoYXZlIG5vdGhpbmcgZWxzZSB0byBzYXlcIiB9LFxuICAgICAge2lkOiAzLFxuICAgICAgICBUb3BpYzogJ1RIRSBFTkQgSVMgTklHSCEhIScsXG4gICAgICAgIGF1dGhvcjogJ1JldmVyZW5kIERvbmF0aW9ucycsIFxuICAgICAgICBwaWM6IFwiaHR0cHM6Ly93d3cuY2xldmVyZmlsZXMuY29tL2hvd3RvL3dwLWNvbnRlbnQvdXBsb2Fkcy8yMDE2LzA4L21pbmkuanBnXCIsIFxuICAgICAgICBwcmV2OiBcIlRoaXMgaXMgdGhlIHRvIGV2ZXJ5dGhpbmcgYXMgd2Uga25vdyBpdFwiLFxuICAgICAgICBib2R5OiBcIlRoaXMgc2kgdGhlIHByZXZpZXcgdG8gbm90aGluZyBhbmQgaSBoYXZlIG5vdGhpbmcgZWxzZSB0byBzYXlcIiB9LFxuICAgICAgICB7aWQ6IDQsXG4gICAgICAgICAgVG9waWM6ICdTYXlpYW5zIEhhdGUgSGltISEhJyxcbiAgICAgICAgICBhdXRob3I6ICdHYW5nc3RhbGljaW91cycsIFxuICAgICAgICAgIHBpYzogXCJ+L2ltYWdlcy9MaWxCaWxsLnBuZ1wiLCBcbiAgICAgICAgICBwcmV2OiBcIkxlYXJuIGhvdyB0aGlzIHRlZW5hZ2VyIGZvdW5kIG91dCB0aGUgc2VjcmV0IHRvIHVubG9jayBzYXlpYW4uLlwiLFxuICAgICAgICAgIGJvZHk6IFwiVGhpcyBzaSB0aGUgcHJldmlldyB0byBub3RoaW5nIGFuZCBpIGhhdmUgbm90aGluZyBlbHNlIHRvIHNheVwiIH1cbiAgICBdXG4gIH1cbiAgc2VsZWN0ZWROZXdzOiBuZXdzO1xuICAgIG5nT25Jbml0KCkge1xuICAgIH1cbiAgXG4gICAgb25TZWxlY3QoaXRlbTogbmV3cyk6IHZvaWQge1xuICAgICAgdGhpcy5zZWxlY3RlZE5ld3MgPSBpdGVtO1xuICAgIH1cbiAgfVxuXG4iXX0=