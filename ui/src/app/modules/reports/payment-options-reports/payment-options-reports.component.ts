//
//  
//  
//
//  Created by Francisco Hernandez on 06-12-2018
//  Copyright © 2018 hightech-corp. All rights reserved.
//

import { Component, OnInit, ViewEncapsulation, TemplateRef } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { PaymentOptionsReportService } from '../../../services/payment-options-report.service'
import { ReportingService } from '../../../services/reporting.service'
import { BsDatepickerConfig, BsLocaleService, BsDaterangepickerDirective } from 'ngx-bootstrap/datepicker'
import { ToastrService } from 'ngx-toastr';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { BsModalService } from 'ngx-bootstrap/modal';
import * as FileSaver from 'file-saver';

@Component({
  selector: 'app-payment-options-reports',
  templateUrl: './payment-options-reports.component.html',
  styleUrls: ['./payment-options-reports.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class PaymentOptionsReportsComponent implements OnInit {

  public modalRef: BsModalRef;
  public paymentOptFrm: FormGroup;
  public bsConfig: Partial<BsDatepickerConfig>;
  public colorTheme = 'theme-dark-blue';
  public paymentOptData: any;
  public selected = [];
  constructor(private titleService: Title, 
              private paymentOptionsReportService: PaymentOptionsReportService,
              private toastr: ToastrService,
              private formBuilder: FormBuilder,
              private modalService: BsModalService,
              private reporting: ReportingService
              ) {

    this.paymentOptData = {
      id: 0,
      invoiceId: 0,
      payments: []
    }
  }
  
  ngOnInit() {
    this.setTitle('Reportes de formas de pago');
    this.bsConfig = Object.assign({}, { containerClass: this.colorTheme });
    //this.retriveResults();
    this.paymentOptFrm = this.formBuilder.group({
      invoiceId: ['', [ Validators.minLength(2), Validators.maxLength(8)]],
      startDate: ['', [ Validators.required ]],
      endDate: ['', [ Validators.required ]],
    })
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
  
  get f() { return this.paymentOptFrm.controls }

  public search(): void {
      this.retriveResults();
      console.log(
        this.f.invoiceId.value,
        this.f.startDate.value,
        this.f.endDate.value
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

  public clean(): void {
    this.selected = [];
    this.paymentOptData = {}
  }

  public cancel(): void {
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

      documentTitle: "Reporte de opciones de pago",
      fileName: "",
      headers: ["Cajero", "Caja", "Fecha", "Hora", "Voucher", "Forma de pago", "Monto"],
      columnNames: ["cahsierId", "registerId", "date", "hour", "voucher", "paymentOption", "amount"],
      rows: this.selected,
      creationDate: new Date(),
      transactionId: "ss24frfe-g48tgtg15t48te51e5-frerr4848ewe-44gddeeg445g"
    }).subscribe(
      data => {
        FileSaver.saveAs(data, 'reporte-formas-de-pago.pdf', true)
        this.modalRef.hide();
        this.selected = []
      },
      error => {
        this.toastr.error('No se pudo conectar al servidor de reportes', 'Error')
        
      }
    )
  }

  public openModal(template: TemplateRef<any>, size): void {
    this.modalRef = this.modalService.show(template, {'class': size==1 ? 'modal-lg': 'modal-sm', 'keyboard': false, 'ignoreBackdropClick': true});
  }
}
 