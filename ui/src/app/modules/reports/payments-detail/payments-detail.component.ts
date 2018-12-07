//
//  
//  
//
//  Created by Francisco Hernandez on 06-12-2018
//  Copyright © 2018 hightech-corp. All rights reserved.
//

import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { PaymentDetatailService } from '../../../services/payment-detatail.service'
import { BsDatepickerConfig, BsLocaleService, BsDaterangepickerDirective } from 'ngx-bootstrap/datepicker'
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-payments-detail',
  templateUrl: './payments-detail.component.html',
  styleUrls: ['./payments-detail.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class PaymentsDetailComponent implements OnInit {

  public results: Array<any>;
  public colorTheme = 'theme-dark-blue';
  public bsConfig: Partial<BsDatepickerConfig>;
  constructor(private titleService: Title,
              private paymentDetatailService: PaymentDetatailService,
              private toastr: ToastrService) { 


    this.retrieveResults();
  }

  ngOnInit() {
    this.bsConfig = Object.assign({}, { containerClass: this.colorTheme });
    this.setTitle('Reporte de detalle de pago');

  }

  public setTitle( newTitle: string): void {
    this.titleService.setTitle( newTitle ); 
  }

  public retrieveResults(): void {
    this.paymentDetatailService.retrieve().subscribe(
      data => {
        this.results = data;
        console.log(data)
      },
      error => {
        this.toastr.error('No se pudo conectar al sevidor', 'Error')
      }
    )
  }
}
