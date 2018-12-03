//
//  
//  
//
//  Created by -- on --
//  Copyright © 2018 hightech-corp. All rights reserved.
//

import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { MoneyRefoundQueryService } from '../../../services/money-refound-query.service'

@Component({
  selector: 'app-money-refund-query',
  templateUrl: './money-refund-query.component.html',
  styleUrls: ['./money-refund-query.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class MoneyRefundQueryComponent implements OnInit {

  constructor(private titleService: Title,
              private moneyRefoundQueryService: MoneyRefoundQueryService) { }

  ngOnInit() {
    this.setTitle('Consultas de servicio de devolucion de dinero');
  }

  public setTitle( newTitle: string): void {
    this.titleService.setTitle( newTitle ); 
  }

}
