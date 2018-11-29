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
  selector: 'app-cancel-money-output',
  templateUrl: './cancel-money-output.component.html',
  styleUrls: ['./cancel-money-output.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class CancelMoneyOutputComponent implements OnInit {

  constructor(private titleService: Title) { }

  ngOnInit() {
    this.setTitle('cancelar egreso de dinero');
  }

  public setTitle( newTitle: string): void {
    this.titleService.setTitle( newTitle ); 
  }

}
