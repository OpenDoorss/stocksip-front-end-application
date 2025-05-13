import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {SideNavbarComponent} from './public/components/side-navbar/side-navbar.component';


@Component({
  selector: 'app-root',
  imports: [RouterOutlet, SideNavbarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})

export class AppComponent {
  title = 'stocksip-front-end-application';
}
