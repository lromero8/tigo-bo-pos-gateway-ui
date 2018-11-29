//
//  
//  
//
//  Created by -- on --
//  Copyright © 2018 hightech-corp. All rights reserved.
//

import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { CancelCyclicPlaymentBillService } from '../../../services/cancel-cyclic-playment-bill.service'

@Component({
  selector: 'app-cancel-cyclic-paymetn-bill',
  templateUrl: './cancel-cyclic-paymetn-bill.component.html',
  styleUrls: ['./cancel-cyclic-paymetn-bill.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class CancelCyclicPaymetnBillComponent implements OnInit {

  constructor(private titleService: Title) { }

  ngOnInit() {
    this.setTitle('Cancelar el pago de factura ciclica');
  }

  public setTitle( newTitle: string): void {
    this.titleService.setTitle( newTitle ); 
  }

  public getFormData(ev) {
    console.log(ev);
  }

  public clearFormData(ev) {
    console.log(ev)
  }

}
