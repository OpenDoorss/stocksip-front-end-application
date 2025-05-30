import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { delay, map, Observable, of, switchMap } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private currentUser: any = null;
  private baseUrl = environment.apiUrl;
  private usersResourceEndpointPath = environment.userEndpointPath;
  private profilesResourceEndpointPath = environment.profileEndpointPath;

  constructor(private http: HttpClient) {}

  login(username: string, password: string): Observable<boolean> {
    const url = `${this.baseUrl}${this.usersResourceEndpointPath}?username=${username}&password=${password}`;

    return this.http.get<any[]>(url).pipe(
      switchMap(users => {
        if (users.length > 0) {
          const user = users[0];
          const profileUrl = `${this.baseUrl}${this.profilesResourceEndpointPath}?userId=${user.id}`;
          return this.http.get<any[]>(profileUrl).pipe(
            map(profiles => {
              if (profiles.length === 0) {
                throw new Error('Profile not found for user');
              }
              const profile = profiles[0];
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
