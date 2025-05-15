import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatFormField, MatInput} from '@angular/material/input';

@Component({
  selector: 'app-password-recover',
  templateUrl: './password-recover.component.html',
  imports: [
    ReactiveFormsModule,
    MatFormField,
    MatFormField,
    MatInput,
    MatFormField
  ],
  styleUrls: ['./password-recover.component.css']
})
export class RecoverPasswordComponent {
  form: FormGroup;

  constructor(private fb: FormBuilder, private router: Router) {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  onSubmit() {
    if (this.form.valid) {
      this.goToConfirmation();
    } else {
      console.log('Form is invalid');
    }
  }

  goToConfirmation() {
    const email = this.form.value.email;
    console.log('Sending password recovery email to:', email);
    this.router.navigate(['/confirmation-code']);
  }
}
