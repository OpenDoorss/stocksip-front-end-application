import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, throwError } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Profile } from '../models/profile.entity';

export interface UserProfile {
  /** Id propio del perfil (tabla profiles) */
  profileId: number;

  /** Relación con la cuenta (tabla accounts) */
  accountId?: number;
  userOwnerId?: number;

  /** Datos personales / comerciales */
  name         : string;    // nombre de la persona
  businessName?: string;    // nombre comercial
  email        : string;
  role         : string;

  /** Información adicional */
  businessAddress?: string;
  phone?         : string;
  createdAt?     : string;
  status?        : string;  // INACTIVE, ACTIVE, etc.
}

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getProfileById(profileId: number): Observable<UserProfile> {
    const url = `${this.apiUrl}/profiles?profileId=${profileId}`;
    console.log('URL llamada API getProfileById:', url);
    return this.http.get<UserProfile[]>(url).pipe(
      map(profiles => {
        if (profiles.length === 0) {
          throw new Error('Profile not found');
        }
        return profiles[0];
      }),
      catchError(err => {
        console.error('Error fetching profile:', err);
        return throwError(() => err);
      })
    );
  }

  editProfile(profile: Profile): Observable<Profile> {
    return this.http.put<Profile>(`${this.apiUrl}/profiles/${profile.profileId}`, profile);
  }
}
