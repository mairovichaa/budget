import {Injectable} from '@angular/core';
import * as _ from "lodash";
import {DateService} from "./date.service";
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

interface Expense {
    category: string;
    date: Date;
    sum: number;
}

@Injectable({
    providedIn: 'root'
})
export class ExpenseService {
    static AMOUNT_OF_YEARS = 2;

    years: Set<number> = new Set();
    requestObservable: Observable<any>;

    expenses: Expense[] = [];
    currentYear: number;

    constructor(private http: HttpClient,
                private dateService: DateService) {
        console.log(`${ExpenseService.name}: constructor started`);
        this.requestObservable = this.http.get<any>('http://localhost:3000/expenses')
            .pipe(
                map(data => {
                    console.log(`${ExpenseService.name}: data was loaded`);

                    data.forEach(e => {
                        e.category = e.category.trim();
                        const [date, month, year] = e.date.split(".");
                        e.date = new Date(year, month - 1, date);

                        this.years.add(year);
                    });

                    ExpenseService.AMOUNT_OF_YEARS = this.years.size;
                    this.currentYear = Math.max(...Array.from(this.years));

                    return data;
                })
            );

        this.requestObservable.subscribe(data => this.expenses = data);
        console.log(`${ExpenseService.name}: constructor finished`);
    }

    getOverview() {
        return _(this.expenses)
            .groupBy(e => e.category)
            .map((expenses, category) => {
                const total = _(expenses).sumBy(e => e.sum);
                const annual = total / ExpenseService.AMOUNT_OF_YEARS;
                return {category, total, annual};
            })
            .sortBy(['category'])
            .value();
    }

    getPerYear() {
        return _(this.expenses)
            .groupBy(e => e.date.getFullYear())
            .map((expenses, year) => {
                const total = _(expenses).sumBy(e => e.sum);
                const monthlyAverage = total / 12;
                return {year: parseInt(year), total, monthlyAverage};
            })
            .value();
    }

    getPerMonth(year: number) {
        return _(this.expenses)
            .filter(e => e.date.getFullYear() === year)
            .groupBy(e => e.date.getMonth())
            .map((expenses, monthNumber) => {
                const total = _(expenses).sumBy(e => e.sum);
                const month = new Date(null, parseInt(monthNumber)).toLocaleString('en', {month: 'long'});
                return {month, total, monthNumber: parseInt(monthNumber)};
            })
            .value();
    }

    getPerCategory(year: number) {
        const AMOUNT_OF_MONTHS = 12;
        return _(this.expenses)
            .filter(e => e.date.getFullYear() === year)
            .groupBy(e => e.category)
            .map((expenses, category) => {
                const total = _(expenses).sumBy(e => e.sum);
                const monthly = total / AMOUNT_OF_MONTHS;
                return {category, total, monthly};
            })
            .sortBy(['category'])
            .value();
    }

    getOverviewForYearAndMonth(year: number, month: number) {
        const amountOfDays = this.dateService.getAmountOfDays(year, month);
        return _(this.expenses)
            .filter(e =>
                e.date.getFullYear() === year && e.date.getMonth() === month
            )
            .groupBy(e => e.category)
            .map((expenses, category) => {
                const total = _(expenses).sumBy(e => e.sum);
                const daily = total / amountOfDays;
                return {category, total, daily};
            })
            .sortBy(['category'])
            .value();
    }
}
