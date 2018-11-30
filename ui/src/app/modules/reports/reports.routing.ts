//
//  
//  
//
//  Created by -- on --
//  Copyright © 2018 hightech-corp. All rights reserved.
//

import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';

import { PaymentOptionsReportsComponent } from './payment-options-reports/payment-options-reports.component';
import { PaymentReportsComponent } from './payment-reports/payment-reports.component';
import { CashierPayrollReportsComponent } from './cashier-payroll-reports/cashier-payroll-reports.component';
import { PaymentsDetailComponent } from './payments-detail/payments-detail.component';
import { IndexComponent } from './index/index.component'

export const routes: Routes = [
    { path: '', component: IndexComponent },
    { path: 'paymentOptions',  component: PaymentOptionsReportsComponent  },
    { path: 'payments',  component: PaymentReportsComponent  },
    { path: 'cashierPayroll',  component: CashierPayrollReportsComponent   },
    { path: 'paymetnDetail',  component: PaymentsDetailComponent  }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);