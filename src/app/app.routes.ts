import { Routes } from '@angular/router';
import {LoginComponent} from './authentication/pages/login/login.component';
import {RegisterComponent} from './authentication/pages/register/register.component';
import {ConfirmationCodeComponent} from './authentication/pages/confirmation-code/confirmation-code.component';
import {PasswordRecoverComponent} from './authentication/pages/password-recover/password-recover.component';

const WarehouseComponent  = () => import('./inventory-management/pages/warehouses/warehouses.component').then(m => m.WarehousesComponent);
const CreateAndEditWarehouseComponent  = () => import('./inventory-management/pages/warehouse-create-and-edit/warehouse-create-and-edit.component').then(m => m.WarehouseCreateAndEditComponent);
const ReportListComponent = () => import('./analytics-and-reporting/components/report-list/report-list.component').then(m=>m.ReportListComponent)
const CareGuideListComponent = () => import('./analytics-and-reporting/components/care-guide-list/care-guide-list.component').then(m=>m.CareGuideListComponent)
const CareGuideCreateComponent = () => import('./analytics-and-reporting/pages/care-guide-create-and-edit/care-guide-create/care-guide-create.component').then(m=>m.CareGuideCreateComponent)
const CareGuideEditComponent = () => import('./analytics-and-reporting/pages/care-guide-create-and-edit/care-guide-edit/care-guide-edit.component').then(m=>m.CareGuideEditComponent)
const PageNotFoundComponent = () => import('./public/pages/page-not-found/page-not-found.component').then(m=>m.PageNotFoundComponent)
const ProfileComponent = () => import('./profile-management/pages/profile/profile.component').then(m=>m.ProfileComponent)

const AlertsComponent = () => import('./alerts-and-notifications/pages/alerts-dashboard/alerts.component').then(m=>m.AlertsComponent)

const baseTitle = 'StockSip'
const ZoneComponent  = () => import('./inventory-management/pages/zones/zones.component').then(m => m.ZonesComponent);

const DashboardComponent  = () => import('./analytics-and-reporting/pages/dashboard/dashboard.component').then(m => m.DashboardComponent);

const CatalogCreateAndEditComponent = () => import ('./order-operation-and-monitoring/pages/catalog-create-and-edit/catalog-create-and-edit.component').then(m => m.CatalogCreateAndEditComponent);

const CatalogComponent = () => import ('./order-operation-and-monitoring/pages/catalog/catalog.component').then(m => m.CatalogComponent);

const PurchaseOrderCreateComponent = () => import ('./order-operation-and-monitoring/pages/purchase-order-create/purchase-order-create.component').then(m => m.PurchaseOrderCreateComponent);

const PurchaseOrderComponent = () => import ('./order-operation-and-monitoring/pages/purchase-order/purchase-order.component').then(m => m.PurchaseOrderComponent);

const OrderComponent = () => import ('./order-operation-and-monitoring/pages/orders/orders.component').then(m => m.OrdersComponent);
export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'sign-in', component: LoginComponent },
  { path: 'sing-up', component: RegisterComponent },
  { path: 'password-recover', component: PasswordRecoverComponent},
  { path: 'confirmation-code', component: ConfirmationCodeComponent },

  { path: 'warehouses',                         loadComponent: WarehouseComponent,              data: { title: 'Warehouses' } },
  { path: 'warehouses/new',                  loadComponent: CreateAndEditWarehouseComponent, data: { title: 'New Warehouse' } },
  { path: 'warehouses/edit/:warehouseId',       loadComponent: CreateAndEditWarehouseComponent, data: {title: 'Edit Warehouse'} },
  { path: 'warehouses/zones/:warehouseId',     loadComponent: ZoneComponent,                   data: { title: 'Zones' } },
  { path: 'report-list', loadComponent: ReportListComponent, data: { title: 'Report list' } },
  { path: 'care-guide-list', loadComponent: CareGuideListComponent, data: { title: 'Care Guide List'}},
  { path: 'care-guide-create',loadComponent: CareGuideCreateComponent, data: { title: 'Care Guide Create'}},
  { path: 'care-guide-edit',loadComponent: CareGuideEditComponent, data: { title: 'Care Guide Edit'}},
  { path: 'profile', loadComponent: ProfileComponent, data: { title: 'Profile' } },
  { path: 'alerts', loadComponent: AlertsComponent, data: { title: 'Alerts' } },
  { path: 'dashboard', loadComponent: DashboardComponent, data: { title: 'Dashboard' } },
  { path: 'catalog/new', loadComponent: CatalogCreateAndEditComponent, data: { title: 'New Catalog' } },
  { path: 'catalog/edit/:catalogId', loadComponent: CatalogCreateAndEditComponent, data: { title: 'Edit Catalog' } },
  { path: 'catalog', loadComponent: CatalogComponent, data: { title: 'Catalog' } },
  { path: 'purchase-order/new/:catalogId', loadComponent: PurchaseOrderCreateComponent, data: { title: 'New Order' } },
  { path: 'orders', loadComponent: OrderComponent, data: { title: 'Orders' } },
  { path: '**',loadComponent: PageNotFoundComponent, data: { title: `${baseTitle} | Page Not Found`}},
];


