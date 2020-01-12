import {Component, DoCheck} from '@angular/core';

@Component({
    selector: 'mortgage-overview',
    template: `        
        <div class="card" style="width: 30rem;margin-top: 10px">
            <div class="card-body">
                <div class="input-group mb-3">
                    <div class="input-group-prepend">
                        <span class="input-group-text">Loan</span>
                    </div>
                    <input type="text" class="form-control" placeholder="Total" [(ngModel)]="total">
                </div>
                <div class="input-group mb-3">
                    <div class="input-group-prepend">
                        <span class="input-group-text">%</span>
                    </div>
                    <input type="text" class="form-control" placeholder="Процент (годовые)" [(ngModel)]="interest">
                </div>
                <div class="input-group mb-3">
                    <div class="input-group-prepend">
                        <span class="input-group-text">Monthly</span>
                    </div>
                    <input type="text" class="form-control" placeholder="Размер платежа" [(ngModel)]="payment">
                </div>
                
                <p>Monthly interest : {{monthlyInterest | number:'0.4-6'}}</p>
                <p>Overpayment : {{overpayment | number:'0.2-2'}}</p>
                <p>Amount of months : {{amountOfMonths}}</p>
            </div>
        </div>

        <div>
            <div style="float: left;">

                <div *ngFor="let e of data" class="card" style="width: 30rem;margin-top: 10px">
                    <div class="card-body">
                        <h5 class="card-title">{{e.date | date :'MMM yyyy'}}</h5>
                        <p class="card-text">Общая сумма платежа: {{e.total | number:'0.2-2'}}</p>
                        <p class="card-text">Процентная часть платежа: {{e.interest | number:'0.2-2'}}</p>
                        <p class="card-text">Основная часть платежа: {{e.real | number:'0.2-2'}}</p>
                        <p *ngIf="extraPayments.length > 0">Дополнительные платежи:</p>
                        <p *ngIf="extraPayments.length === 0">Дополнительных платежей нет.</p>
                        <ul *ngFor="let payment of e.additionalPayments">
                            <li class="card-text"> {{payment | number:'0.2-2'}}</li>
                        </ul>
                        <p class="card-text">Остаток: {{e.left | number:'0.2-2'}}</p>
                        <a class="btn btn-primary" (click)="openModal(e)" data-toggle="modal"
                           data-target="#exampleModal">Добавить платеж</a>
                    </div>
                </div>
            </div>
        </div>



        <div class="modal fade" id="exampleModal" tabindex="-1">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">Добавить платеж</h5>
                        <button type="button" class="close" data-dismiss="modal">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <p>Дата: {{modalDate | date :'MMM yyyy'}}</p>
                        <div class="input-group mb-3">
                            <div class="input-group-prepend">
                                <span class="input-group-text">@</span>
                            </div>
                            <input type="text" class="form-control" placeholder="Размер платежа"
                                   [(ngModel)]="modalPayment">
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-dismiss="modal">Закрыть</button>
                        <button type="button" class="btn btn-primary" data-dismiss="modal" (click)="addPayment()">
                            Сохранить
                        </button>
                    </div>
                </div>
            </div>
        </div>

    `,
    styles: []
})
export class MortgageComponent implements DoCheck {
    total: number = 2381382.33;
    interest: number = 10.25;
    amountOfMonths: number = 0;
    monthlyInterest: number;
    overpayment: number;
    data = [];
    payment: number = 37430.02;

    extraPayments = [];

    modalDate: Date;
    modalPayment: string = undefined;

    ngDoCheck(): void {
        console.log("ngDoCheck");
        this.monthlyInterest = this.interest / 100 / 12;

        let _total = this.total;
        this.data = [];
        this.overpayment = 0;
        this.amountOfMonths = 0;
        let date = new Date();
        while (_total > 0 && this.amountOfMonths < 100) {
            this.amountOfMonths++;
            const interestPart = _total * this.monthlyInterest;
            this.overpayment += interestPart;
            const realPart = this.payment - interestPart;

            const additionalPayments = this.getAdditionalPaymentsFromModel(date);
            _total -= realPart + additionalPayments.reduce((a, b) => a + b, 0);

            this.data.push({
                date: date,
                total: this.payment + additionalPayments.reduce((a, b) => a + b, 0),
                interest: interestPart,
                real: realPart,
                left: _total,
                additionalPayments
            });

            if (date.getMonth() == 11) {
                date = new Date(date.getFullYear() + 1, 0, 1);
            } else {
                date = new Date(date.getFullYear(), date.getMonth() + 1, 1);
            }
        }
    }

    openModal(entry: any) {
        this.modalDate = entry.date;
    }

    addPayment() {
        const date = this.modalDate;

        this.extraPayments.push({from: date, to: date, type: 'one-time', number: Number.parseFloat(this.modalPayment)});

        console.log(this.extraPayments);
    }

    getAdditionalPaymentsFromModel(date: Date): number[] {
        return this.extraPayments
            .filter(p => p.from.getFullYear() === date.getFullYear() && p.from.getMonth() === date.getMonth())
            .map(p => p.number);
    }
}
