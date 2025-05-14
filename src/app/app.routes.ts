import { Routes } from '@angular/router';

const ReportListComponent = () => import('./analytics-and-reporting/components/report-list/report-list.component').then(m=>m.ReportListComponent)
const CareGuideListComponent = () => import('./analytics-and-reporting/components/care-guide-list/care-guide-list.component').then(m=>m.CareGuideListComponent)
const CareGuideCreateComponent = () => import('./analytics-and-reporting/pages/care-guide-create-and-edit/care-guide-create/care-guide-create.component').then(m=>m.CareGuideCreateComponent)
const CareGuideEditComponent = () => import('./analytics-and-reporting/pages/care-guide-create-and-edit/care-guide-edit/care-guide-edit.component').then(m=>m.CareGuideEditComponent)
const PageNotFoundComponent = () => import('./public/pages/page-not-found/page-not-found.component').then(m=>m.PageNotFoundComponent)

const baseTitle = 'StockSip'

export const routes: Routes = [
    
    {path: '', redirectTo: 'report-list',pathMatch: 'full'},
    {path: 'report-list', loadComponent: ReportListComponent, data: { title: `${baseTitle} | Report List`}},
    {path: 'care-guide-list', loadComponent: CareGuideListComponent, data: { title: `${baseTitle} | Care Guide List`}},
    {path: 'care-guide-create',loadComponent: CareGuideCreateComponent, data: { title: `${baseTitle} | Care Guide Create`}},
    {path: 'care-guide-edit',loadComponent: CareGuideEditComponent, data: { title: `${baseTitle} | Care Guide Edit`}},
    {path: '**',loadComponent: PageNotFoundComponent, data: { title: `${baseTitle} | Page Not Found`}}
];
