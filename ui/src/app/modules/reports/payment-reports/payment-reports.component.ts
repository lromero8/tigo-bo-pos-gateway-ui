//
//  
//  
//
//  Created by Francisco Hernandez on 06-12-2018
//  Copyright © 2018 hightech-corp. All rights reserved.
//

import { Component, OnInit, ViewEncapsulation,TemplateRef } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { PaymentReporsService } from '../../../services/payment-repors.service'
import { ReportingService } from '../../../services/reporting.service';
import { BsDatepickerConfig, BsLocaleService, BsDaterangepickerDirective } from 'ngx-bootstrap/datepicker'
import { ToastrService } from 'ngx-toastr';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import * as FileSaver from 'file-saver';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-payment-reports',
  templateUrl: './payment-reports.component.html',
  styleUrls: ['./payment-reports.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class PaymentReportsComponent implements OnInit {

  public modalRef: BsModalRef;
  public selected = [];
  public paymentReportsFrm: FormGroup;
  public colorTheme = 'theme-dark-blue';
  public bsConfig: Partial<BsDatepickerConfig>;
  public paymentReportsResults: any;
  constructor(private titleService: Title,
              private PaymentReporsService: PaymentReporsService,
              private toastr: ToastrService,
              private formBuilder: FormBuilder,
              private reporting: ReportingService,
              private modalService: BsModalService,) { }

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
      registerId: ['', [ Validators.minLength(2), Validators.maxLength(8)]],
      cashierId: ['', [ Validators.minLength(2), Validators.maxLength(8)]],
      branchOffice: ['', [ Validators.minLength(2), Validators.maxLength(8)]],
      local: ['', [ Validators.minLength(2), Validators.maxLength(8)]],
      date: ['', [ Validators.minLength(2), Validators.maxLength(8)]],
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

  get f () { return this.paymentReportsFrm.controls }

  public search(): void {
    console.log(
      this.f.registerId.value,
      this.f.cashierId.value,
      this.f.branchOffice.value,
      this.f.local.value,
      this.f.date.value,
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

  public print(template): void {
    if (this.selected.length > 0) {
      this.openModal(template, 2);
    } else {
        this.toastr.warning('Debe de seleccionar al menos un registro para realizalizar una impresion', 'Advertencia')
    }
  }

  public printSelected(): void {
    this.reporting.document({

      documentTitle: "Reporte de pagos",
      fileName: "",
      headers: ["Estado", "Tipo", "Numero", "Serie", "Fecha", "Cliente", "Razon social", "Monto"],
      columnNames: ["status", "type", "number", "serie", "date", "client", "businessName", "amountCharged"],
      rows: this.selected,
      creationDate: new Date(),
      transactionId: "ss24frfe-g48tgtg15t48te51e5-frerr4848ewe-44gddeeg445g"
    }).subscribe(
      data => {
        FileSaver.saveAs(data, 'reporte-de-pagos.pdf', true)
        this.modalRef.hide();
        this.selected = []
      },
      error => {
        this.toastr.error('No se pudo conectar al servidor de reportes', 'Error')
        
      }
    )
  }

}
