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
import { ToastrService } from 'ngx-toastr';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";

@Component({
  selector: 'app-payment-reports',
  templateUrl: './payment-reports.component.html',
  styleUrls: ['./payment-reports.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class PaymentReportsComponent implements OnInit {

  public paymentReportsFrm: FormGroup;
  public colorTheme = 'theme-dark-blue';
  public bsConfig: Partial<BsDatepickerConfig>;
  public paymentReportsResults: any;
  constructor(private titleService: Title,
              private PaymentReporsService: PaymentReporsService,
              private toastr: ToastrService,
              private formBuilder: FormBuilder,) { }

  ngOnInit() {
    this.setTitle('Reportes de pago');
    this.bsConfig = Object.assign({}, { containerClass: this.colorTheme });

    this.paymentReportsResults = {
        "id": 0,
        "invoiceId": 0,
        "branchOffice": null,
        "local": null,
        "registerId": 0,
        "registerName": null,
        "EHumano": 0,
        "EHumanoName": 0,
        "paymentNumber": 0,
        "paymentDetails": []
      }
      
    
    this.retrieveResults();
    this.paymentReportsFrm = this.formBuilder.group({

    })
  }

  public setTitle( newTitle: string): void {
    this.titleService.setTitle( newTitle ); 
  }

  public retrieveResults(): void {
    this.PaymentReporsService.retrieve().subscribe(
      data => {
        console.log(data)
        this.paymentReportsResults = data[0]
      },
      error => {
        this.toastr.error('No se pudo conectar al servidor', 'Error')
      }
    )
  }

}
