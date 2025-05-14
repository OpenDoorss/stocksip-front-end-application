import {CommonModule} from '@angular/common';
import {SideNavbarComponent} from '../../../public/components/side-navbar/side-navbar.component';
import {MatSidenavModule} from '@angular/material/sidenav';
import {ProfileEditComponent} from '../profile-edit/profile-edit.component';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatListModule} from '@angular/material/list';
import {Component, OnInit} from '@angular/core';
import {ToolbarContentComponent} from '../../../public/components/toolbar-content/toolbar-content.component';
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
    SideNavbarComponent,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    MatTooltipModule,
    MatButtonModule,
    ToolbarContentComponent,
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
