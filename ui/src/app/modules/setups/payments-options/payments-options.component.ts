//
//  
//  
//
//  Created by -- on --
//  Copyright © 2018 hightech-corp. All rights reserved.
//

import { Component, OnInit, ViewEncapsulation, TemplateRef } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { PaymentOptionsService } from '../../../services/payment-options.service'
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';

@Component({
  selector: 'app-payments-options',
  templateUrl: './payments-options.component.html',
  styleUrls: ['./payments-options.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class PaymentsOptionsComponent implements OnInit {

  public modalRef: BsModalRef;
  constructor(private titleService: Title,
              private paymentOptionsService: PaymentOptionsService,
              private modalService: BsModalService) {
    
  }

  ngOnInit() {
    this.setTitle('Opciones de pago');
  }

  public setTitle( newTitle: string): void {
    this.titleService.setTitle( newTitle ); 
  }

  public banks(): void {

  }

  public money(): void {

  }

  public paymentCollectors(): void {

  }

  public cards(): void {

  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template,{'class':'modal-lg'});
  }


}
