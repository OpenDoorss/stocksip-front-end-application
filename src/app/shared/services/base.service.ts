
import {HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {HttpClient} from '@angular/common/http';
import {inject} from '@angular/core';
import {catchError, Observable, retry, throwError} from 'rxjs';
import {environment} from '../../../environments/environment';

export abstract class BaseService<T> {
    protected httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    protected serverBaseUrl: string = `${environment.serverBaseUrl}`;
    protected resourceEndpoint: string = '/resources';
    protected http: HttpClient = inject(HttpClient);

    getAll(): Observable<T[]> {
        const url = `${this.serverBaseUrl}${this.resourceEndpoint}`;
        return this.http.get<T[]>(url, this.httpOptions)
            .pipe(
                retry(2),
                catchError((error: HttpErrorResponse) => {
                    console.error('Error:', error);
                    return throwError(() => new Error('Something bad happened; please try again later.'));
                })
            );
    }

    create(data: T): Observable<T> {
        const url = `${this.serverBaseUrl}${this.resourceEndpoint}`;
        return this.http.post<T>(url, data, this.httpOptions)
            .pipe(
                retry(2),
                catchError((error: HttpErrorResponse) => {
                    console.error('Error:', error);
                    return throwError(() => new Error('Something bad happened; please try again later.'));
                })
            );
    }
}
