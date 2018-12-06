//
//  
//  
//
//  Created by Francisco Hernandez on 06-12-2018
//  Copyright © 2018 hightech-corp. All rights reserved.
//

import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { PaymentReporsService } from '../../../services/payment-repors.service'
import { BsDatepickerConfig, BsLocaleService, BsDaterangepickerDirective } from 'ngx-bootstrap/datepicker'

@Component({
  selector: 'app-payment-reports',
  templateUrl: './payment-reports.component.html',
  styleUrls: ['./payment-reports.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class PaymentReportsComponent implements OnInit {

  public colorTheme = 'theme-dark-blue';
  public bsConfig: Partial<BsDatepickerConfig>;
  constructor(private titleService: Title,
              private PaymentReporsService: PaymentReporsService) { }

  ngOnInit() {
    this.setTitle('Reportes de pago');
    this.bsConfig = Object.assign({}, { containerClass: this.colorTheme });
  }

  public setTitle( newTitle: string): void {
    this.titleService.setTitle( newTitle ); 
  }

}
