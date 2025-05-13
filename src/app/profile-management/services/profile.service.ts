import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Profile } from '../models/profile.entity';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  constructor() {}

  createProfile(profile: Profile): Observable<Profile> {
    console.log('Perfil enviado al backend:', profile);

    return of(profile);
  }
}

