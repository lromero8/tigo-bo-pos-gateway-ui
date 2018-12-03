//
//  
//  
//
//  Created by -- on --
//  Copyright © 2018 hightech-corp. All rights reserved.
//

import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { CancelCyclicBillService } from '../../../services/cancel-cyclic-bill.service'

@Component({
  selector: 'app-cancel-cyclic-bill',
  templateUrl: './cancel-cyclic-bill.component.html',
  styleUrls: ['./cancel-cyclic-bill.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class CancelCyclicBillComponent implements OnInit {

  constructor(private titleService: Title,
              private cancelCyclicBillService: CancelCyclicBillService) { }

  ngOnInit() {
    this.setTitle('Cancelar factura ciclica');
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
