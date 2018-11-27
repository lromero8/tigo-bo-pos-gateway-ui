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
  selector: 'app-cancel-money-input',
  templateUrl: './cancel-money-input.component.html',
  styleUrls: ['./cancel-money-input.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class CancelMoneyInputComponent implements OnInit {

  constructor(private titleService: Title) { }

  ngOnInit() {
    this.setTitle('Cancelar ingreso de dinero');
  }

  public setTitle( newTitle: string): void {
    this.titleService.setTitle( newTitle ); 
  }

}
