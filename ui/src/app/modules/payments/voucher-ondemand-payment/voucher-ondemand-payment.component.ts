//
//  
//  
//
//  Created by -- on --
//  Copyright © 2018 hightech-corp. All rights reserved.
//

import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-voucher-ondemand-payment',
  templateUrl: './voucher-ondemand-payment.component.html',
  styleUrls: ['./voucher-ondemand-payment.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class VoucherOndemandPaymentComponent implements OnInit {

  constructor(private titleService: Title) { }

  ngOnInit() {
    this.setTitle('Opciones de pago');
  }

  public setTitle( newTitle: string): void {
    this.titleService.setTitle( newTitle ); 
  }

}
