//
//  
//  
//
//  Created by Francisco Hernandez on 06-12-2018
//  Copyright © 2018 hightech-corp. All rights reserved.
//

import { Component, OnInit, ViewEncapsulation, TemplateRef } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { PaymentDetatailService } from '../../../services/payment-detatail.service'
import { ReportingService } from '../../../services/reporting.service';
import { BsDatepickerConfig, BsLocaleService, BsDaterangepickerDirective } from 'ngx-bootstrap/datepicker'
import { ToastrService } from 'ngx-toastr';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import * as FileSaver from 'file-saver';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-payments-detail',
  templateUrl: './payments-detail.component.html',
  styleUrls: ['./payments-detail.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class PaymentsDetailComponent implements OnInit {

  public modalRef: BsModalRef;
  public selected = [];
  public paymentDetailFrm: FormGroup;
  public paymentDetail: Array<any>;
  public results: Array<any>;
  public colorTheme = 'theme-dark-blue';
  public bsConfig: Partial<BsDatepickerConfig>;
  constructor(private titleService: Title,
              private paymentDetatailService: PaymentDetatailService,
              private toastr: ToastrService,
              private formBuilder: FormBuilder,
              private reporting: ReportingService,
              private modalService: BsModalService,) { 


    this.retrieveResults();
  }

  ngOnInit() {
    this.bsConfig = Object.assign({}, { containerClass: this.colorTheme });
    this.setTitle('Reporte de detalle de pago');
    this.paymentDetailFrm = this.formBuilder.group({
      client: ['', [ Validators.minLength(2), Validators.maxLength(8)]],
      contract: ['', [ Validators.minLength(2), Validators.maxLength(8)]],
      accountType: ['', [ Validators.minLength(2), Validators.maxLength(8)]],
      accountNumber: ['', [ Validators.minLength(2), Validators.maxLength(8)]],
      startDate: ['', [ Validators.minLength(2), Validators.maxLength(8)]],
      endDate: ['', [ Validators.minLength(2), Validators.maxLength(8)]],
    })
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

  get f() { return this.paymentDetailFrm.controls }

  public search(): void {
    console.log(
      this.f.client.value,
      this.f.contract.value,
      this.f.accountType.value,
      this.f.accountNumber.value,
      this.f.startDate.value,
      this.f.endDate.value,
    )
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

      documentTitle: "Detalle de pago",
      fileName: "",
      headers: ["Fecha", "Monto debe", "Estado contable", "Monto haber", "Estado cobranza", "Saldo"],
      columnNames: ["date", "debtClientAmount", "accountingStatement", "amountToHave", "paymentStatus", "balanceStatus"],
      rows: this.selected,
      creationDate: new Date(),
      transactionId: "ss24frfe-g48tgtg15t48te51e5-frerr4848ewe-44gddeeg445g"
    }).subscribe(
      data => {
        FileSaver.saveAs(data, 'reporte-detalle-de-pago.pdf', true)
        this.modalRef.hide();
        this.selected = []
      },
      error => {
        this.toastr.error('No se pudo conectar al servidor de reportes', 'Error')
        
      }
    )
  }
}
