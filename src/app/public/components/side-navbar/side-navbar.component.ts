import {Component, HostListener} from '@angular/core';
import {MatSidenav, MatSidenavContainer} from '@angular/material/sidenav';
import {MatListItem, MatNavList} from '@angular/material/list';
import {MatIcon} from '@angular/material/icon';
import {MatSidenavContent} from '@angular/material/sidenav';
import {RouterLink} from '@angular/router';
import {NgIf} from '@angular/common';
import {MatTooltip} from '@angular/material/tooltip';

@Component({
  selector: 'app-side-navbar',
  imports: [
    MatSidenavContainer,
    MatSidenav,
    MatListItem,
    MatIcon,
    MatNavList,
    MatSidenavContent,
    RouterLink,
    NgIf,
    MatTooltip,
  ],
  templateUrl: './side-navbar.component.html',
  styleUrl: './side-navbar.component.css'
})
export class SideNavbarComponent {
  isExpanded = false;

  @HostListener('window:keydown', ['$event'])
  handleKeyEvent(event: KeyboardEvent) {
    if (event.key.toLowerCase() === 'm') {
      this.isExpanded = !this.isExpanded;
    }
  }

  protected readonly alert = alert;
}
