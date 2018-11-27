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
  selector: 'app-cancel-recharge-epin',
  templateUrl: './cancel-recharge-epin.component.html',
  styleUrls: ['./cancel-recharge-epin.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class CancelRechargeEpinComponent implements OnInit {

  constructor(private titleService: Title) { }

  ngOnInit() {
    this.setTitle('cancelar recarga de epin');
  }

  public setTitle( newTitle: string): void {
    this.titleService.setTitle( newTitle ); 
  }

}
