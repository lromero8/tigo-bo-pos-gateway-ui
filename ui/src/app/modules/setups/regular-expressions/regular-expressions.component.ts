//
//  
//  
//
//  Created by -- on --
//  Copyright © 2018 hightech-corp. All rights reserved.
//

import { Component, OnInit, ViewEncapsulation, TemplateRef } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { RegularExpressionsService } from '../../../services/regular-expressions.service'
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { BsDatepickerConfig, BsLocaleService, BsDaterangepickerDirective } from 'ngx-bootstrap/datepicker'
import { listLocales } from 'ngx-bootstrap/chronos';
import { ToastrService } from 'ngx-toastr';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';

@Component({
  selector: 'app-regular-expressions',
  templateUrl: './regular-expressions.component.html',
  styleUrls: ['./regular-expressions.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class RegularExpressionsComponent implements OnInit {

  public dataRetrived: Array<any>;
  public regExpr: FormGroup;
  public regExprModal: FormGroup;
  public colorTheme = 'theme-dark-blue';
  public bsConfig: Partial<BsDatepickerConfig>;
  public modalRef: BsModalRef;
  public frmModalId: number;
  public editMode: boolean;

  constructor(private titleService: Title,
              private regularExpressionsService: RegularExpressionsService, 
              private formBuilder: FormBuilder,
              private localeService: BsLocaleService,
              private toastr: ToastrService,
              private modalService: BsModalService,) {
    this.regularExpressionsService.retrieve().subscribe(
      data => {
        this.dataRetrived = data;
      },
      error => {
        this.toastr.error('Al conectarse al servidor', 'Error');
      }
    ) 

    this.editMode = false;
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

    this.regExprModal = this.formBuilder.group({
      name: ['', [ Validators.required, Validators.minLength(2), Validators.maxLength(8)]],
      description: ['', [ Validators.required, Validators.minLength(2), Validators.maxLength(8)]],
      uri: ['', [ Validators.required, Validators.minLength(2), Validators.maxLength(8)]],
      status: ['', [ Validators.required, Validators.minLength(2), Validators.maxLength(8)]]
    });


    //['', [ Validators.minLength(2), Validators.maxLength(8)]],

    this.bsConfig = Object.assign({}, { containerClass: this.colorTheme });
    this.localeService.use('es');
  }

  public setTitle( newTitle: string): void {
    this.titleService.setTitle( newTitle );
  }

  get f() { return this.regExpr.controls }
  get g() { return this.regExprModal.controls }

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
    this.dataRetrived = [];
    this.f.active.patchValue(true);
  }

  public openModal(template: TemplateRef<any>, row): void {
    this.modalRef = this.modalService.show(template,{'class':'modal-lg ', 'keyboard': false, 'ignoreBackdropClick': true});
    this.fillModalFrm(row);
  }

  public fillModalFrm(row): void {
    this.frmModalId = row.id;
    this.g.name.patchValue(row.name);
    this.g.description.patchValue(row.description);
    this.g.uri.patchValue(row.uri);
    this.g.status.patchValue(row.status);
  }

}
