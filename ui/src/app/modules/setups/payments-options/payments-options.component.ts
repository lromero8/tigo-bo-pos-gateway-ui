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
  selector: 'app-payments-options',
  templateUrl: './payments-options.component.html',
  styleUrls: ['./payments-options.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class PaymentsOptionsComponent implements OnInit {

  constructor(private titleService: Title) {
    
  }

  ngOnInit() {
    this.setTitle('Opciones de pago');
  }

  public setTitle( newTitle: string): void {
    this.titleService.setTitle( newTitle ); 
  }


}
