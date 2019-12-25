import {Component} from '@angular/core';
import {ExpenseService} from './expense.service';

@Component({
    selector: 'year-list',
    template: `
        <div style="width: 600px" class="card">
            <div class="card-body">
                <h5 class="card-title">Expenses per year</h5>
                <table class="table">
                    <thead>
                    <tr>
                        <th scope="col">Year</th>
                        <th scope="col">Total</th>
                        <th scope="col">Month Avg.</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr *ngFor="let entry of data">
                        <td>{{entry.year}}</td>
                        <td>{{entry.total | number:'0.2-2'}}</td>
                        <td>{{entry.monthlyAverage | number:'0.2-2'}}</td>
                    </tr>
                    </tbody>
                </table>
            </div>
        </div>
    `,
    styles: []
})
export class YearListComponent {
    data = [];

    constructor(private expenseService: ExpenseService) {
        this.data = expenseService.getPerYear();
    }

}
