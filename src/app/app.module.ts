import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {YearListComponent} from './year-list.component';
import {MonthOverviewComponent} from './month-overview.component';
import {SortableHeaderDirective} from './sortable-header.directive';
import {DateOverviewComponent} from "./date-overview.component";
import {MonthListComponent} from "./month-list.component";
import {MortgageComponent} from "./mortgage/mortgage.component";
import {CategoryModule} from "./category/category.module";

@NgModule({
    declarations: [
        AppComponent,
        YearListComponent,
        MonthListComponent,
        MonthOverviewComponent,
        SortableHeaderDirective,
        DateOverviewComponent,
        MortgageComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        FormsModule,

        CategoryModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}
