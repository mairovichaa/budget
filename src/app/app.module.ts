import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import { FormsModule } from '@angular/forms';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {CategoryOverviewComponent} from './category/category-overview.component';
import {YearListComponent} from './year-list.component';
import {MonthOverviewComponent} from './month-overview.component';
import {SortableHeaderDirective} from './sortable-header.directive';
import {DateOverviewComponent} from "./date-overview.component";
import {MonthListComponent} from "./month-list.component";
import {MortgageComponent} from "./mortgage/mortgage.component";
import {PerYearComponent} from "./category/per-year.component";
import {PerMonthComponent} from "./category/per-month.component";
import {PerDayComponent} from "./category/per-day.component";

@NgModule({
    declarations: [
        AppComponent,
        CategoryOverviewComponent,
        YearListComponent,
        MonthListComponent,
        MonthOverviewComponent,
        SortableHeaderDirective,
        DateOverviewComponent,
        MortgageComponent,
        PerYearComponent,
        PerMonthComponent,
        PerDayComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        FormsModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}
