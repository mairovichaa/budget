import {Injectable} from '@angular/core';
import * as _ from "lodash";

declare var expenses: any;
import '../../static/data';

@Injectable({
    providedIn: 'root'
})
export class ExpenseService {
    static AMOUNT_OF_YEARS = 2;
    constructor() {
    }

    getOverview() {
        return _(expenses)
            .groupBy(e => e.category.trim())
            .map((expenses, category) => {
                const total = _(expenses).sumBy(e => e.sum);
                const annual = total / ExpenseService.AMOUNT_OF_YEARS;
                return {category, total, annual};
            })
            .value();
    }


}
