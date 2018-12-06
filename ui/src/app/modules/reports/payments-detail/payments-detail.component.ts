//
//  
//  
//
//  Created by Francisco Hernandez on 06-12-2018
//  Copyright © 2018 hightech-corp. All rights reserved.
//

import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { PaymentDetatailService } from '../../../services/payment-detatail.service'

@Component({
  selector: 'app-payments-detail',
  templateUrl: './payments-detail.component.html',
  styleUrls: ['./payments-detail.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class PaymentsDetailComponent implements OnInit {

  constructor(private titleService: Title,
              private paymentDetatailService: PaymentDetatailService) { }

  ngOnInit() {
  }

  public setTitle( newTitle: string): void {
    this.titleService.setTitle( newTitle ); 
  }
}
