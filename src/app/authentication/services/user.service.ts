import { Injectable } from '@angular/core';
import {environment} from '../../../environments/environment.development';
import {delay, map, Observable, of, switchMap} from 'rxjs';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private currentUser: any = null;
  private baseUrl = environment.apiUrl;
  private usersResourceEndpointPath = environment.userEndpointPath;

  constructor(private http: HttpClient) {}

  login(username: string, password: string): Observable<boolean> {
    const url = `${this.baseUrl}/users?username=${username}&password=${password}`;

    return this.http.get<any[]>(url).pipe(
      switchMap(users => {
        if (users.length > 0) {
          const user = users[0];
          return this.http.get<any>(`${this.baseUrl}${this.usersResourceEndpointPath}`).pipe(
            map(profile => {
              this.currentUser = {
                ...user,
                profile
              };
              localStorage.setItem('currentUser', JSON.stringify(this.currentUser));
              return true;
            })
          );
        } else {
          return of(false).pipe(delay(500));
        }
      })
    );
  }

  getCurrentUser() {
    if (!this.currentUser) {
      const savedUser = localStorage.getItem('currentUser') || sessionStorage.getItem('currentUser');
      this.currentUser = savedUser ? JSON.parse(savedUser) : null;
    }
    return this.currentUser;
  }
}
