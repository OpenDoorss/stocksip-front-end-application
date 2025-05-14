import {Component, HostListener} from '@angular/core';
import {MatSidenav, MatSidenavContainer} from '@angular/material/sidenav';
import {MatListItem, MatNavList} from '@angular/material/list';
import {MatIcon} from '@angular/material/icon';
import {MatSidenavContent} from '@angular/material/sidenav';
import {RouterLink, RouterOutlet} from '@angular/router';
import {AsyncPipe, NgIf} from '@angular/common';
import {MatTooltip} from '@angular/material/tooltip';
import {MatToolbar} from '@angular/material/toolbar';
import {ToolbarTitleService} from '../../services/toolbar-title.service';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-side-navbar',
  standalone: true,
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
    MatToolbar,
    RouterOutlet,
    AsyncPipe,
  ],
  templateUrl: './side-navbar.component.html',
  styleUrls: ['./side-navbar.component.css']
})

/**
 * Component for the side navigation bar.
 *
 * @description
 * Feature:
 * - Collapsible navigation menu
 * - Responsive toolbar with dynamic title
 * - Keyboard shortcuts for accessibility
 *
 */
export class SideNavbarComponent {

  /**
   * Controls the expanded/collapsed state of the sidenav
   * @default false
   */
  isExpanded = false;

  /**
   * Observable stream of the current toolbar title
   * @remarks Subscribed to in the template using async pipe
   */
  pageTitle$: Observable<string>;

  /**
   * Creates an instance of SideNavbarComponent
   * @param titleService - Service for managing toolbar titles
   */
  constructor(private titleService: ToolbarTitleService) {
    this.pageTitle$ = this.titleService.currentTitle$;
  }

  /**
   * Handles keyboard events for accessibility shortcuts
   * @param event - The keyboard event
   *
   * @example
   * Press 'M' key to toggle sidenav
   *
   * @HostListener `window:keydown`
   */
  @HostListener('window:keydown', ['$event'])
  handleKeyEvent(event: KeyboardEvent) {
    if (event.key.toLowerCase() === 'm') {
      this.isExpanded = !this.isExpanded;
    }
  }

  /**
   * Toggles the sidenav's expanded/collapsed state
   *
   * @remarks
   * This method is called both by UI interactions and keyboard shortcut
   */
  toggleSidenav() {
    this.isExpanded = !this.isExpanded;
  }

  /**
   * Reference to the browser's alert function
   * @remarks Used for debugging purposes
   */
  protected readonly alert = alert;
}
