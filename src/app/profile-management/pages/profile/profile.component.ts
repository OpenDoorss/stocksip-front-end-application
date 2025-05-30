import {CommonModule} from '@angular/common';
import {MatSidenavModule} from '@angular/material/sidenav';
import {ProfileEditComponent} from '../profile-edit/profile-edit.component';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatListModule} from '@angular/material/list';
import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {PlanDetailsComponent} from '../../components/plan-details/plan-details.component';
import {PlanBenefitsComponent} from '../../components/plan-benefits/plan-benefits.component';
import {ProfileService, UserProfile} from '../../services/profile.service';
import {UserService} from '../../../authentication/services/user.service';
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
  @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;

  userData: UserProfile = {
    profileId: 0,
    name: '',
    email: '',
    role: ''
  };


  constructor(
    private profileService: ProfileService,
    private userService: UserService
    ) {}



  ngOnInit(): void {
    const currentUser = this.userService.getCurrentUser();

    if (!currentUser || !currentUser.profileId) {
      console.error('No profileId found in currentUser');
      return;
    }

    const profileId = currentUser.profileId;

    console.log('Fetching profile for ID:', profileId);

    this.profileService.getProfileById(profileId).subscribe({
      next: (profile) => {
        console.log('Profile fetched:', profile);
        this.userData = profile;
      },
      error: (err) => {
        console.error('Error fetching profile:', err);
      }
    });

  }


  uploadNewPhoto(): void {
    console.log('Subir nueva foto');
    this.fileInput.nativeElement.click();
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const file = input.files[0];
      console.log('Archivo seleccionado:', file);

      const reader = new FileReader();
      reader.onload = () => {
        const base64Image = reader.result as string;
        console.log('Imagen en base64:', base64Image);
      };
      reader.readAsDataURL(file);
    }
  }
}
