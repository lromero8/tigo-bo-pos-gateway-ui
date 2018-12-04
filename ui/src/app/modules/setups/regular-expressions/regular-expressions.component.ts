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
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-regular-expressions',
  templateUrl: './regular-expressions.component.html',
  styleUrls: ['./regular-expressions.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class RegularExpressionsComponent implements OnInit {

  public dataRetrived: Array<any>;
  public checkboxGroupForm: FormGroup;
  constructor(private titleService: Title,
              private regularExpressionsService: RegularExpressionsService, 
              private formBuilder: FormBuilder) {
    this.regularExpressionsService.retrieve().subscribe(
      data => {
        this.dataRetrived = data;
      },
      error => {

      }
    ) 
  }
  
  ngOnInit() {
    this.setTitle('Expresiones regulares');
    this.checkboxGroupForm = this.formBuilder.group({
      left: true,
      middle: false
    });
  }

  public setTitle( newTitle: string): void {
    this.titleService.setTitle( newTitle );
  }


}
