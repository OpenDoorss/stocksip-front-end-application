import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidatorFn } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ProfileService } from '../../services/profile.service';
import { Profile } from '../../models/profile.entity';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { MapDialogComponent } from '../../components/map-dialog/map-dialog.component';

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
  standalone: true,
  imports: [
    MatIconModule,
    MatInputModule,
    MatButtonModule,
    MatFormFieldModule,
    MatCardModule,
    ReactiveFormsModule,
    CommonModule,
    MapDialogComponent,
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
    private profileService: ProfileService,
    private dialog: MatDialog

  ) {
    this.form = this.fb.group(
      {
        name: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        businessName: ['', Validators.required],
        businessAddress: ['', Validators.required], // <-- agregado
        phone: ['', Validators.required],
        currentPassword: [''],
        newPassword: [''],
        confirmPassword: ['']
      },
      { validators: passwordMatchValidator() }
    );
  }

  save(): void {

    if (this.form.hasError('passwordMismatch')) {
      this.snackBar.open('Las contraseñas no coinciden', 'Cerrar', {
        duration: 3000
      });
      return;
    }

    if (this.form.valid) {
      const profile: Profile = this.form.value;
      this.profileService.editProfile(profile).subscribe(() => {
        this.snackBar.open('Perfil guardado correctamente', 'Cerrar', {
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

  openMap(): void {
    const address = this.form.get('businessAddress')?.value || '';
    this.dialog.open(MapDialogComponent, {
      data: address,
      width: '600px'
    });
  }
}
