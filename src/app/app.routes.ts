import { Routes } from '@angular/router';
import {LoginComponent} from './authentication/pages/login/login.component';
import {RegisterComponent} from './authentication/pages/register/register.component';
import {ConfirmationCodeComponent} from './authentication/pages/confirmation-code/confirmation-code.component';
import {SideNavbarComponent} from './public/components/side-navbar/side-navbar.component';

const WarehouseComponent  = () => import('./inventory-management/pages/warehouses/warehouses.component').then(m => m.WarehousesComponent);
const CreateAndEditWarehouseComponent  = () => import('./inventory-management/pages/warehouse-create-and-edit/warehouse-create-and-edit.component').then(m => m.WarehouseCreateAndEditComponent);

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'confirmation-code', component: ConfirmationCodeComponent },

  {
    path: '',
    component: SideNavbarComponent,
    children: [
      { path: 'warehouse/:profileId', loadComponent: WarehouseComponent, data: { title: 'Warehouses' } },
      { path: 'warehouse/:profileId/create', loadComponent: CreateAndEditWarehouseComponent, data: { title: 'Create Warehouse' } },
      { path: 'warehouse/:profileId/edit/:warehouseId', loadComponent: CreateAndEditWarehouseComponent, data: {title: 'Edit Warehouse'} },
    ]
  }
];
