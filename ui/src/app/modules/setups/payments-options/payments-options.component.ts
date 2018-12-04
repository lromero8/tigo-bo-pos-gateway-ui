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

  constructor(private titleService: Title,
              private paymentOptionsService: PaymentOptionsService,
              private modalService: BsModalService,
              private toastr: ToastrService,
              private formBuilder: FormBuilder,) {

    this.animateMoney = false;
    this.animateBank = false;
    this.animateCard = false;
    this.animateCollector = false;

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


  public saveBanksData() {
    console.log(
      this.f.legalPerson.value,
      this.f.businessName.value,
      this.f.businessNameType.value,
      this.f.legalPersonType.value
    )
  }

  public saveCurrencyData() {
    console.log(
      this.g.currency.value,
      this.g.description.value,
      this.g.changeLocalCurrency.value,
      this.g.exchangeRate.value
    )
  }

  public savePaymentCollectorsData() {
  
  }

  public saveCardsData() {
    console.log(
      this.h.cardCode.value,
      this.h.cardType.value,
      this.h.emmitter.value,
      this.h.description.value,
      this.h.premium.value
    )
  }
}
