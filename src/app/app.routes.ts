import { Routes } from '@angular/router';
import {LoginComponent} from './authentication/pages/login/login.component';
import {RegisterComponent} from './authentication/pages/register/register.component';
import {ConfirmationCodeComponent} from './authentication/pages/confirmation-code/confirmation-code.component';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'confirmation-code', component: ConfirmationCodeComponent }
];



