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
import { FormGroup, FormBuilder, Validators } from "@angular/forms";

@Component({
  selector: 'app-cashier-payroll-reports',
  templateUrl: './cashier-payroll-reports.component.html',
  styleUrls: ['./cashier-payroll-reports.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class CashierPayrollReportsComponent implements OnInit {

  public cashierPayrollFrm: FormGroup;
  public results: Array<any>;
  constructor(private titleService: Title,
              private cashierPayrollReportsService: CashierPayrollReportsService, 
              private toastr: ToastrService,
              private formBuilder: FormBuilder,) { 

    this.retrieveResults();
      
    }

    //['', [ Validators.minLength(2), Validators.maxLength(8)]]

  ngOnInit() {
    this.setTitle('Reporte de planilla de caja');
    this.cashierPayrollFrm = this.formBuilder.group({
      cashierNumber: ['', [ Validators.minLength(2), Validators.maxLength(8)]],
      EHumano: ['', [ Validators.minLength(2), Validators.maxLength(8)]],
      branchOffice: ['', [ Validators.minLength(2), Validators.maxLength(8)]],
      local: ['', [ Validators.minLength(2), Validators.maxLength(8)]],
      date: ['', [ Validators.minLength(2), Validators.maxLength(8)]],
      status: ['', [ Validators.minLength(2), Validators.maxLength(8)]],
      period: ['', [ Validators.minLength(2), Validators.maxLength(8)]]
    })
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

  get f (){ return this.cashierPayrollFrm.controls }

  public search(): void {
    console.log(
      this.f.cashierNumber.value,
      this.f.EHumano.value,
      this.f.branchOffice.value,
      this.f.local.value,
      this.f.date.value,
      this.f.status.value,
      this.f.period.value,
    )
  }

}
