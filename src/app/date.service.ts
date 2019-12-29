import {Injectable} from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class DateService {

    constructor() {
    }

    // month 0-based
    getMonthName(month: number): string {
        return new Date(0, month).toLocaleString('en', {month: 'long'});
    }

    // month 0-based
    getAmountOfDays(year: number, month: number): number {
        return new Date(year, month + 1, 0).getDate();
    }
}