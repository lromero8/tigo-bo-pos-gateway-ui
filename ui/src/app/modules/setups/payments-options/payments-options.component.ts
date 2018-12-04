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

  constructor(private titleService: Title,
              private paymentOptionsService: PaymentOptionsService,
              private modalService: BsModalService,
              private toastr: ToastrService) {

    this.animateMoney = false;
    this.animateBank = false;
    this.animateCard = false;
    this.animateCollector = false;

  }

  ngOnInit() {
    this.setTitle('Opciones de pago');
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

  public paymentCollectors(): void {

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


}
