import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";
import * as _ from "lodash";

declare var expenses: any;
import '../../static/data';

@Injectable({
    providedIn: 'root'
})
export class ExpenseService {
    static AMOUNT_OF_YEARS = 2;

    years: Set<number> = new Set();
    expenses = [];

    private yearSource;
    currentYear: Observable<number>;

    constructor() {
        expenses.forEach(e => {
            e.category = e.category.trim();
            const [date, month, year] = e.date.split(".");
            e.date = new Date(year, month - 1, date);

            this.years.add(year);
        });
        this.expenses = expenses;

        ExpenseService.AMOUNT_OF_YEARS = this.years.size;
        let lastYear = Math.max(...Array.from(this.years));
        this.yearSource = new BehaviorSubject(lastYear);
        this.currentYear = this.yearSource.asObservable();
    }

    changeYear(year: number) {
        this.yearSource.next(year);
    }

    getOverview() {
        return _(expenses)
            .groupBy(e => e.category)
            .map((expenses, category) => {
                const total = _(expenses).sumBy(e => e.sum);
                const annual = total / ExpenseService.AMOUNT_OF_YEARS;
                return {category, total, annual};
            })
            .value();
    }

    getPerYear() {
        return _(expenses)
            .groupBy(e => e.date.getFullYear())
            .map((expenses, year) => {
                const total = _(expenses).sumBy(e => e.sum);
                const monthlyAverage = total / 12;
                return {year, total, monthlyAverage};
            })
            .value();
    }
}
