import { Routes } from '@angular/router';
import {AlertsComponent} from './alerts-and-notifications/pages/alerts-dashboard/alerts.component';

export const routes: Routes = [
  { path: '', redirectTo: 'prueba', pathMatch: 'full' }, // lo mismo
  { path: 'alerts', component: AlertsComponent },
  //{ path: 'prueba', component: PruebaComponent }, //cambiar a la ruta que se necesite
];
