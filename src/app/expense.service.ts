import {Injectable} from '@angular/core';
import * as _ from "lodash";

declare var expenses: any;
import '../../static/data';

@Injectable({
    providedIn: 'root'
})
export class ExpenseService {
    static AMOUNT_OF_YEARS = 2;
    expenses = [];

    constructor() {
        expenses.forEach(e => {
            e.category = e.category.trim();
            const [date, month, year] = e.date.split(".");
            e.date = new Date(year, month - 1, date);
        });
        this.expenses = expenses;
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

}
