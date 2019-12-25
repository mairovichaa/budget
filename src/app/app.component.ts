import {Component} from '@angular/core';
import {ExpenseService} from './expense.service';
import * as _ from "lodash";

@Component({
    selector: 'app-root',
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
                        <th scope="col">Category</th>
                        <th scope="col">Total</th>
                        <th scope="col">Annual Avg.</th>
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
export class AppComponent {
    data = [];
    total = 0;
    annual = 0;

    constructor(private expenseService: ExpenseService) {
        this.data = expenseService.getOverview();
        this.total = _(this.data).sumBy(e => e.total);
        this.annual = this.total / ExpenseService.AMOUNT_OF_YEARS;
    }
}
