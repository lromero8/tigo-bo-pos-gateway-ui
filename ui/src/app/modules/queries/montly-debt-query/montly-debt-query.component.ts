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
  selector: 'app-montly-debt-query',
  templateUrl: './montly-debt-query.component.html',
  styleUrls: ['./montly-debt-query.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class MontlyDebtQueryComponent implements OnInit {

  constructor(private titleService: Title) { }

  ngOnInit() {
    this.setTitle('Consulta de deuda mensual');
  }

  public setTitle( newTitle: string): void {
    this.titleService.setTitle( newTitle ); 
  }

}
