//
//  
//  
//
//  Created by -- on --
//  Copyright © 2018 hightech-corp. All rights reserved.
//

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MontlyDebtQueryComponent } from './montly-debt-query/montly-debt-query.component';
import { MoneyRefundQueryComponent } from './money-refund-query/money-refund-query.component';
import { MoneyOutputByWithdrawalComponent } from './money-output-by-withdrawal/money-output-by-withdrawal.component';
import { DataClientQueryComponent } from './data-client-query/data-client-query.component';
import { DataAccountQueryComponent } from './data-account-query/data-account-query.component';

import { routes, routing } from './queries.routing';
import { IndexComponent } from './index/index.component';

@NgModule({
  imports: [
    CommonModule,
    routing
  ],
  declarations: [MontlyDebtQueryComponent, MoneyRefundQueryComponent, MoneyOutputByWithdrawalComponent, DataClientQueryComponent, DataAccountQueryComponent, IndexComponent]
})
export class QueriesModule { }
