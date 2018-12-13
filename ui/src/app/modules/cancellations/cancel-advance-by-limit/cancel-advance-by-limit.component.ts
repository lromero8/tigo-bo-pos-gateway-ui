//
//  
//  
//
//  Created by Luis Romero on December 13th
//  Copyright © 2018 hightech-corp. All rights reserved.
//

import { Component, OnInit, ViewEncapsulation, TemplateRef } from '@angular/core';

import { trigger, transition, useAnimation } from '@angular/animations';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Title } from '@angular/platform-browser';

// ************************* FORM VALIDATOR ***********************************
import { FormGroup, FormBuilder, FormArray, Validators } from "@angular/forms";
// ************************* FORM VALIDATOR ***********************************

// ************************* SERVICES ***********************************
import { ToastrService } from 'ngx-toastr';
import { CancelAdvanceByLimitService } from '../../../services/cancel-advance-by-limit.service'
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
// ************************* SERVICES ***********************************

@Component({
  selector: 'app-cancel-advance-by-limit',
  templateUrl: './cancel-advance-by-limit.component.html',
  styleUrls: ['./cancel-advance-by-limit.component.scss'],
  encapsulation: ViewEncapsulation.None,

})
export class CancelAdvanceByLimitComponent implements OnInit {

  public cancellationInAdvanceLimitForm: FormGroup; 
  public modalRef: BsModalRef

  public billNumber: any;
  public selectedRow: any;
  public selected = []; //variable that stores checked cancelations
  public filteredData = []; //checked data for datatable        
  public confirmationModal: boolean = false //variable that shows and hides the second modal    
  public selectedCancellation: boolean = true //variable that checks if at least one cancelation is checked
  public responseData: any; //data for datatable   

  public reasons = [
      { "id": "Falta de fondos", "value": "insufficientFunds" },
      { "id": "Fecha expirada", "value": "dateExpired" },
      { "id": "Razones personales", "value": "personalReasons" }     
  ];



  constructor(private modalService: BsModalService,
              private titleService: Title,
              private formBuilder: FormBuilder,              
              private cancelAdvanceByLimitService: CancelAdvanceByLimitService,
              private toastr: ToastrService              
              ) { 
                this.cancellationInAdvanceLimitForm = this.formBuilder.group({ 
                  items: this.formBuilder.array([])//reason : this.formBuilder.array([])//['', [ Validators.required, Validators.minLength(2), Validators.maxLength(8)]],
                  //comment : this.formBuilder.array([])//['', [ Validators.minLength(2), Validators.maxLength(8)]],
                });
                }


  ngOnInit() {
    this.setTitle('Cancelar anticipo por limite');
  }
  openModal(template: TemplateRef<any>, row) {
    this.modalRef = this.modalService.show(template,{'class':'modal-xl modal-lg', 'keyboard': false, 'ignoreBackdropClick': true});
    this.billNumber = row.billNumber;
    this.selectedRow = row.invoice;

    this.selectedRow.forEach( i => {
      this.addItems(i)
    })
  }  

  addItems(items){
    let itemsArray = this.cancellationInAdvanceLimitForm.get('items') as FormArray;
    itemsArray.push(this.addItemsArray(items))
  }

  addItemsArray(item){
    return this.formBuilder.group({
      payment: item.amountPayment,
      paymentDate: item.paymentDate,
      reason: [""],
      comment: [""],
      dateModified: item.modifyDate,
      isChecked: false
    })
  }  

  closeModal(){

    let forms = this.cancellationInAdvanceLimitForm.get("items") as FormArray
    while (forms.length > 0) {
      forms.removeAt(0)
    }    
    this.selectedRow = []
    this.selected = [];
    this.filteredData = [];
    this.modalRef.hide();
    this.confirmationModal = false
    this.selectedCancellation = true;
  }

  public setTitle( newTitle: string): void {
    this.titleService.setTitle( newTitle ); 
  }

  search(ev){

    if(ev.formData.numFactura !== null || ev.formData.numCuenta !== null || ev.formData.numContrato !== null || ev.formData.numIdCliente !== null ){

      if (ev.formData.numFactura !== '' || ev.formData.numCuenta !== '' || ev.formData.numContrato !== '' || ev.formData.numIdCliente !== '') { 
        
        this.cancelAdvanceByLimitService.search(ev.formData.numFactura, ev.formData.numCuenta, ev.formData.numContrato, ev.formData.numIdCliente).subscribe(
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

  public getFormData(ev): void {
    this.search(ev)        
  }

  public clearFormData(ev){
    // console.log(ev);
    this.cancellationInAdvanceLimitForm.reset()
    this.cancellationInAdvanceLimitForm = this.formBuilder.group({
      items: this.formBuilder.array([])
    });
    this.confirmationModal = false
    this.selected = [];
    this.responseData = '';
  }

  onActivate(event) {
    // console.log('Activate Event', event);
  }

  displayCheck(row) {
    return row.name !== 'Ethel Price';
  } 

  updateValue(event, cell, rowIndex) {
    // this.editing[rowIndex + '-' + cell] = false;
    // this.rows[rowIndex][cell] = event.target.value;
    // this.rows = [...this.rows];
  }

  onSelect({ selected }) {

    let items = this.cancellationInAdvanceLimitForm.get("items") as FormArray
    for (var i = 0; i < items.length; i++) {
      items.at(i).get('reason').clearValidators()
      items.at(i).get('reason').updateValueAndValidity()

      items.at(i).get('comment').clearValidators()
      items.at(i).get('comment').updateValueAndValidity()    

      items.at(i).get('isChecked').setValue(false)          
    }


    this.selected.splice(0, this.selected.length);
    this.selected.push(...selected);
    var listSelected=[];
    if (this.selected.length > 0) {
      this.selectedCancellation = false
      this.selected.forEach(i=>{
        this.selectedRow.forEach((j,n)=>{
          if(i.id==j.id)
          listSelected.push(n)
        })
      })

    }
    else{
      this.selectedCancellation = true
    }

    listSelected.forEach(e=>{
      let currentItem  = (this.cancellationInAdvanceLimitForm.get("items") as FormArray).at(e);
      let reason = currentItem.get('reason');
      reason.setValidators([Validators.required]);
      reason.updateValueAndValidity()

      let comment = currentItem.get('comment');
      comment.setValidators([Validators.required]);
      comment.updateValueAndValidity()

      let isChecked = currentItem.get('isChecked');
      isChecked.setValue(true)

    })

  }

  continue(){
    this.confirmationModal = true;
    
    console.log("Form ", this.cancellationInAdvanceLimitForm.getRawValue())
    let items = this.cancellationInAdvanceLimitForm.get('items') as FormArray

    for (let i = 0; i < items.length; i++) {
      let element = items.at(i)
      let singleElement = items.at(i).get('isChecked');
      if (singleElement.value === true) { 
        (items.at(i) as FormGroup).removeControl('isChecked')
        this.filteredData.push((element as FormGroup).getRawValue())
      }
      
    }
    console.log("Form ", this.filteredData)
  }

  confirmar(){

    let forms = this.cancellationInAdvanceLimitForm.get("items") as FormArray
    while (forms.length > 0) {
      forms.removeAt(0)
    }    
    this.selectedRow = []
    this.selected = [];
    this.filteredData = [];
    this.modalRef.hide();
    this.confirmationModal = false;
    this.selectedCancellation = true;
    
    
    this.toastr.success("Registro Anulado Exitosamente", "Exito")
    this.toastr.error("Error al tratar de procesar la anulacion", "Error")
  }    


}
