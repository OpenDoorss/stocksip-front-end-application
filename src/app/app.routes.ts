import {Routes} from '@angular/router';
import {SignInComponent} from './authentication/pages/sign-in/sign-in.component';
import {SignUpComponent} from './authentication/pages/sign-up/sign-up.component';
import {ConfirmationCodeComponent} from './authentication/pages/confirmation-code/confirmation-code.component';
import {PasswordRecoverComponent} from './authentication/pages/password-recover/password-recover.component';
import {authenticationGuard} from './authentication/services/authentication.guard';

const WarehouseComponent = () => import('./inventory-management/pages/warehouses/warehouses.component').then(m => m.WarehousesComponent);
const CreateAndEditWarehouseComponent = () => import('./inventory-management/pages/warehouse-create-and-edit/warehouse-create-and-edit.component').then(m => m.WarehouseCreateAndEditComponent);
const ReportListComponent = () => import('./analytics-and-reporting/components/report-list/report-list.component').then(m => m.ReportListComponent)
const CareGuideListComponent = () => import('./analytics-and-reporting/components/care-guide-list/care-guide-list.component').then(m => m.CareGuideListComponent)
const CareGuideCreateComponent = () => import('./analytics-and-reporting/pages/care-guide-create-and-edit/care-guide-create/care-guide-create.component').then(m => m.CareGuideCreateComponent)
const CareGuideEditComponent = () => import('./analytics-and-reporting/pages/care-guide-create-and-edit/care-guide-edit/care-guide-edit.component').then(m => m.CareGuideEditComponent)
const PageNotFoundComponent = () => import('./public/pages/page-not-found/page-not-found.component').then(m => m.PageNotFoundComponent)
const ProfileComponent = () => import('./profile-management/pages/profile/profile.component').then(m => m.ProfileComponent)

const AlertsComponent = () => import('./alerts-and-notifications/pages/alerts-dashboard/alerts.component').then(m => m.AlertsComponent)

const baseTitle = 'StockSip'

const DashboardComponent = () => import('./analytics-and-reporting/pages/dashboard/dashboard.component').then(m => m.DashboardComponent);

const CatalogCreateAndEditComponent = () => import ('./order-operation-and-monitoring/pages/catalog-create-and-edit/catalog-create-and-edit.component').then(m => m.CatalogCreateAndEditComponent);

const CatalogComponent = () => import ('./order-operation-and-monitoring/pages/catalog/catalog.component').then(m => m.CatalogComponent);

const PurchaseOrderCreateComponent = () => import ('./order-operation-and-monitoring/pages/purchase-order-create/purchase-order-create.component').then(m => m.PurchaseOrderCreateComponent);
const StorageComponent = () => import ('./inventory-management/pages/storage/storage.component').then(m => m.StorageComponent);

const ProductCreateEdit = () => import ('./inventory-management/pages/product-create-and-edit/product-create-and-edit.component').then(m => m.ProductCreateAndEditComponent);
const SubscriptionPlanComponent = () => import ( './payment-and-subscriptions/pages/subscription-plan/subscription-plan.component').then(m => m.SubscriptionPlanComponent);
const OrderComponent = () => import ('./order-operation-and-monitoring/pages/orders/orders.component').then(m => m.OrdersComponent);
export const routes: Routes = [
  { path: '', redirectTo: 'sign-in', pathMatch: 'full' },
  { path: 'sign-in',              component: SignInComponent },
  { path: 'sign-up',              component: SignUpComponent },
  { path: 'password-recover',     component: PasswordRecoverComponent},
  { path: 'confirmation-code',    component: ConfirmationCodeComponent },

  {path: 'warehouses',          loadComponent: WarehouseComponent,              data: {title: 'Warehouses'},        canActivate: [authenticationGuard]},
  {path: 'warehouses/new',      loadComponent: CreateAndEditWarehouseComponent, data: {title: 'New Warehouse'},     canActivate: [authenticationGuard]},
  {path: 'subscription-plan',   loadComponent: SubscriptionPlanComponent,       data: {title: 'Subscription Plan'}, canActivate: [authenticationGuard]},
  {path: 'product/new', loadComponent: ProductCreateEdit, data: { title: 'New Product' }, canActivate: [authenticationGuard] },
  { path: 'warehouses/edit/:warehouseId',     loadComponent: CreateAndEditWarehouseComponent,     data: { title: 'Edit Warehouse' },        canActivate: [authenticationGuard] },
  { path: 'storage',                          loadComponent: StorageComponent,                    data: { title: 'Storage' },               canActivate: [authenticationGuard] },
  { path: 'report-list', loadComponent: ReportListComponent, data: { title: 'Report list' }, canActivate: [authenticationGuard] },
  { path: 'care-guide-list', loadComponent: CareGuideListComponent, data: { title: 'Care Guide List' }, canActivate: [authenticationGuard] },
  { path: 'care-guide-create', loadComponent: CareGuideCreateComponent, data: { title: 'Care Guide Create' }, canActivate: [authenticationGuard] },
  { path: 'care-guide-edit', loadComponent: CareGuideEditComponent, data: { title: 'Care Guide Edit' }, canActivate: [authenticationGuard] },
  { path: 'profile', loadComponent: ProfileComponent, data: { title: 'Profile' }, canActivate: [authenticationGuard] },
  { path: 'alerts', loadComponent: AlertsComponent, data: { title: 'Alerts' }, canActivate: [authenticationGuard] },
  { path: 'dashboard', loadComponent: DashboardComponent, data: { title: 'Dashboard' }, canActivate: [authenticationGuard] },
  { path: 'catalog/new', loadComponent: CatalogCreateAndEditComponent, data: { title: 'New Catalog' }, canActivate: [authenticationGuard] },
  { path: 'catalog/edit/:catalogId', loadComponent: CatalogCreateAndEditComponent, data: { title: 'Edit Catalog' }, canActivate: [authenticationGuard] },
  { path: 'catalog', loadComponent: CatalogComponent, data: { title: 'Catalog' }, canActivate: [authenticationGuard] },
  { path: 'purchase-order/new/:catalogId', loadComponent: PurchaseOrderCreateComponent, data: { title: 'New Order' }, canActivate: [authenticationGuard] },
  { path: 'orders', loadComponent: OrderComponent, data: { title: 'Orders' }, canActivate: [authenticationGuard] },
  { path: '**', loadComponent: PageNotFoundComponent, data: { title: `${baseTitle} | Page Not Found` } }
];


