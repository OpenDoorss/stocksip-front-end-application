import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../../environments/environment.development';
import { Observable, of, delay, switchMap, map } from 'rxjs';

import { Profile } from '../../profile-management/models/profile.entity';
import { Account } from '../../payment-and-subscriptions/model/account.entity';

@Injectable({ providedIn: 'root' })
export class UserService {
  private readonly baseUrl           = environment.apiUrl;
  private readonly usersEndpoint     = environment.userEndpointPath;
  private readonly profilesEndpoint  = environment.profileEndpointPath;
  private readonly accountsEndpoint  = environment.accountsEndpointPath;

  private currentUser: any = null;

  constructor(private http: HttpClient) {}

  login(username: string, password: string): Observable<boolean> {
    const url = `${this.baseUrl}${this.usersEndpoint}?username=${username}&password=${password}`;

    return this.http.get<any[]>(url).pipe(
      switchMap(users => {
        if (users.length === 0) return of(false).pipe(delay(500));
        const user = users[0];

        return this.http
          .get<Profile[]>(`${this.baseUrl}${this.profilesEndpoint}?id=${user.profileId}`)
          .pipe(
            switchMap(profiles => {
              if (profiles.length === 0) throw new Error('Profile not found');
              const profile = profiles[0];

              if (!profile.role) throw new Error('Profile has no role');

              return this.http
                .get<Account[]>(`${this.baseUrl}${this.accountsEndpoint}?userOwnerId=${user.id}`)
                .pipe(
                  map(accounts => {
                    const account = accounts[0] ?? null;

                    this.currentUser = {
                      ...user,
                      profile,
                      account,
                      role: account?.role || profile.role
                    };

                    localStorage.setItem('currentUser', JSON.stringify(this.currentUser));
                    return true;
                  })
                );
            })
          );
      })
    );
  }

  private initFromStorage(): void {
    if (!this.currentUser) {
      const saved = localStorage.getItem('currentUser') ?? sessionStorage.getItem('currentUser');
      this.currentUser = saved ? JSON.parse(saved) : null;
    }
  }

  getCurrentUser() {
    this.initFromStorage();
    return this.currentUser;
  }

  getCurrentUserProfile(): Profile | null {
    return this.getCurrentUser()?.profile ?? null;
  }

  getCurrentUserAccount(): Account | null {
    return this.getCurrentUser()?.account ?? null;
  }

  register(data: { name: string; email: string; password: string; role: string }): Observable<any> {
    const userPayload = { username: data.email, password: data.password };

    return this.http.post<any>(`${this.baseUrl}${this.usersEndpoint}`, userPayload).pipe(
      switchMap(newUser =>
        this.http.post<Profile>(`${this.baseUrl}${this.profilesEndpoint}`, {
          id: newUser.id,
          profileId: newUser.id,
          name: data.name,
          email: data.email,
          role: data.role
        }).pipe(
          switchMap(() =>
            this.http.patch<any>(`${this.baseUrl}${this.usersEndpoint}/${newUser.id}`, {
              profileId: newUser.id
            })
          ),
          switchMap(() =>
            this.http.post<Account>(`${this.baseUrl}${this.accountsEndpoint}`, {
              id: newUser.id,
              userOwnerId: newUser.id,
              role: data.role,
              businessName: data.name + ' Business',
              name: data.name,
              email: data.email
            })
          )
        )
      )
    );
  }

  getProfileByEmail(email: string): Observable<Profile | null> {
    const params = new HttpParams().set('email', email);
    return this.http
      .get<Profile[]>(`${this.baseUrl}${this.profilesEndpoint}`, { params })
      .pipe(map(p => p[0] ?? null));
  }

  getAccountByEmail(email: string): Observable<Account | null> {
    const params = new HttpParams().set('email', email);
    return this.http
      .get<Account[]>(`${this.baseUrl}${this.accountsEndpoint}`, { params })
      .pipe(map(a => a[0] ?? null));
  }

  getAccountById(accountId: number): Observable<Account | null> {
    return this.http
      .get<Account>(`${this.baseUrl}${this.accountsEndpoint}/${accountId}`)
      .pipe(map(a => a ?? null));
  }
}
