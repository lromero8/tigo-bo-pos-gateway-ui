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
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { BsDatepickerConfig, BsLocaleService, BsDaterangepickerDirective } from 'ngx-bootstrap/datepicker'
import { listLocales } from 'ngx-bootstrap/chronos';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-regular-expressions',
  templateUrl: './regular-expressions.component.html',
  styleUrls: ['./regular-expressions.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class RegularExpressionsComponent implements OnInit {

  public dataRetrived: Array<any>;
  public regExpr: FormGroup;
  public colorTheme = 'theme-dark-blue';
  public bsConfig: Partial<BsDatepickerConfig>;

  constructor(private titleService: Title,
              private regularExpressionsService: RegularExpressionsService, 
              private formBuilder: FormBuilder,
              private localeService: BsLocaleService,
              private toastr: ToastrService) {
    this.regularExpressionsService.retrieve().subscribe(
      data => {
        this.dataRetrived = data;
      },
      error => {
        this.toastr.error('Al conectarse al servidor', 'Error');
      }
    ) 
  }
  
  ngOnInit() {
    this.setTitle('Expresiones regulares');
    this.regExpr = this.formBuilder.group({

      name: ['', [ Validators.minLength(2), Validators.maxLength(8)]],
      uri: ['', [ Validators.minLength(2), Validators.maxLength(8)]],
      modifyDate: ['', [ Validators.minLength(2), Validators.maxLength(8)]],
      creationDate: ['', [ Validators.minLength(2), Validators.maxLength(8)]],
      active: true,
      inactive: false
    });


    //['', [ Validators.minLength(2), Validators.maxLength(8)]],

    this.bsConfig = Object.assign({}, { containerClass: this.colorTheme });
    this.localeService.use('es');
  }

  public setTitle( newTitle: string): void {
    this.titleService.setTitle( newTitle );
  }

  get f() { return this.regExpr.controls }

  public search(): void {
    console.log(
      this.f.name.value,
      this.f.uri.value,
      this.f.modifyDate.value,
      this.f.creationDate,
      this.f.active.value
    )
  }

  public clean(): void {
    console.log('clean')
  }

}
