//
//  
//  
//
//  Created by Francisco Hernandez on 06-12-2018
//  Copyright © 2018 hightech-corp. All rights reserved.
//

import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { CashierPayrollReportsService } from '../../../services/cashier-payroll-reports.service'
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-cashier-payroll-reports',
  templateUrl: './cashier-payroll-reports.component.html',
  styleUrls: ['./cashier-payroll-reports.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class CashierPayrollReportsComponent implements OnInit {

  public results: Array<any>;
  constructor(private titleService: Title,
              private cashierPayrollReportsService: CashierPayrollReportsService, 
              private toastr: ToastrService) { 

    this.retrieveResults()

    }

  ngOnInit() {
    this.setTitle('Opciones de pago');
  }

  public setTitle( newTitle: string): void {
    this.titleService.setTitle( newTitle ); 
  }

  public retrieveResults(): void {
    this.cashierPayrollReportsService.retrieve().subscribe(
      data => {
        console.log(data)
        this.results = data;
      },
      error => {
        this.toastr.error('No se pudo conectar al servidor', 'Error')
      }
    )
  }

}
