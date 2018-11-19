//
//  
//  
//
//  Created by -- on --
//  Copyright © 2018 hightech-corp. All rights reserved.
//

import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';

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


export const routes: Routes = [
    { path: 'cancelInAdvance',  component: CancelInAdvanceComponent  },
    { path: 'cancelFcmPayment',  component: CancelFcmPaymentComponent  },
    { path: 'cancelOndemand',  component: CancelOndemandComponent  },
    { path: 'cancelRechargeEpin',  component: CancelRechargeEpinComponent  },
    { path: 'cancelSmallRechargue',  component: CancelSmallRechargueComponent  },
    { path: 'cancelMoneyOutput',  component: CancelMoneyOutputComponent  },
    { path: 'cancelMoneyInput',  component: CancelMoneyInputComponent  },
    { path: 'cancelAdvanceByLimit',  component: CancelAdvanceByLimitComponent  },
    { path: 'cancelCyclicBill',  component: CancelCyclicBillComponent  },
    { path: 'cancelCyclicPaymetnBill',  component: CancelCyclicPaymetnBillComponent  },
   
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);