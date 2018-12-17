//
//  
//  
//
//  Created by Francisco Hernandez on 06-12-2018
//  Copyright © 2018 hightech-corp. All rights reserved.
//

import { Component, OnInit, ViewEncapsulation, TemplateRef } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { CashierPayrollReportsService } from '../../../services/cashier-payroll-reports.service'
import { ReportingService } from '../../../services/reporting.service';
import { ToastrService } from 'ngx-toastr';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { BsModalService } from 'ngx-bootstrap/modal';
import * as FileSaver from 'file-saver';
import { BsDatepickerConfig, BsLocaleService, BsDaterangepickerDirective } from 'ngx-bootstrap/datepicker'


@Component({
  selector: 'app-cashier-payroll-reports',
  templateUrl: './cashier-payroll-reports.component.html',
  styleUrls: ['./cashier-payroll-reports.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class CashierPayrollReportsComponent implements OnInit {

  public modalRef: BsModalRef;
  public selected = [];
  public cashierPayrollFrm: FormGroup;
  public results: Array<any>;
  public colorTheme = 'theme-dark-blue';
  public bsConfig: Partial<BsDatepickerConfig>;
  public statuses: Array<any>;
  constructor(private titleService: Title,
              private cashierPayrollReportsService: CashierPayrollReportsService, 
              private toastr: ToastrService,
              private modalService: BsModalService,
              private formBuilder: FormBuilder,
              private localeService: BsLocaleService, 
              private reporting: ReportingService,) { 

    this.retrieveResults();
      
    }

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

    this.bsConfig = Object.assign({}, { containerClass: this.colorTheme });
    this.localeService.use('es');

    this.statuses = [
      {
        id: 1,
        name: "Todos"
      },
      {
        id: 2,
        name: "Abierta"
      },
      {
        id: 3,
        name: "Cerrada"
      },
      {
        id: 4,
        name: "Depositado"
      }
    ]
  }

  public setTitle( newTitle: string): void {
    this.titleService.setTitle( newTitle ); 
  }

  public retrieveResults(): void {
    this.cashierPayrollReportsService.retrieve().subscribe(
      data => {
        //console.log(data)
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

  public changeSelected(): void {
    console.log('change')
  }

  public onActivate(): void {

  }

  public onSelect(): void {
    console.log('on select')
    console.log(this.selected)

    this.selected = [...this.selected]
  }

  public displayCheck(row) {

    console.log('in displayCheck')
    console.log(row)
    return row.name !== '~';
  }

  public hola(): void {
    console.log('hola')
  }

  public openModal(template: TemplateRef<any>, size): void {
    this.modalRef = this.modalService.show(template, {'class': size==1 ? 'modal-lg': 'modal-sm', 'keyboard': false, 'ignoreBackdropClick': true});
  }

  public validSelected(template): void {

    if (this.selected.length > 0) {
        this.openModal(template, 1);
    } else {
        this.toastr.warning('Debe de seleccionar al menos una caja para realizar el cierre', 'Advertencia')
    }

    console.log(this.selected)
  }

  public auditCashRegister(template): void {

    this.modalRef.hide();
    this.toastr.success('La planilla ha sido actualizada.', 'Ok')

    this.openModal(template, 1);
  }

  public cancel(): void {

    this.modalRef.hide();
    this.selected = [];
  }

  public cl(): void {
    this.selected = [];
  }

  public print(template): void {
    if (this.selected.length > 0) {
      this.openModal(template, 2);
    } else {
        this.toastr.warning('Debe de seleccionar al menos una caja para realizalizar una impresion', 'Advertencia')
    }
  }

  public printSelected(): void {
    this.reporting.document({

      documentTitle: "Reporte de planilla de caja",
      fileName: "",
      headers: ["sucursal", "Local", "Caja", "EHumano", "Periodo", "Planilla", "Estado de planilla", "Fecha de apertura", "Hora de apertura", "Total cobrado cierre"],
      columnNames: ["branchOffice", "local", "register", "EHumano", "period", "payroll", "payrollStatus", "startDate", "endDate", "totalCharging"],
      rows: this.selected,
      creationDate: new Date(),
      transactionId: "121545-g48tgtg15t48te51e5-frerr4848ewe-qwe748de84de84dedghrf4c8e"
    }).subscribe(
      data => {
        FileSaver.saveAs(data, 'reporte-planilla-caja.pdf', true)
        this.modalRef.hide();
        this.selected = []
      },
      error => {
        this.toastr.error('No se pudo conectar al servidor de reportes', 'Error')
        
      }
    )
  }

}
