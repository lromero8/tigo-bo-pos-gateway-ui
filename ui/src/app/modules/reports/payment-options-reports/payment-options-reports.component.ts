//
//  
//  
//
//  Created by -- on --
//  Copyright © 2018 hightech-corp. All rights reserved.
//

import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { PaymentOptionsReportService } from '../../../services/payment-options-report.service'

@Component({
  selector: 'app-payment-options-reports',
  templateUrl: './payment-options-reports.component.html',
  styleUrls: ['./payment-options-reports.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class PaymentOptionsReportsComponent implements OnInit {

  constructor(private titleService: Title, 
              private paymentOptionsReportService: PaymentOptionsReportService) { }

  ngOnInit() {
    this.setTitle('Opciones de pago');
  }

  public setTitle( newTitle: string): void {
    this.titleService.setTitle( newTitle ); 
  }

}
