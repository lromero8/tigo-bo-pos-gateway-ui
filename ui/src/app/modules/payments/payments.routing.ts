//
//  
//  
//
//  Created by -- on --
//  Copyright © 2018 hightech-corp. All rights reserved.
//

import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';

import { AdvancePaymentComponent } from './advance-payment/advance-payment.component';
import { AdvancePaymentByLimitComponent } from './advance-payment-by-limit/advance-payment-by-limit.component';
import { VoucherOndemandPaymentComponent } from './voucher-ondemand-payment/voucher-ondemand-payment.component';
import { VoucherOndemandPaymentMassiveComponent } from './voucher-ondemand-payment-massive/voucher-ondemand-payment-massive.component';
import { FcmHotbillingPaymentComponent } from './fcm-hotbilling-payment/fcm-hotbilling-payment.component';
import { SmallRechargePaymentComponent } from './small-recharge-payment/small-recharge-payment.component';
import { EpinRechargePaymentComponent } from './epin-recharge-payment/epin-recharge-payment.component';
import { MoneyInputComponent } from './money-input/money-input.component';
import { IndexComponent } from './index/index.component';

export const routes: Routes = [
    { path: '',  component: IndexComponent },
    { path: 'advancePayment',  component: AdvancePaymentComponent },
    { path: 'advancePaymentByLimit',  component: AdvancePaymentByLimitComponent  },
    { path: 'voucherOndemandPayment',  component: VoucherOndemandPaymentComponent  },
    { path: 'voucherOndemandPaymentMassive',  component: VoucherOndemandPaymentMassiveComponent  },
    { path: 'fcmHotbillingPayment',  component: FcmHotbillingPaymentComponent  },
    { path: 'smallRechargePayment',  component: SmallRechargePaymentComponent  },
    { path: 'epinRechargePayment',  component: EpinRechargePaymentComponent  },
    { path: 'moneyInput',  component: MoneyInputComponent  },
   
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);