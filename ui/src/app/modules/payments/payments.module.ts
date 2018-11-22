//
//  
//  
//
//  Created by -- on --
//  Copyright © 2018 hightech-corp. All rights reserved.
//

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdvancePaymentComponent } from './advance-payment/advance-payment.component';
import { AdvancePaymentByLimitComponent } from './advance-payment-by-limit/advance-payment-by-limit.component';
import { VoucherOndemandPaymentComponent } from './voucher-ondemand-payment/voucher-ondemand-payment.component';
import { VoucherOndemandPaymentMassiveComponent } from './voucher-ondemand-payment-massive/voucher-ondemand-payment-massive.component';
import { FcmHotbillingPaymentComponent } from './fcm-hotbilling-payment/fcm-hotbilling-payment.component';
import { SmallRechargePaymentComponent } from './small-recharge-payment/small-recharge-payment.component';
import { EpinRechargePaymentComponent } from './epin-recharge-payment/epin-recharge-payment.component';
import { MoneyInputComponent } from './money-input/money-input.component';

import { routes, routing } from './payments.routing';
import { IndexComponent } from './index/index.component';
import { PaymentsHeaderComponent } from './payments-template/payments-header/payments-header.component';
import { PaymentsContractsComponent } from './payments-template/payments-contracts/payments-contracts.component';
import { PaymentsMethodsComponent } from './payments-template/payments-methods/payments-methods.component';
import { UtilModule } from 'app/pages/common/util.module';

@NgModule({
  imports: [
    CommonModule,
    routing,
    UtilModule
  ],
  declarations: [AdvancePaymentComponent, AdvancePaymentByLimitComponent, VoucherOndemandPaymentComponent, VoucherOndemandPaymentMassiveComponent, FcmHotbillingPaymentComponent, SmallRechargePaymentComponent, EpinRechargePaymentComponent, MoneyInputComponent, IndexComponent, PaymentsHeaderComponent, PaymentsContractsComponent, PaymentsMethodsComponent]
})
export class PaymentsModule { }
