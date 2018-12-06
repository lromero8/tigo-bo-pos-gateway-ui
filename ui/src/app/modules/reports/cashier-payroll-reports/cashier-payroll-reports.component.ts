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

@Component({
  selector: 'app-cashier-payroll-reports',
  templateUrl: './cashier-payroll-reports.component.html',
  styleUrls: ['./cashier-payroll-reports.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class CashierPayrollReportsComponent implements OnInit {

  constructor(private titleService: Title,
              private cashierPayrollReportsService: CashierPayrollReportsService) { }

  ngOnInit() {
    this.setTitle('Opciones de pago');
  }

  public setTitle( newTitle: string): void {
    this.titleService.setTitle( newTitle ); 
  }

}
