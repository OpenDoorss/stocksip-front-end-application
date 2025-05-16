import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { TranslatePipe } from '@ngx-translate/core';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

import { CareGuide } from '../../model/care-guide.entity';
import { CareGuideService } from '../../services/care-guide.service';
import { CareGuideItemComponent } from '../care-guide-item/care-guide-item.component';
import { LanguageSwitcherComponent } from '../../../public/components/language-switcher/language-switcher.component';

@Component({
  selector: 'app-care-guide-list',
  imports: [
    CareGuideItemComponent,
    FormsModule,
    LanguageSwitcherComponent,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    TranslatePipe
  ],
  templateUrl: './care-guide-list.component.html',
  styleUrls: ['./care-guide-list.component.css']
})
export class CareGuideListComponent {
  careGuides: CareGuide[] = [];
  searchText = '';
  constructor(
    private careGuideService: CareGuideService,
    private router: Router
  ) {}

  onSearch(): void {
    //call service to filter careGuides
    console.log('Search:', this.searchText);
  }

  navigate(url: string): void {
    this.router.navigate([url]);
  }
}
