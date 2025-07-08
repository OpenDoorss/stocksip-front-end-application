import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AuthenticationService }  from '../../../authentication/services/authentication.service';
import { AccountService }         from '../../../payment-and-subscriptions/services/account.service';
import { UserProfile }            from '../../services/profile.service';
import { Account }                from '../../../payment-and-subscriptions/model/account.entity';

import { ToolBarComponent }       from '../../../public/components/tool-bar/tool-bar.component';
import { SideNavbarComponent }    from '../../../public/components/side-navbar/side-navbar.component';
import { ProfileEditComponent }   from '../../components/profile-edit/profile-edit.component';
import { PlanDetailsComponent }   from '../../components/plan-details/plan-details.component';

@Component({
  selector   : 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls  : ['./profile.component.css'],
  standalone : true,
  imports: [
    ToolBarComponent,
    SideNavbarComponent,
    ProfileEditComponent,
    PlanDetailsComponent
  ]
})
export class ProfileComponent implements OnInit {

  @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;

  userData: UserProfile = {
    profileId: 0,
    accountId: 0,
    userOwnerId: 0,
    name : '',
    businessName: '',
    email: '',
    role : ''
  };

  constructor(
    private authService   : AuthenticationService,
    private accountService: AccountService
  ) {}

  ngOnInit(): void {
    const { accountId } = this.authService.getCurrentUser();

    if (!accountId) {
      console.error('[Profile] No hay accountId en sesión.');
      return;
    }

    this.accountService.getById(accountId).subscribe({
      next: (acc: Account) => {
        console.log('[Profile] Cuenta recibida del backend:', acc);

        const cleanedName = this.normalizeBusinessName(acc.businessName);
        console.log('[Profile] businessName bruto  →', acc.businessName);
        console.log('[Profile] businessName limpio →', cleanedName);

        const finalName = cleanedName !== 'Nombre no disponible'
          ? cleanedName
          : acc.username ?? 'Nombre no disponible';

        this.userData = {
          profileId   : 0,
          accountId   : acc.accountId,
          userOwnerId : acc.userOwnerId ?? 0,
          name        : finalName,
          businessName: cleanedName,
          email       : acc.username ?? '',
          role        : acc.role ?? ''
        };

        console.log('[Profile] userData final →', this.userData);
      },
      error: err => console.error('[Profile] Error al obtener cuenta:', err)
    });
  }

  private normalizeBusinessName(raw: any): string {
    const name = (typeof raw === 'object' && raw !== null)
      ? (raw.value ?? String(raw))
      : String(raw ?? '');

    const trimmed = name.trim();

    const isoPattern = /^\d{4}-\d{2}-\d{2}T/;
    if (!trimmed || trimmed.toLowerCase() === 'null' || isoPattern.test(trimmed)) {
      return 'Nombre no disponible';
    }
    return trimmed;
  }
}
