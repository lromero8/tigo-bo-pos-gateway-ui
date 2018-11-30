//
//  
//  
//
//  Created by -- on --
//  Copyright © 2018 hightech-corp. All rights reserved.
//

import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { MoneyOutputByWithdrawalService } from '../../../services/money-output-by-withdrawal.service'

@Component({
  selector: 'app-money-output-by-withdrawal',
  templateUrl: './money-output-by-withdrawal.component.html',
  styleUrls: ['./money-output-by-withdrawal.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class MoneyOutputByWithdrawalComponent implements OnInit {

  constructor(private titleService: Title,
              private moneyOutputByWithdrawalService: MoneyOutputByWithdrawalService) { }

  ngOnInit() {
    this.setTitle('Consultas de egreso de dinero por retiro');
  }

  public setTitle( newTitle: string): void {
    this.titleService.setTitle( newTitle ); 
  }

}
