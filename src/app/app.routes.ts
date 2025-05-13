import { Routes } from '@angular/router';

const WarehouseComponent  = () => import('./inventory-management/pages/warehouses/warehouses.component').then(m => m.WarehousesComponent);
const CreateAndEditWarehouseComponent  = () => import('./inventory-management/pages/warehouse-create-and-edit/warehouse-create-and-edit.component').then(m => m.WarehouseCreateAndEditComponent);

export const routes: Routes = [
  { path: 'warehouse/:profileId',                   loadComponent: WarehouseComponent },
  { path: 'warehouse/:profileId/create',            loadComponent: CreateAndEditWarehouseComponent, data: {mode: 'create'} },
  { path: 'warehouse/:profileId/edit/:warehouseId', loadComponent: CreateAndEditWarehouseComponent, data: {mode: 'edit'} },
];
