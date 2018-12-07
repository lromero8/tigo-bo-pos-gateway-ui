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
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-payment-options-reports',
  templateUrl: './payment-options-reports.component.html',
  styleUrls: ['./payment-options-reports.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class PaymentOptionsReportsComponent implements OnInit {

  public bsConfig: Partial<BsDatepickerConfig>;
  public colorTheme = 'theme-dark-blue';
  public paymentOptData: any;
  constructor(private titleService: Title, 
              private paymentOptionsReportService: PaymentOptionsReportService,
              private toastr: ToastrService) {

    this.paymentOptData = {
      id: 0,
      invoiceId: 0,
      payments: []
    }
    this.retriveResults();
  }

  ngOnInit() {
    this.setTitle('Reportes de formas de pago');
    this.bsConfig = Object.assign({}, { containerClass: this.colorTheme });
    this.retriveResults();
  }

  public setTitle( newTitle: string): void {
    this.titleService.setTitle( newTitle ); 
  }

  public retriveResults(): void {
    this.paymentOptionsReportService.retrieve().subscribe(
      data => {
        this.paymentOptData = data[0];
        console.log(data[0]);
        console.log(this.paymentOptData.payments);
      },
      error => {
        this.toastr.error('Error al conectarse al servidor', 'Error');
      }
    )
  }

}
 