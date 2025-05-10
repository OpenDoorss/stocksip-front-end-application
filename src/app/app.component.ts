import { Component } from '@angular/core';
import { LoginComponent} from './authentication/login/login.component';
import { RegisterComponent} from './authentication/register/register.component';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RegisterComponent],
  template: `<app-register></app-register>`
})
export class AppComponent {}
