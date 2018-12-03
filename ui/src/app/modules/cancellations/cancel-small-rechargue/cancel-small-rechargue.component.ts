//
//  
//  
//
//  Created by -- on --
//  Copyright © 2018 hightech-corp. All rights reserved.
//

import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { CancelSmallRechargeService } from '../../../services/cancel-small-recharge.service'

@Component({
  selector: 'app-cancel-small-rechargue',
  templateUrl: './cancel-small-rechargue.component.html',
  styleUrls: ['./cancel-small-rechargue.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class CancelSmallRechargueComponent implements OnInit {

  constructor(private titleService: Title, 
    private cancelSmallRechargeService: CancelSmallRechargeService) { }

  ngOnInit() {
    this.setTitle('Cancelar mini recarga');
  }

  public setTitle( newTitle: string): void {
    this.titleService.setTitle( newTitle ); 
  }

  public getFormData(ev) {
    console.log(ev)
  }

  public clearFormData(ev) {
    console.log(ev)
  }

}
