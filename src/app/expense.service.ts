import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";
import * as _ from "lodash";

declare var expenses: any;
import '../../static/data';
import {DateService} from "./date.service";

@Injectable({
    providedIn: 'root'
})
export class ExpenseService {
    static AMOUNT_OF_YEARS = 2;

    years: Set<number> = new Set();
    expenses = [];

    private yearSource;
    currentYear: Observable<number>;

    constructor(private dateService: DateService) {
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
                return {year: parseInt(year), total, monthlyAverage};
            })
            .value();
    }

    getPerMonth(year: number) {
        return _(expenses)
            .filter(e => e.date.getFullYear() === year)
            .groupBy(e => e.date.getMonth())
            .map((expenses, monthNumber) => {
                const total = _(expenses).sumBy(e => e.sum);
                const month = new Date(null, parseInt(monthNumber)).toLocaleString('en', { month: 'long' });
                return {month, total, monthNumber: parseInt(monthNumber)};
            })
            .value();
    }

    getPerCategory(year: number) {
        const AMOUNT_OF_MONTHS = 12;
        return _(expenses)
            .filter(e => e.date.getFullYear() === year)
            .groupBy(e => e.category)
            .map((expenses, category) => {
                const total = _(expenses).sumBy(e => e.sum);
                const monthly = total / AMOUNT_OF_MONTHS;
                return {category, total, monthly};
            })
            .value();
    }

    getOverviewForYearAndMonth(year: number, month: number) {
        const amountOfDays = this.dateService.getAmountOfDays(year, month);
        return _(expenses)
            .filter(e =>
                e.date.getFullYear() === year && e.date.getMonth() === month
            )
            .groupBy(e => e.category)
            .map((expenses, category) => {
                const total = _(expenses).sumBy(e => e.sum);
                const daily = total / amountOfDays;
                return {category, total, daily};
            })
            .value();
    }
}
