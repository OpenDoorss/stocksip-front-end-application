import { Component } from '@angular/core';
import {MatInputModule } from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {Router} from '@angular/router';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {NgOptimizedImage} from '@angular/common';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatIconModule,
    MatCheckboxModule,
    NgOptimizedImage
  ],
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  hide = true;
  hideConfirm = true;

  constructor(private router: Router) {}
  goToSignIn() {
    this.router.navigate(['/login']);
  }
}
