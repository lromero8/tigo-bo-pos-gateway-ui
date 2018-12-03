//
//  
//  
//
//  Created by -- on --
//  Copyright © 2018 hightech-corp. All rights reserved.
//

import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { RegularExpressionsService } from '../../../services/regular-expressions.service'

@Component({
  selector: 'app-regular-expressions',
  templateUrl: './regular-expressions.component.html',
  styleUrls: ['./regular-expressions.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class RegularExpressionsComponent implements OnInit {

  constructor(private titleService: Title,
              private regularExpressionsService: RegularExpressionsService) { 
  }
  
  ngOnInit() {
    this.setTitle('Expresiones regulares');
  }

  public setTitle( newTitle: string): void {
    this.titleService.setTitle( newTitle );
  }


}
