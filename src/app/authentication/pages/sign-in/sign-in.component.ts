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
import {SignInRequest} from '../../model/sign-in.request';
import {AuthenticationService} from '../../services/authentication.service';

@Component({
  selector: 'app-sign-in',
  standalone: true,
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css'],
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatIconModule,
    MatCheckboxModule,
    ReactiveFormsModule,
    MatCheckboxModule,
  ]
})
export class SignInComponent {
  hide = true;
  loginForm: FormGroup;
  submitted = false;

  constructor(private router: Router, private fb: FormBuilder, private userService: UserService, private snackBar: MatSnackBar, private authenticationService: AuthenticationService) {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      rememberMe: [false]
    });
  }

  goToRegister() {
    void this.router.navigate(['/sign-up']);
  }

  goToPassword() {
    this.router.navigate(['/password-recover']);
  }

  onSubmit() {
    if (this.loginForm.invalid) return;
    let username = this.loginForm.value.username;
    let password = this.loginForm.value.password;
    const signInRequest = new SignInRequest(username, password);
    this.authenticationService.signIn(signInRequest);
    this.submitted = true;
  }
}
