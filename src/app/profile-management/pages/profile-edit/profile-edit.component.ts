import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidatorFn } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ProfileService } from '../../services/profile.service';
import { Profile } from '../../models/profile.entity';
import { MatIconModule} from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
function passwordMatchValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const newPassword = control.get('newPassword')?.value;
    const confirmPassword = control.get('confirmPassword')?.value;
    return newPassword && confirmPassword && newPassword !== confirmPassword
      ? { passwordMismatch: true }
      : null;
  };
}

@Component({
  selector: 'app-profile-edit',
  templateUrl: './profile-edit.component.html',
  styleUrls: ['./profile-edit.component.css'],
  imports: [
    MatIconModule,
    MatInputModule,
    MatButtonModule,
    MatFormFieldModule,
    MatCardModule,
    ReactiveFormsModule,
    CommonModule
  ],
})
export class ProfileEditComponent {
  form: FormGroup;

  hideActual = true;
  hideNew = true;
  hideConfirm = true;

  constructor(
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private profileService: ProfileService
  ) {
    this.form = this.fb.group(
      {
        name: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        businessName: ['', Validators.required],
        phone: ['', Validators.required],
        currentPassword: [''],
        newPassword: [''],
        confirmPassword: ['']
      },
      { validators: passwordMatchValidator() }
    );
  }

  save(): void {
    if (this.form.valid) {
      const profile: Profile = this.form.value;

      this.profileService.createProfile(profile).subscribe(() => {
        this.snackBar.open('Profile saved successfully', 'Close', {
          duration: 3000
        });
        this.form.reset();
      });
    } else {
      this.form.markAllAsTouched();
    }
  }

  cancel(): void {
    this.form.reset();
  }
}

