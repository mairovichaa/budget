import {Component, OnInit, Output, EventEmitter, ViewChildren, QueryList} from '@angular/core';
import {ExpenseService} from './expense.service';
import {SortableHeaderDirective, SortEvent} from "./sortable-header.directive";

@Component({
    selector: 'year-list',
    template: `
        <div>
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
                        <tr *ngFor="let entry of data" [class.chosen]="entry.year === year" (click)="chooseYear(entry)">
                            <td>{{entry.year}}</td>
                            <td>{{entry.total | number:'0.2-2'}}</td>
                            <td>{{entry.monthlyAverage | number:'0.2-2'}}</td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <div style="width: 600px; margin-top: 20px" class="card">
                <div class="card-body">
                    <h5 class="card-title">Per month</h5>
                    <table class="table">
                        <thead>
                        <tr>
                            <th scope="col">Month</th>
                            <th scope="col">Total</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr *ngFor="let entry of dataPerMonth"
                            [class.chosen]="entry.monthNumber === month" 
                            (click)="chooseMonth(entry)">
                            <td>{{entry.month}}</td>
                            <td>{{entry.total | number:'0.2-2'}}</td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            </div>

            <div style="width: 600px; margin-top: 20px" class="card">
                <div class="card-body">
                    <h5 class="card-title">Per category</h5>
                    <table class="table">
                        <thead>
                        <tr>
                            <th scope="col" sortable="category" (sort)="onSort($event)">Category</th>
                            <th scope="col" sortable="total" (sort)="onSort($event)">Total</th>
                            <th scope="col" sortable="monthly" (sort)="onSort($event)">Month Avg.</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr *ngFor="let entry of dataPerCategory">
                            <td>{{entry.category}}</td>
                            <td>{{entry.total | number:'0.2-2'}}</td>
                            <td>{{entry.monthly | number:'0.2-2'}}</td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    `,
    styles: [
        'tr {cursor: pointer;}',
        'tr:hover {background-color: #DDD;}',
        'tr.chosen {background-color: #EEE;}',
        'tr.chosen:hover {background-color: #DDD;}'
    ]
})
export class YearListComponent implements OnInit {
    data = [];
    dataPerMonth = [];
    dataPerCategory = [];
    year: number;
    month: number = 1;
    @Output() yearChosenEvent = new EventEmitter<number>();
    @Output() monthChosenEvent = new EventEmitter<number>();
    @ViewChildren(SortableHeaderDirective) headers: QueryList<SortableHeaderDirective>;

    constructor(private expenseService: ExpenseService) {
        this.data = expenseService.getPerYear();
    }

    ngOnInit() {
        //TODO get rid of it and use Input/Output instead
        this.expenseService.currentYear.subscribe(year => {
            this.year = year;
            this.dataPerMonth = this.expenseService.getPerMonth(year);
            this.dataPerCategory = this.expenseService.getPerCategory(year);
            this.yearChosenEvent.emit(year);
        });
    }

    chooseYear(yearInfo) {
        const chosenYear = yearInfo.year;
        this.expenseService.changeYear(chosenYear);
        this.yearChosenEvent.emit(chosenYear);
    }

    chooseMonth(entry: any) {
        const chosenMonth = entry.monthNumber;
        this.month = chosenMonth;
        this.monthChosenEvent.emit(chosenMonth);
    }

    onSort(event: SortEvent) {
        this.headers.forEach(header => {
            header.process(event.column, this.dataPerCategory);
        });
    }
}
