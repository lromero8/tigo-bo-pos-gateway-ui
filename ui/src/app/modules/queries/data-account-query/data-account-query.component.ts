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
  selector: 'app-data-account-query',
  templateUrl: './data-account-query.component.html',
  styleUrls: ['./data-account-query.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class DataAccountQueryComponent implements OnInit {

  constructor(private titleService: Title) { }

  ngOnInit() {
    this.setTitle('Consulta de los datos de la cuenta');
  }

  public setTitle( newTitle: string): void {
    this.titleService.setTitle( newTitle ); 
  }

}
