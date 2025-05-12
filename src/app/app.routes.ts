import { Routes } from '@angular/router';

const WarehouseComponent  = () => import('./inventory-management/pages/warehouses/warehouses.component').then(m => m.WarehousesComponent);

export const routes: Routes = [
  { path: 'warehouse', loadComponent: WarehouseComponent }
];
