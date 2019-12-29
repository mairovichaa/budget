import {Component} from '@angular/core';

@Component({
    selector: 'app-root',
    template: `
        <div style="width: 3000px">
            <category-overview></category-overview>
            <year-list (yearChosenEvent)="chooseYear($event)" (monthChosenEvent)="chooseMonth($event)"></year-list>
            <month-overview [year]="currentYear" [month]="currentMonth"></month-overview>
        </div>
    `,
    styles: [
        'year-list {float: left; margin-left: 20px}',
        'month-overview {float: left; margin-left: 20px}',
    ]
})
export class AppComponent {
    currentMonth: number = 0;
    currentYear: number;

    chooseYear(year: number) {
        this.currentYear = year;
    }

    chooseMonth(month: number) {
        console.log(month);
        this.currentMonth = month;
    }
}
