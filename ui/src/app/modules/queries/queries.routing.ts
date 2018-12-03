//
//  
//  
//
//  Created by -- on --
//  Copyright © 2018 hightech-corp. All rights reserved.
//

import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';

import { MontlyDebtQueryComponent } from './montly-debt-query/montly-debt-query.component';
import { MoneyRefundQueryComponent } from './money-refund-query/money-refund-query.component';
import { MoneyOutputByWithdrawalComponent } from './money-output-by-withdrawal/money-output-by-withdrawal.component';
import { DataClientQueryComponent } from './data-client-query/data-client-query.component';
import { DataAccountQueryComponent } from './data-account-query/data-account-query.component';
import { IndexComponent } from './index/index.component';

export const routes: Routes = [
    { path: '', component: IndexComponent },
    { path: 'montlyDebtQuery',  component: MontlyDebtQueryComponent  },
    { path: 'moneyRefundQuery',  component: MoneyRefundQueryComponent  },
    { path: 'moneyOutputByWithdrawal',  component: MoneyOutputByWithdrawalComponent  },
    { path: 'dataClientQuery',  component: DataClientQueryComponent  },
    { path: 'dataAccountQuery',  component: DataAccountQueryComponent  },
   
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);