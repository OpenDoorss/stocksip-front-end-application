import { Routes } from '@angular/router';
import {LoginComponent} from './authentication/pages/login/login.component';
import {RegisterComponent} from './authentication/pages/register/register.component';
import {ConfirmationCodeComponent} from './authentication/pages/confirmation-code/confirmation-code.component';
import {SideNavbarComponent} from './public/components/side-navbar/side-navbar.component';
import {RecoverPasswordComponent} from './authentication/pages/password-recover/password-recover.component';

const WarehouseComponent  = () => import('./inventory-management/pages/warehouses/warehouses.component').then(m => m.WarehousesComponent);
const CreateAndEditWarehouseComponent  = () => import('./inventory-management/pages/warehouse-create-and-edit/warehouse-create-and-edit.component').then(m => m.WarehouseCreateAndEditComponent);
const ReportListComponent = () => import('./analytics-and-reporting/components/report-list/report-list.component').then(m=>m.ReportListComponent)
const CareGuideListComponent = () => import('./analytics-and-reporting/components/care-guide-list/care-guide-list.component').then(m=>m.CareGuideListComponent)
const CareGuideCreateComponent = () => import('./analytics-and-reporting/pages/care-guide-create-and-edit/care-guide-create/care-guide-create.component').then(m=>m.CareGuideCreateComponent)
const CareGuideEditComponent = () => import('./analytics-and-reporting/pages/care-guide-create-and-edit/care-guide-edit/care-guide-edit.component').then(m=>m.CareGuideEditComponent)
const PageNotFoundComponent = () => import('./public/pages/page-not-found/page-not-found.component').then(m=>m.PageNotFoundComponent)
const ProfileComponent = () => import('./profile-management/pages/profile/profile.component').then(m=>m.ProfileComponent)

const AlertListComponent = () => import('./alerts-and-notifications/components/alert-list/alert-list.component').then(m=>m.AlertListComponent)

const baseTitle = 'StockSip'
const ZoneComponent  = () => import('./inventory-management/pages/zones/zones.component').then(m => m.ZonesComponent);

const DashboardComponent  = () => import('./analytics-and-reporting/pages/dashboard/dashboard.component').then(m => m.DashboardComponent);

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'password-recover', component: RecoverPasswordComponent},
  { path: 'confirmation-code', component: ConfirmationCodeComponent },

  {
    path: '',
    component: SideNavbarComponent,
    children: [
      { path: 'warehouse',                         loadComponent: WarehouseComponent,              data: { title: 'Warehouses' } },
      { path: 'warehouse/create',                  loadComponent: CreateAndEditWarehouseComponent, data: { title: 'Create Warehouse' } },
      { path: 'warehouse/edit/:warehouseId',       loadComponent: CreateAndEditWarehouseComponent, data: {title: 'Edit Warehouse'} },
      { path: 'warehouse/zones/:warehouseId',     loadComponent: ZoneComponent,                   data: { title: 'Zones' } },
      { path: 'report-list', loadComponent: ReportListComponent, data: { title: 'Report list' } },
      { path: 'care-guide-list', loadComponent: CareGuideListComponent, data: { title: 'Care Guide List'}},
      { path: 'care-guide-create',loadComponent: CareGuideCreateComponent, data: { title: 'Care Guide Create'}},
      { path: 'care-guide-edit',loadComponent: CareGuideEditComponent, data: { title: 'Care Guide Edit'}},
      { path: 'profile', loadComponent: ProfileComponent, data: { title: 'Profile' } },
      { path: 'alerts', loadComponent: AlertListComponent, data: { title: 'Alerts' } },
      { path: 'dashboard', loadComponent: DashboardComponent, data: { title: 'Dashboard' } },
    ]
  },

  { path: '**',loadComponent: PageNotFoundComponent, data: { title: `${baseTitle} | Page Not Found`}},
];
