import { MatButtonModule } from '@angular/material/button';
import { TranslateService } from '@ngx-translate/core';
import {Router, RouterModule} from '@angular/router';
import { SideNavbarComponent } from "./public/components/side-navbar/side-navbar.component";
import {Component} from '@angular/core';

@Component({
  selector: 'app-root',
  imports: [MatButtonModule, RouterModule, SideNavbarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'stocksip-front-end-application';

  constructor(private router: Router, private translate: TranslateService){
    translate.use('en');
    translate.setDefaultLang('es');
  }

}
