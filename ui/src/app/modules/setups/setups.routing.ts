//
//  
//  
//
//  Created by -- on --
//  Copyright © 2018 hightech-corp. All rights reserved.
//

import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';

import { RegularExpressionsComponent } from './regular-expressions/regular-expressions.component';
import { PaymentsOptionsComponent } from './payments-options/payments-options.component';
import { IndexComponent } from './index/index.component'

export const routes: Routes = [
    { path: '', component: IndexComponent },
    { path: 'regularExpressions',  component: RegularExpressionsComponent  },
    { path: 'paymentOptions',  component: PaymentsOptionsComponent  }
   
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);