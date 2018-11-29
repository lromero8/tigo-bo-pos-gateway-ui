//
//  
//  
//
//  Created by -- on --
//  Copyright © 2018 hightech-corp. All rights reserved.
//

import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { CancelOnDemandService } from '../../../services/cancel-on-demand.service'

@Component({
  selector: 'app-cancel-ondemand',
  templateUrl: './cancel-ondemand.component.html',
  styleUrls: ['./cancel-ondemand.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class CancelOndemandComponent implements OnInit {

  constructor(private titleService: Title) { }

  ngOnInit() {
    this.setTitle('Cancelar on demand');
  }

  public setTitle( newTitle: string): void {
    this.titleService.setTitle( newTitle ); 
  }

  public getFormData(ev): void {
    console.log(ev)
  }

  public clearFormData(): void {
    console.log('clean')
  }

}
