import { Component } from '@angular/core';
import {RecoverPasswordComponent} from './authentication/pages/password-recover/password-recover.component';
import { ConfirmationCodeComponent} from './authentication/pages/confirmation-code/confirmation-code.component';
import { ProfileEditComponent } from './profile-management/pages/profile-edit/profile-edit.component';
@Component({
  selector: 'app-root',
  template: '<app-profile-edit></app-profile-edit>',
  imports: [
    RecoverPasswordComponent
    , ConfirmationCodeComponent,
    ProfileEditComponent
  ],
  styleUrls: ['./app.component.css']
})
export class AppComponent {}
