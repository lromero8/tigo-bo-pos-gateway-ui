//
//  
//  
//
//  Created by -- on --
//  Copyright © 2018 hightech-corp. All rights reserved.
//

import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-cancel-fcm-payment',
  templateUrl: './cancel-fcm-payment.component.html',
  styleUrls: ['./cancel-fcm-payment.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class CancelFcmPaymentComponent implements OnInit {

  constructor(private titleService: Title) { }

  ngOnInit() {
    this.setTitle('Cancelar pago de FCM/Hot Billing');
  }

  public setTitle( newTitle: string): void {
    this.titleService.setTitle( newTitle ); 
  }

  public getFormData(ev): void {
    console.log(ev)
  }

  public clearFormData(): void {
    console.log('clean')
  }

}
