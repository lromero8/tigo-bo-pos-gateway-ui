//
//  
//  
//
//  Created by Francisco Hernandez on 06-12-2018
//  Copyright © 2018 hightech-corp. All rights reserved.
//

import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { PaymentOptionsReportService } from '../../../services/payment-options-report.service'
import { BsDatepickerConfig, BsLocaleService, BsDaterangepickerDirective } from 'ngx-bootstrap/datepicker'

@Component({
  selector: 'app-payment-options-reports',
  templateUrl: './payment-options-reports.component.html',
  styleUrls: ['./payment-options-reports.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class PaymentOptionsReportsComponent implements OnInit {

  public bsConfig: Partial<BsDatepickerConfig>;
  public colorTheme = 'theme-dark-blue';
  
  constructor(private titleService: Title, 
              private paymentOptionsReportService: PaymentOptionsReportService) { }

  ngOnInit() {
    this.setTitle('Reportes de formas de pago');
    this.bsConfig = Object.assign({}, { containerClass: this.colorTheme });
  }

  public setTitle( newTitle: string): void {
    this.titleService.setTitle( newTitle ); 
  }

}
