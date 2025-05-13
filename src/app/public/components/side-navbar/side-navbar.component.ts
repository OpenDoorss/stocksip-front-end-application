import { Component } from '@angular/core';
import {MatSidenav, MatSidenavContainer} from '@angular/material/sidenav';

@Component({
  selector: 'app-side-navbar',
  imports: [
    MatSidenav,
    MatSidenavContainer
  ],
  templateUrl: './side-navbar.component.html',
  styleUrl: './side-navbar.component.css'
})
export class SideNavbarComponent {

}
