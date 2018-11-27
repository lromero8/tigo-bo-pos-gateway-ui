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
  selector: 'app-money-input',
  templateUrl: './money-input.component.html',
  styleUrls: ['./money-input.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class MoneyInputComponent implements OnInit {

  constructor(private titleService: Title) { }

  ngOnInit() {
    this.setTitle('Opciones de pago');
  }


  public setTitle( newTitle: string): void {
    this.titleService.setTitle( newTitle ); 
  }
}
