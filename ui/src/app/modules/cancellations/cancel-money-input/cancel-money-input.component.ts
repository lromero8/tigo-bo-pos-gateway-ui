//
//  
//  
//
//  Created by -- on --
//  Copyright © 2018 hightech-corp. All rights reserved.
//

import { Component, OnInit, ViewEncapsulation, ViewChild, TemplateRef } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { BsDatepickerConfig, BsLocaleService, BsDaterangepickerDirective } from 'ngx-bootstrap/datepicker'
import { listLocales } from 'ngx-bootstrap/chronos';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
// ************************* SERVICES ***********************************
import { ToastrService } from 'ngx-toastr';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { CancelMoneyInputService } from '../../../services/cancel-money-input.service'
// ************************* SERVICES ***********************************

@Component({
  selector: 'app-cancel-money-input',
  templateUrl: './cancel-money-input.component.html',
  styleUrls: ['./cancel-money-input.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class CancelMoneyInputComponent implements OnInit {

  public cancelMoneyInputForm: FormGroup; 
  public modalRef: BsModalRef;

  public responseData: any; //data for datatable 
  public isDetail: boolean; //flag to control modals content
  public billNumber: any; 
  public details: any;
  public paymentDate: any;
  public reasons: Array<any>;  


  constructor(private titleService: Title,
              private cancelMoneyInputService: CancelMoneyInputService,
              private toastr: ToastrService,
              private formBuilder: FormBuilder,  
              private modalService: BsModalService

            ) { 
              
              this.cancelMoneyInputForm = this.formBuilder.group({ 
                  reason : ['', [ Validators.required]],
                  comment : ['', [ Validators.minLength(1), Validators.maxLength(150)]],
                });

                this.reasons = [
                  {
                    "id": 'a',
                    "name": "a"
                  },
                  {
                    "id": 'b',
                    "name": "b"
                  },
                  {
                    "id": 'c',
                    "name": "c"
                  }
                ]

              }


  ngOnInit() {
    this.setTitle('Cancelar ingreso de dinero');  
  }

  openModal(template: TemplateRef<any>, row) {
    this.modalRef = this.modalService.show(template,{'class':'modal-xl modal-lg', 'keyboard': false, 'ignoreBackdropClick': true});
    // console.log(row)
    this.details = row.details[0];
    this.paymentDate = row.paymentDate;
    this.billNumber = row.billNumber;
    // this.selectedRow = row.invoice;
  }  

  closeModal(){
    this.modalRef.hide();
  }  

  searchMoney(ev){


    if(ev.formData.transactionId !== null || ev.formData.reason !== null || ev.formData.dateRange !== null ){

      if (ev.formData.transactionId !== '' || ev.formData.reason !== '' || ev.formData.dateRange !== '') { 
        
        
        this.cancelMoneyInputService.search(ev.formData.transactionId, ev.formData.reason, ev.formData.dateRange).subscribe(
          data => {
            this.responseData = data
            console.log(this.responseData)
          })

      } else {
        this.toastr.error("Debe ingresar al menos un parametro de busqueda");
      }
    } else{
      this.toastr.error("Debe ingresar al menos un parametro de busqueda");
    }

  }  

  public setTitle( newTitle: string): void {
    this.titleService.setTitle( newTitle ); 
  }

  public search(ev) {
    console.log(ev)
    this.searchMoney(ev)
  }

  public clear() {
    console.log('clear');
    this.responseData = '';

  }

  public anular(){
    console.log(this.cancelMoneyInputForm.value)
    this.cancelMoneyInputForm.reset()
    this.modalRef.hide();
    this.toastr.success("Registro Anulado Exitosamente", "Exito")
    this.toastr.error("Error al tratar de procesar la anulacion", "Error")
  }  

}
