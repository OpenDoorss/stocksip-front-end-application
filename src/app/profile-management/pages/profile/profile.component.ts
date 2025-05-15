import {CommonModule} from '@angular/common';
import {MatSidenavModule} from '@angular/material/sidenav';
import {ProfileEditComponent} from '../profile-edit/profile-edit.component';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatListModule} from '@angular/material/list';
import {Component, OnInit} from '@angular/core';
import {PlanDetailsComponent} from '../../components/plan-details/plan-details.component';
import {PlanBenefitsComponent} from '../../components/plan-benefits/plan-benefits.component';
@Component({
  selector: 'app-profile',
  standalone: true,
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  imports: [
    CommonModule,
    ProfileEditComponent,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    MatTooltipModule,
    MatButtonModule,
    PlanDetailsComponent,
    PlanBenefitsComponent
  ]
})
export class ProfileComponent implements OnInit {
  userData = {
    name: 'Juan Pérez',
    email: 'correo123@gmail.com'
  };

  constructor() {}

  ngOnInit(): void {}

  uploadNewPhoto(): void {
    console.log('Subir nueva foto');
  }
}
