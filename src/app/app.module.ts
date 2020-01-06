import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {CategoryOverviewComponent} from './category-overview.component';
import {YearListComponent} from './year-list.component';
import {MonthOverviewComponent} from './month-overview.component';
import {SortableHeaderDirective} from './sortable-header.directive';
import {DateOverviewComponent} from "./date-overview.component";

@NgModule({
    declarations: [
        AppComponent,
        CategoryOverviewComponent,
        YearListComponent,
        MonthOverviewComponent,
        SortableHeaderDirective,
        DateOverviewComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}
