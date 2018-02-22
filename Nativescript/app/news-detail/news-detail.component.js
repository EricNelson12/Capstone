"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tabs_component_1 = require("../tabs/tabs.component");
var core_1 = require("@angular/core");
var NewsDetailComponent = (function () {
    function NewsDetailComponent() {
    }
    NewsDetailComponent.prototype.ngOnInit = function () {
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", tabs_component_1.news)
    ], NewsDetailComponent.prototype, "item", void 0);
    NewsDetailComponent = __decorate([
        core_1.Component({
            selector: 'app-news-detail',
            template: "<StackLayout *ngIf=\"details\">\n    \n  <label>{{details.topic | uppercase }} Details</label>\n    \n</StackLayout> "
        }),
        __metadata("design:paramtypes", [])
    ], NewsDetailComponent);
    return NewsDetailComponent;
}());
exports.NewsDetailComponent = NewsDetailComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmV3cy1kZXRhaWwuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibmV3cy1kZXRhaWwuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEseURBQTJDO0FBQzNDLHNDQUF5RDtBQVV6RDtJQUlBO0lBQWdCLENBQUM7SUFFZixzQ0FBUSxHQUFSO0lBQ0EsQ0FBQztJQU5NO1FBQVIsWUFBSyxFQUFFO2tDQUFPLHFCQUFJO3FEQUFDO0lBRFAsbUJBQW1CO1FBUi9CLGdCQUFTLENBQUM7WUFDUCxRQUFRLEVBQUUsaUJBQWlCO1lBQzNCLFFBQVEsRUFBRyx1SEFJQztTQUNiLENBQUM7O09BQ1MsbUJBQW1CLENBUS9CO0lBQUQsMEJBQUM7Q0FBQSxBQVJELElBUUM7QUFSWSxrREFBbUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnR7bmV3c30gZnJvbSAnLi4vdGFicy90YWJzLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCwgSW5wdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICdhcHAtbmV3cy1kZXRhaWwnLFxuICAgIHRlbXBsYXRlOiAgYDxTdGFja0xheW91dCAqbmdJZj1cImRldGFpbHNcIj5cbiAgICBcbiAgPGxhYmVsPnt7ZGV0YWlscy50b3BpYyB8IHVwcGVyY2FzZSB9fSBEZXRhaWxzPC9sYWJlbD5cbiAgICBcbjwvU3RhY2tMYXlvdXQ+IGBcbiAgfSlcbmV4cG9ydCBjbGFzcyBOZXdzRGV0YWlsQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcbkBJbnB1dCgpIGl0ZW06IG5ld3M7XG5cblxuY29uc3RydWN0b3IoKSB7IH1cblxuICBuZ09uSW5pdCgpIHtcbiAgfVxufSJdfQ==