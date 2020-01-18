import {Component, QueryList, ViewChildren} from '@angular/core';
import {ExpenseService} from '../expense.service';
import * as _ from "lodash";
import {SortableHeaderDirective, SortEvent} from "../sortable-header.directive";

@Component({
    selector: 'category-overview',
    template: `
        <div style="width: 600px; float: left; margin-left: 20px" class="card">
            <div class="card-body">
                <h5 class="card-title">Category overview</h5>
                <div>
                    <p>Total: {{total | number:'0.2-2'}}</p>
                    <p>Annual average: {{annual | number:'0.2-2'}}</p>
                </div>
                <table class="table">
                    <thead>
                    <tr>
                        <th scope="col" sortable="category" (sort)="onSort($event)">Category</th>
                        <th scope="col" sortable="total" (sort)="onSort($event)">Total</th>
                        <th scope="col" sortable="annual" (sort)="onSort($event)">Annual Avg.</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr *ngFor="let entry of data">
                        <td>{{entry.category}}</td>
                        <td>{{entry.total | number:'0.2-2'}}</td>
                        <td>{{entry.annual | number:'0.2-2'}}</td>
                    </tr>
                    </tbody>
                </table>
            </div>
        </div>
    `,
    styles: []
})
export class CategoryOverviewComponent {
    data = [];
    total = 0;
    annual = 0;

    @ViewChildren(SortableHeaderDirective) headers: QueryList<SortableHeaderDirective>;

    constructor(private expenseService: ExpenseService) {
        this.data = expenseService.getOverview();
        this.total = _(this.data).sumBy(e => e.total);
        this.annual = this.total / ExpenseService.AMOUNT_OF_YEARS;
    }

    onSort(event: SortEvent) {
        this.headers.forEach(header => {
            header.process(event.column, this.data);
        });
    }
}
