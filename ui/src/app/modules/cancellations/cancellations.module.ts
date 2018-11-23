//
//  
//  
//
//  Created by -- on --
//  Copyright © 2018 hightech-corp. All rights reserved.
//

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CancelInAdvanceComponent } from './cancel-in-advance/cancel-in-advance.component';
import { CancelFcmPaymentComponent } from './cancel-fcm-payment/cancel-fcm-payment.component';
import { CancelOndemandComponent } from './cancel-ondemand/cancel-ondemand.component';
import { CancelRechargeEpinComponent } from './cancel-recharge-epin/cancel-recharge-epin.component';
import { CancelSmallRechargueComponent } from './cancel-small-rechargue/cancel-small-rechargue.component';
import { CancelMoneyOutputComponent } from './cancel-money-output/cancel-money-output.component';
import { CancelMoneyInputComponent } from './cancel-money-input/cancel-money-input.component';
import { CancelAdvanceByLimitComponent } from './cancel-advance-by-limit/cancel-advance-by-limit.component';
import { CancelCyclicBillComponent } from './cancel-cyclic-bill/cancel-cyclic-bill.component';
import { CancelCyclicPaymetnBillComponent } from './cancel-cyclic-paymetn-bill/cancel-cyclic-paymetn-bill.component';
import { IndexComponent } from './index/index.component';

import { routes, routing } from './cancellations.routing';

import { UtilModule } from 'app/pages/common/util.module';

@NgModule({
  imports: [
    CommonModule,
    routing,
    UtilModule
  ],
  declarations: [CancelInAdvanceComponent, CancelFcmPaymentComponent, CancelOndemandComponent, CancelRechargeEpinComponent, CancelSmallRechargueComponent, CancelMoneyOutputComponent, CancelMoneyInputComponent, CancelAdvanceByLimitComponent, CancelCyclicBillComponent, CancelCyclicPaymetnBillComponent, IndexComponent]
})
export class CancellationsModule { }
