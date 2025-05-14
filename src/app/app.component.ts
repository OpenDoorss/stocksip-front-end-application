import { Component } from '@angular/core';
import { ProfileComponent } from './profile-management/pages/profile/profile.component';
@Component({
  selector: 'app-root',
  template: '<app-profile></app-profile>',
  imports: [
    ProfileComponent
  ],
  styleUrls: ['./app.component.css']
})
export class AppComponent {}
