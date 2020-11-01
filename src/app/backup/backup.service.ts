import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {environment} from "../../environments/environment";

export interface Backup {
    filename: string;
}

@Injectable({
    providedIn: 'root'
})
export class BackupService {

    constructor(private http: HttpClient) {
        console.log(`constructor started`);
        console.log(`constructor finished`);
    }

    create(): Observable<any> {
        return this.http.post<any>(`${environment.javaBackendHost}/backups`, null)
            .pipe(
                catchError(BackupService.handleError)
            );
    }

    list(): Observable<Backup[]> {
        return this.http.get<Backup[]>(`${environment.javaBackendHost}/backups`)
            .pipe(
                catchError(BackupService.handleError)
            );
    }

    private static handleError(error: HttpErrorResponse) {
        if (error.error instanceof ErrorEvent) {
            // A client-side or network error occurred. Handle it accordingly.
            console.error('An error occurred:', error.error.message);
        } else {
            // The backend returned an unsuccessful response code.
            // The response body may contain clues as to what went wrong.
            console.error(
                `Backend returned code ${error.status}, ${JSON.stringify(error)} ` +
                `body was: ${JSON.stringify(error.error)}`);
        }
        // Return an observable with a user-facing error message.
        return throwError(error.error);
    }
}
