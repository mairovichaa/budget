import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {ExpenseService} from "./expense.service";
import * as _ from "lodash";
import {DateService} from "./date.service";

@Component({
    selector: 'month-overview',
    template: `
        <div style="width: 600px;" class="card">
            <div class="card-body">
                <h5 class="card-title">Overview for {{monthName}} of {{year}}</h5>
                <div>
                    <p>Total: {{total | number:'0.2-2'}}</p>
                    <p>Amount of days: {{amountOfDays}}</p>
                    <p>Daily average: {{daily | number:'0.2-2'}}</p>
                </div>
                <table class="table">
                    <thead>
                    <tr>
                        <th scope="col">Category</th>
                        <th scope="col">Total</th>
                        <th scope="col">Daily</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr *ngFor="let entry of data">
                        <td>{{entry.category}}</td>
                        <td>{{entry.total | number:'0.2-2'}}</td>
                        <td>{{entry.daily | number:'0.2-2'}}</td>
                    </tr>
                    </tbody>
                </table>
            </div>
        </div>
    `,
    styles: []
})
export class MonthOverviewComponent implements OnInit, OnChanges {
    @Input() year: number;
    @Input() month: number;

    monthName: string;

    data = [];
    total = 0;
    daily = 0;
    amountOfDays: number;

    constructor(private expenseService: ExpenseService,
                private dateService: DateService) {
    }

    ngOnInit() {
    }

    ngOnChanges(changes: SimpleChanges): void {
        this.monthName = this.dateService.getMonthName(this.month);
        this.amountOfDays = this.dateService.getAmountOfDays(this.year, this.month);
        this.data = this.expenseService.getOverviewForYearAndMonth(this.year, this.month);
        this.total = _(this.data).sumBy(e => e.total);
        this.daily = this.total / this.amountOfDays;
    }
}
