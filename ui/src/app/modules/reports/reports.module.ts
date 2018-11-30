//
//  
//  
//
//  Created by -- on --
//  Copyright © 2018 hightech-corp. All rights reserved.
//

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PaymentOptionsReportsComponent } from './payment-options-reports/payment-options-reports.component';
import { PaymentReportsComponent } from './payment-reports/payment-reports.component';
import { CashierPayrollReportsComponent } from './cashier-payroll-reports/cashier-payroll-reports.component';
import { PaymentsDetailComponent } from './payments-detail/payments-detail.component';

import { routes, routing } from './reports.routing';
import { IndexComponent } from './index/index.component';

@NgModule({
  imports: [
    CommonModule,
    routing
  ],
  declarations: [PaymentOptionsReportsComponent, PaymentReportsComponent, CashierPayrollReportsComponent, PaymentsDetailComponent, IndexComponent]
})
export class ReportsModule { }
