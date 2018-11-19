//
//  
//  
//
//  Created by -- on --
//  Copyright © 2018 hightech-corp. All rights reserved.
//

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegularExpressionsComponent } from './regular-expressions/regular-expressions.component';
import { PaymentsOptionsComponent } from './payments-options/payments-options.component';

import { routes, routing } from './setups.routing';

@NgModule({
  imports: [
    CommonModule,
    routing
  ],
  declarations: [RegularExpressionsComponent, PaymentsOptionsComponent]
})
export class SetupsModule { }
