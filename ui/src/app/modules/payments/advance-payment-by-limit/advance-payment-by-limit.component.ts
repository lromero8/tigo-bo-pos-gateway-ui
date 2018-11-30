//
//  
//  
//
//  Created by -- on --
//  Copyright © 2018 hightech-corp. All rights reserved.
//

import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { AdvancePaymentByLimitService } from '../../../services/advance-payment-by-limit.service'

@Component({
  selector: 'app-advance-payment-by-limit',
  templateUrl: './advance-payment-by-limit.component.html',
  styleUrls: ['./advance-payment-by-limit.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AdvancePaymentByLimitComponent implements OnInit {

  constructor(private titleService: Title) { }

  ngOnInit() {
    this.setTitle('Opciones de pago');
  }

  public setTitle( newTitle: string): void {
    this.titleService.setTitle( newTitle ); 
  }
}
