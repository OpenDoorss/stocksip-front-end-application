import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import {MatIconButton} from '@angular/material/button';
import {Observable} from 'rxjs';
import {ToolbarTitleService} from '../../services/toolbar-title.service';
import {MatToolbar} from '@angular/material/toolbar';
import {LanguageSwitcherComponent} from '../language-switcher/language-switcher.component';


@Component({
  selector: 'app-side-navbar',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    MatTooltipModule,
    MatIconButton,
    MatToolbar,
    LanguageSwitcherComponent
  ],
  templateUrl: './side-navbar.component.html',
  styleUrls: ['./side-navbar.component.css']
})
export class SideNavbarComponent {
  pageTitle$: Observable<string>;

  constructor(private titleService: ToolbarTitleService) {
    this.pageTitle$ = this.titleService.currentTitle$;
  }

  isExpanded = false;
  toggleSidebar(): void {
    this.isExpanded = !this.isExpanded;
  }
}
