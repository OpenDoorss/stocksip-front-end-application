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
import {SignUpRequest} from '../../model/sign-up.request';
import {AuthenticationService} from '../../services/authentication.service';

@Component({
  selector: 'app-sign-up',
  standalone: true,
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css'],
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
export class SignUpComponent {
  hide = true;
  hideConfirm = true;
  registerForm: FormGroup;

  showNotification = false;
  notificationType: 'success' | 'alert' = 'success';
  notificationTitle = '';
  notificationContent = '';

  roles = [
    { value: 'LiquorStoreOwner', viewValue: 'Liquor Store Owner' },
    { value: 'Supplier', viewValue: 'Supplier' }
  ];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authenticationService: AuthenticationService
  ) {
    this.registerForm = this.fb.group({
      username: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      validatePassword: ['', Validators.required],
      businessName: ['', Validators.required],
      role: ['', Validators.required],
    });
  }

  onSubmit(): void {

    this.registerForm.markAllAsTouched();

    if (this.registerForm.invalid) {
      this.showNotification = true;
      this.notificationType = 'alert';
      this.notificationTitle = 'Invalid form';
      this.notificationContent = 'Please fill out all fields correctly.';
      return;
    }


    const { username, password, validatePassword, businessName, role } = this.registerForm.value;

    const signUpRequest = new SignUpRequest(
      username,
      password,
      validatePassword,
      businessName,
      role
    );

    this.authenticationService.signUp(signUpRequest);
  }

  goToSignIn() {
    this.router.navigate(['/sign-in']);
  }
}
