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
  selector: 'app-data-client-query',
  templateUrl: './data-client-query.component.html',
  styleUrls: ['./data-client-query.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class DataClientQueryComponent implements OnInit {

  constructor(private titleService: Title) { }

  ngOnInit() {
    this.setTitle('Consultas de los datos del cliente');
  }

  public setTitle( newTitle: string): void {
    this.titleService.setTitle( newTitle ); 
  }

}
