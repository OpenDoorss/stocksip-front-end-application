import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCheckboxModule } from '@angular/material/checkbox';
import {NgIf, NgOptimizedImage} from '@angular/common';
import {NotificationComponent} from '../../../public/components/notificacion/notification.component';

@Component({
  selector: 'app-register',
  standalone: true,
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatIconModule,
    MatCheckboxModule,
    NgOptimizedImage,
    NotificationComponent,
    NgIf
  ]
})
export class RegisterComponent {
  hide = true;
  hideConfirm = true;
  registerForm: FormGroup;


  showNotification = false;
  notificationType: 'success' | 'alert' = 'success';
  notificationTitle = '';
  notificationContent = '';

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router
  ) {
    this.registerForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      role: ['', Validators.required],
    });
  }

  onSubmit(): void {
    if (this.registerForm.invalid) {
      this.showNotification = true;
      this.notificationType = 'alert';
      this.notificationTitle = 'Invalid form';
      this.notificationContent = 'Please fill out all fields correctly.';
      return;
    }

    const { name, email, password, role } = this.registerForm.value;

      this.userService.register({ name, email, password, role }).subscribe({
        next: () => this.router.navigate(['/sign-in']),
        error: (err) => console.error('Registration Error:', err)
      });
    }
    // Verifica si el correo ya existe
    this.userService.getAccountByEmail(email).subscribe({
      next: (account) => {
        if (account) {
          // Notificación de alerta si ya existe
          this.notificationType = 'alert';
          this.notificationTitle = 'Email already exists';
          this.notificationContent = 'An account with this email already exists.';
          this.showNotification = true;
          return;
        }

        // Si no existe, registramos
        this.userService.register({ name, email, password, role }).subscribe({
          next: () => {
            this.notificationType = 'success';
            this.notificationTitle = 'Account created';
            this.notificationContent = 'Your account has been successfully created.';
            this.showNotification = true;

            setTimeout(() => this.router.navigate(['/login']), 2000);
          },
          error: (err) => {
            this.notificationType = 'alert';
            this.notificationTitle = 'Registration failed';
            this.notificationContent = 'There was a problem creating your account.';
            this.showNotification = true;
            console.error('Registration Error:', err);
          }
        });
      },
      error: () => {
        this.notificationType = 'alert';
        this.notificationTitle = 'Server Error';
        this.notificationContent = 'Unable to check email availability.';
        this.showNotification = true;
      }
    });
  }

  goToSignIn() {
    this.router.navigate(['/sign-in']);
  }
}
