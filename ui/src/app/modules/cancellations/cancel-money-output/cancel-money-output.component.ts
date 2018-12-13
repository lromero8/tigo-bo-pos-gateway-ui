//
//  
//  
//
//  Created by -- on --
//  Copyright © 2018 hightech-corp. All rights reserved.
//

import { Component, OnInit, ViewEncapsulation, TemplateRef } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { CancelMoneyOutPutService } from '../../../services/cancel-money-out-put.service'
import { DateService } from '../../../services/date.service'

// ************************* SERVICES ***********************************
import { ToastrService } from 'ngx-toastr';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
// ************************* SERVICES ***********************************

// ************************* FORM VALIDATOR ***********************************
import { FormGroup, FormBuilder, FormArray, Validators } from "@angular/forms";
// ************************* FORM VALIDATOR ***********************************

@Component({
  selector: 'app-cancel-money-output',
  templateUrl: './cancel-money-output.component.html',
  styleUrls: ['./cancel-money-output.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class CancelMoneyOutputComponent implements OnInit {


  public cancelMoneyOutputForm: FormGroup; 
  public modalRef: BsModalRef;


  public responseData: any; //data for datatable 
  public isDetail: boolean; //flag to control modals content
  public billNumber: any; 
  public details: any;
  public paymentDate: any;
  public reasons: Array<any>;



  public regex = /\//gi;



  constructor(private titleService: Title, 
              private cancelMoneyOutPutService: CancelMoneyOutPutService,
              private dateService: DateService,
              private toastr: ToastrService,
              private formBuilder: FormBuilder,
              private modalService: BsModalService

              ) {

                this.cancelMoneyOutputForm = this.formBuilder.group({ 
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
    this.setTitle('cancelar egreso de dinero');
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
        
        
        this.cancelMoneyOutPutService.search(ev.formData.transactionId, ev.formData.reason, ev.formData.dateRange).subscribe(
          data => {
            this.responseData = data
            // console.log(this.responseData)
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
    // console.log(ev)
    this.searchMoney(ev)
  }

  public clear() {
    console.log('clear');
    this.responseData = '';

  }

  public anular(){
    console.log(this.cancelMoneyOutputForm.value)
    this.cancelMoneyOutputForm.reset()
    this.modalRef.hide();
    this.toastr.success("Registro Anulado Exitosamente", "Exito")
    this.toastr.error("Error al tratar de procesar la anulacion", "Error")
  }

  

}
