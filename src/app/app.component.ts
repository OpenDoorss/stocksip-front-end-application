import { Component } from '@angular/core';
import {RecoverPasswordComponent} from './authentication/pages/password-recover/password-recover.component';
import { ConfirmationCodeComponent} from './authentication/pages/confirmation-code/confirmation-code.component';
import { ProfileEditComponent } from './profile-management/pages/profile-edit/profile-edit.component';
import { ProfileComponent } from './profile-management/pages/profile/profile.component';
@Component({
  selector: 'app-root',
  template: '<app-profile></app-profile>',
  imports: [
    RecoverPasswordComponent
    , ConfirmationCodeComponent,
    ProfileEditComponent,
    ProfileComponent
  ],
  styleUrls: ['./app.component.css']
})
export class AppComponent {}
