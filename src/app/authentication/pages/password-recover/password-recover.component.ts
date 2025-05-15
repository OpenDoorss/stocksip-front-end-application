import { Component } from '@angular/core';
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

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  onSubmit() {
    if (this.form.valid) {
      const email = this.form.value.email;
      // Aquí iría la lógica para enviar el correo de recuperación
      console.log('Sending password recovery email to:', email);
    }
  }
}
