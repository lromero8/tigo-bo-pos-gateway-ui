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
  selector: 'app-cancel-cyclic-bill',
  templateUrl: './cancel-cyclic-bill.component.html',
  styleUrls: ['./cancel-cyclic-bill.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class CancelCyclicBillComponent implements OnInit {

  constructor(private titleService: Title) { }

  ngOnInit() {
    this.setTitle('Cancelar factura ciclica');
  }

  public setTitle( newTitle: string): void {
    this.titleService.setTitle( newTitle ); 
  }





}
