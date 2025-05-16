import { Component } from '@angular/core';
import {Router, RouterOutlet} from '@angular/router';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  template: '<router-outlet></router-outlet>',
  imports: [
    RouterOutlet
  ],
  styleUrls: ['./app.component.css'],
})

export class AppComponent {
  title = 'stocksip-front-end-application';

  constructor(private router: Router, private translate: TranslateService){
    translate.use('en');
    translate.setDefaultLang('es');
  }
}
