import {Component, Input, OnChanges, SimpleChanges} from '@angular/core';
import {ExpenseService} from "../expense.service";
import * as _ from "lodash";


class Year {
    year: number;
    total: number;
    monthly: number;
}

@Component({
    selector: 'per-year',
    template: `

        <div style="width: 600px; margin-left: 20px; float: left" class="card">
            <div class="card-body">
                <h5 class="card-title">Expenses per year for {{category}}</h5>
                <table class="table">
                    <thead>
                    <tr>
                        <th scope="col">Year</th>
                        <th scope="col">Total</th>
                        <th scope="col">Monthy Avg.</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr *ngFor="let entry of data">
                        <td>{{entry.year}}</td>
                        <td>{{entry.total | number:'0.2-2'}}</td>
                        <td>{{entry.monthly | number:'0.2-2'}}</td>
                    </tr>
                    </tbody>
                </table>
            </div>
        </div>
    `,
    styles: []
})
export class PerYearComponent implements OnChanges {

    private data: Year[] = [];

    @Input() category: string;

    constructor(private expenseService: ExpenseService) {
    }

    ngOnChanges(changes: SimpleChanges): void {
        this.data = _(this.expenseService.expenses)
            .filter(e => e.category === this.category)
            .groupBy(e => e.date.getFullYear())
            .map((expenses, year) => {
                const total = _(expenses).sumBy(e => e.sum);
                const monthly = total / 12;
                return {year: parseInt(year), total, monthly};
            })
            .value();
    }

}
