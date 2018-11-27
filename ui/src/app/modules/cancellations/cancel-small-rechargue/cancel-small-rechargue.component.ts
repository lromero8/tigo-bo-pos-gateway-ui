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
  selector: 'app-cancel-small-rechargue',
  templateUrl: './cancel-small-rechargue.component.html',
  styleUrls: ['./cancel-small-rechargue.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class CancelSmallRechargueComponent implements OnInit {

  constructor(private titleService: Title) { }

  ngOnInit() {
    this.setTitle('Cancelar mini recarga');
  }

  public setTitle( newTitle: string): void {
    this.titleService.setTitle( newTitle ); 
  }

}
