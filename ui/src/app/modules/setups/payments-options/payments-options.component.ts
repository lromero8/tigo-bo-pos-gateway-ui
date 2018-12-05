//
//  
//  
//
//  Created by Francisco Hernandez on 03-12-2018
//  Copyright © 2018 hightech-corp. All rights reserved.
//

import { Component, OnInit, ViewEncapsulation, TemplateRef } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { PaymentOptionsService } from '../../../services/payment-options.service'
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { ToastrService } from 'ngx-toastr';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";

@Component({
  selector: 'app-payments-options',
  templateUrl: './payments-options.component.html',
  styleUrls: ['./payments-options.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class PaymentsOptionsComponent implements OnInit {

  public modalRef: BsModalRef;
  public animateMoney: boolean;
  public animateBank: boolean;
  public animateCard: boolean;
  public animateCollector: boolean;
  public currencyData: Array<any>;
  public bankData: Array<any>;
  public cardsData: Array<any>;
  public collectorsData: Array<any>;

  public currencyFrm: FormGroup;
  public cardFrm: FormGroup;
  public bankFrm: FormGroup;

  public currencyStatus: boolean;
  public cardStatus: boolean;
  public bankStatus: boolean;

  constructor(private titleService: Title,
              private paymentOptionsService: PaymentOptionsService,
              private modalService: BsModalService,
              private toastr: ToastrService,
              private formBuilder: FormBuilder,) {

    this.animateMoney = false;
    this.animateBank = false;
    this.animateCard = false;
    this.animateCollector = false;

    this.currencyStatus = false;
    this.cardStatus = false;
    this.bankStatus = false;

  }

  ngOnInit() {
    this.setTitle('Opciones de pago');

    this.currencyFrm = this.formBuilder.group({ 
      currency: ['', [ Validators.required, Validators.minLength(2), Validators.maxLength(8)]],
      description: ['', [ Validators.required, Validators.minLength(2), Validators.maxLength(8)]],
      changeLocalCurrency: ['', [ Validators.required, Validators.minLength(2), Validators.maxLength(8)]],
      exchangeRate: ['', [ Validators.required, Validators.minLength(2), Validators.maxLength(8)]]
    });

    this.cardFrm = this.formBuilder.group({
      cardCode: ['', [ Validators.required, Validators.minLength(2), Validators.maxLength(8)]],
      cardType: ['', [ Validators.required, Validators.minLength(2), Validators.maxLength(8)]],
      emmitter: ['', [ Validators.required, Validators.minLength(2), Validators.maxLength(8)]],
      description: ['', [ Validators.required, Validators.minLength(2), Validators.maxLength(8)]],
      premium: ['', [ Validators.required]],
    });

    this.bankFrm = this.formBuilder.group({
      legalPerson: ['', [ Validators.required, Validators.minLength(2), Validators.maxLength(8)]],
      businessName: ['', [ Validators.required, Validators.minLength(2), Validators.maxLength(8)]],
      businessNameType: ['', [ Validators.required, Validators.minLength(2), Validators.maxLength(8)]],
      legalPersonType: ['', [ Validators.required, Validators.minLength(2), Validators.maxLength(8)]],
    });
  }

  public setTitle( newTitle: string): void {
    this.titleService.setTitle( newTitle ); 
  }

  public retrieveBanksData(): void {
    this.paymentOptionsService.getBanks().subscribe(
      data => {
        this.bankData = data
      },
      error => {
        this.toastr.error('Al conectarse al servidor', 'Error');
      }
    )

  }

  public retrieveCurrencyData(): void {
    this.paymentOptionsService.getCurrencies().subscribe(
      data => {
        console.log(data)
        this.currencyData = data;
      },
      error => {
        this.toastr.error('Al conectarse al servidor', 'Error');
      }
    )

  }

  public retrievepaymentCollectorsData(): void {

  }

  public retrieveCardsData(): void {
    this.paymentOptionsService.getCards().subscribe(
      data => {
        this.cardsData = data;
      },
      error => {
        this.toastr.error('Al conectarse al servidor', 'Error');
      }
    )
  }

  public openModal(template: TemplateRef<any>): void {
    this.modalRef = this.modalService.show(template,{'class':'modal-lg ', 'keyboard': false, 'ignoreBackdropClick': true});
  }

  get f() { return this.bankFrm.controls }
  get g() { return this.currencyFrm.controls }
  get h() { return this.cardFrm.controls }


  public saveBanksData(): void {
    /*console.log(
      this.f.legalPerson.value,
      this.f.businessName.value,
      this.f.businessNameType.value,
      this.f.legalPersonType.value
    )*/

    this.paymentOptionsService.newBank({

      legalPerson: this.f.legalPerson.value,
      businessName: this.f.businessName.value,
      businessNameType: this.f.businessNameType.value,
      legalPersonType:this.f.legalPersonType.value

    }).subscribe(
      data => {

        this.toastr.success('Ok', 'El registro ha sido creado');
        this.bankFrm.reset();
        this.modalRef.hide();
      },
      error => {
        this.toastr.error('Error', 'El registro no pudo ser creado');
      }
    )
  }

  public saveCurrencyData(): void {
    /*console.log(
      this.g.currency.value,
      this.g.description.value,
      this.g.changeLocalCurrency.value,
      this.g.exchangeRate.value
    )*/

    this.paymentOptionsService.newCurrency({

      currency:  this.g.currency.value,
      description: this.g.description.value,
      changeLocalCurrency: this.g.changeLocalCurrency.value,
      exchangeRate: this.g.exchangeRate.value

    }).subscribe(
      data => {
        this.toastr.success('Ok', 'El registro ha sido creado');
        this.currencyFrm.reset();
        this.modalRef.hide();
      },
      error => {
        this.toastr.error('Error', 'El registro no pudo ser creado');
      }
    )
  }

  public savePaymentCollectorsData(): void {
  
  }

  public saveCardsData(): void {
    /*console.log(
      this.h.cardCode.value,
      this.h.cardType.value,
      this.h.emmitter.value,
      this.h.description.value,
      this.h.premium.value
    )*/

    this.paymentOptionsService.newCard({

      cardCode: this.h.cardCode.value,
      cardType: this.h.cardType.value,
      emmitter: this.h.emmitter.value,
      description: this.h.description.value,
      premium: this.h.premium.value

    }).subscribe(
      data => {
        this.toastr.success('Ok', 'El registro ha sido creado');
        this.cardFrm.reset();
        this.modalRef.hide();
      },
      error => {
        this.toastr.error('Error', 'El registro no pudo ser creado');
      }
    )
  }

  /**
   * Fill frm methods
   * @param row 
   */
  public fillBankFrm(row): void {
    this.f.legalPerson.patchValue(row.legalPerson);
    this.f.businessName.patchValue(row.businessName);
    this.f.businessNameType.patchValue(row.businessNameType);
    this.f.legalPersonType.patchValue(row.legalPersonType);
  }

  public fillCurrencyFrm(row): void {
    this.g.currency.patchValue(row.currency);
    this.g.description.patchValue(row.description);
    this.g.changeLocalCurrency.patchValue(row.changeLocalCurrency);
    this.g.exchangeRate.patchValue(row.exchangeRate);
  }

  public fillCollectorsFrm(row): void {

  }

  public fillCardFrm(row): void {
    this.h.cardCode.patchValue(row.cardCode);
    this.h.cardType.patchValue(row.cardType);
    this.h.emmitter.patchValue(row.emmitter);
    this.h.description.patchValue(row.description);
    this.h.premium.patchValue(row.premium);
  }


  /**
   * Edit methods
   */
  public editBank(): void {

  }

  public editCurrency(): void {

  }

  public editCollectors(): void {
    
  }

  public editCard(): void {

  }
}
