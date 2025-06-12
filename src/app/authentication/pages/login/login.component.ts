import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCheckboxModule } from '@angular/material/checkbox';
import {ReactiveFormsModule, FormBuilder, Validators, FormGroup} from '@angular/forms';
import {UserService} from '../../services/user.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {NgOptimizedImage} from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatIconModule,
    MatCheckboxModule,
    ReactiveFormsModule,
    MatCheckboxModule,
    NgOptimizedImage
  ]
})
export class LoginComponent {
  hide = true;
  loginForm: FormGroup;


  goToConfirmation() {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
      console.log('Logging in with:', email, password);

      this.userService.login(email, password).subscribe(success => {
        console.log('Login response:', success);
        if (success) {
          this.router.navigate(['warehouse']);
        } else {
          this.snackBar.open('Invalid email or password', 'Close', {
            duration: 3000,
          });
        }
      });
    } else {
      this.loginForm.markAllAsTouched();
    }
  }

  constructor(private router: Router, private fb: FormBuilder, private userService: UserService, private snackBar: MatSnackBar) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      rememberMe: [false]
    });
  }

  goToRegister() {
    void this.router.navigate(['/register']);
  }

  goToPassword() {
    this.router.navigate(['/password-recover']);
  }

  goToDashboard() {
    this.router.navigate(['/dashboard']);
  }
}
