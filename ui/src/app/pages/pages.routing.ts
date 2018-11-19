import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import { PagesComponent } from './pages.component';
import { BlankComponent } from './blank/blank.component';
import { SearchComponent } from './search/search.component';
import { AuthGuard } from '../guards/auth.guard';
export const routes: Routes = [
  {
    path: '',
    component: PagesComponent,
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      {
        path: 'dashboard',
        loadChildren: 'app/pages/dashboard/dashboard.module#DashboardModule',
        canActivate: [AuthGuard],
        data: { breadcrumb: 'Dashboard' }
      },
      {
        path: 'blank',
        component: BlankComponent,
        canActivate: [AuthGuard],
        data: { breadcrumb: 'Blank page' }
      },
      {
        path: 'search',
        component: SearchComponent,
        canActivate: [AuthGuard],
        data: { breadcrumb: 'Search' }
      },
    
     { path: 'reports', loadChildren: 'app/modules/reports/reports.module#ReportsModule' },
     { path: 'setups', loadChildren: 'app/modules/setups/setups.module#SetupsModule' },
     { path: 'queries', loadChildren: 'app/modules/queries/queries.module#QueriesModule' },

     { path: 'cancellations', loadChildren: 'app/modules/cancellations/cancellations.module#CancellationsModule' },
     { path: 'payments', loadChildren: 'app/modules/payments/payments.module#PaymentsModule' },

    ]
  }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
