//
//  
//  
//
//  Created by -- on --
//  Copyright © 2018 hightech-corp. All rights reserved.
//

import { Component, OnInit, ViewEncapsulation, ViewChild } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { BsDatepickerConfig, BsLocaleService, BsDaterangepickerDirective } from 'ngx-bootstrap/datepicker'
import { listLocales } from 'ngx-bootstrap/chronos';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";

@Component({
  selector: 'app-cancel-money-input',
  templateUrl: './cancel-money-input.component.html',
  styleUrls: ['./cancel-money-input.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class CancelMoneyInputComponent implements OnInit {

  public locale = 'en';
  public colorTheme = 'theme-dark-blue';
  public bsConfig: Partial<BsDatepickerConfig>;
  public locales = listLocales();
  public reasons: Array<any>;
  public cancelMoneyFrm: FormGroup;


  @ViewChild('dpa') dpa: BsDaterangepickerDirective;
  @ViewChild('dpb') dpb: BsDaterangepickerDirective;

  constructor(private titleService: Title, 
              private localeService: BsLocaleService, 
              private formBuilder: FormBuilder,
              ) { 
    this.reasons = [
      {
        "id": 1,
        "name": "a"
      },
      {
        "id": 2,
        "name": "b"
      },
      {
        "id": 3,
        "name": "c"
      }
    ]

    this.cancelMoneyFrm = this.formBuilder.group({ 

      transacctionId : ['', [ Validators.minLength(2), Validators.maxLength(8)]],
      reason : ['', [ Validators.minLength(2), Validators.maxLength(8)]],
      startDate : ['', [ Validators.minLength(2), Validators.maxLength(8)]],
      endDate : ['', [ Validators.minLength(2), Validators.maxLength(8)]],
    }); 
  }

  ngOnInit() {
    this.setTitle('Cancelar ingreso de dinero');
    this.bsConfig = Object.assign({}, { containerClass: this.colorTheme });
    this.localeService.use('es');
    
  }

  public setTitle( newTitle: string): void {
    this.titleService.setTitle( newTitle ); 
  }

  get f() { return this.cancelMoneyFrm.controls }
 
 public search() {
    console.log(
      this.f.transacctionId.value,
      this.f.reason.value,
      this.f.startDate.value,
      this.f.endDate.value,
    )
 }


}
