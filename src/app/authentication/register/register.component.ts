import { Component } from '@angular/core';
import {MatFormField, MatInput, MatLabel} from '@angular/material/input';
import {MatOption} from '@angular/material/core';
import {MatSelect} from '@angular/material/select';
import {MatButton, MatIconButton} from '@angular/material/button';
import {MatIcon} from '@angular/material/icon';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  imports: [
    MatFormField,
    MatOption,
    MatLabel,
    MatSelect,
    MatButton,
    MatInput,
    MatIconButton,
    MatIcon
  ],
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  hide = true;
  hideConfirm = true;
  selectedRole: string = 'licoreria';
}
