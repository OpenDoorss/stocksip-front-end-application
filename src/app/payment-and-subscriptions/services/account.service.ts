import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, throwError } from 'rxjs';
import { environment } from '../../../environments/environment';
import {Account} from '../model/account.entity';

export interface UserAccount {
  accountId: string;
  name: string;
  email: string;
  role: string;
}

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  private apiUrl = environment.baseServerUrl;

  constructor(private http: HttpClient) {}

  getAccountById(accountId: number): Observable<UserAccount> {
    const url = `${this.apiUrl}/accounts?accountId=${accountId}`;
    console.log('URL llamada API getAccountById:', url);
    return this.http.get<UserAccount[]>(url).pipe(
      map(accounts => {
        if (accounts.length === 0) {
          throw new Error('Account not found');
        }
        return accounts[0];
      }),
      catchError(err => {
        console.error('Error fetching account:', err);
        return throwError(() => err);
      })
    );
  }

  getById(id: number): Observable<Account> {
    return this.http.get<Account>(`${this.apiUrl}/accounts/${id}`);
  }

  editAccount(account: Account): Observable<Account> {
    return this.http.put<Account>(`${this.apiUrl}/accounts/${account.accountId}`, account);
  }
}

