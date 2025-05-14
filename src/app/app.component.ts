import { MatButtonModule } from '@angular/material/button';
import { TranslateService } from '@ngx-translate/core';
import { CareGuideCreateComponent } from './analytics-and-reporting/pages/care-guide-create-and-edit/care-guide-create/care-guide-create.component';
import { CareGuideListComponent } from './analytics-and-reporting/components/care-guide-list/care-guide-list.component';
import { RouterModule } from '@angular/router';
import { ReportListComponent } from "./analytics-and-reporting/components/report-list/report-list.component";
import { SideNavbarComponent } from "./public/components/side-navbar/side-navbar.component";

@Component({
  selector: 'app-root',
  imports: [MatButtonModule, RouterLink, CareGuideCreateComponent, CareGuideListComponent, RouterModule, ReportListComponent, SideNavbarComponent],
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
