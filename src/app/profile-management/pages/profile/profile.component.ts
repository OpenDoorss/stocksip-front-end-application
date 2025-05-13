import { Component, OnInit } from '@angular/core';
import {ProfileEditComponent} from '../profile-edit/profile-edit.component';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  imports: [
    ProfileEditComponent
  ],
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  userData = {
    name: 'Juan Pérez',
    email: 'correo123@gmail.com'
  };

  constructor() { }

  ngOnInit(): void {
  }

  uploadNewPhoto(): void {
    console.log('Subir nueva foto');
  }
}
