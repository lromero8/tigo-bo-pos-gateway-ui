//
//  
//  
//
//  Created by -- on --
//  Copyright © 2018 hightech-corp. All rights reserved.
//

import { Component, OnInit, ViewEncapsulation, ViewChild } from '@angular/core';

import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormBuilder, FormArray } from '@angular/forms';

@Component({
  selector: 'app-advance-payment',
  templateUrl: './advance-payment.component.html',
  styleUrls: ['./advance-payment.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AdvancePaymentComponent implements OnInit {
  private modalReference: any;
  private ngModalOptions: NgbModalOptions = {
    backdrop: 'static',
    keyboard: false,
    size: 'lg'
  };
  @ViewChild('modalPaymentMethod') modalPaymentMethod: any;
  @ViewChild('modalPaymentContract') modalPaymentContract: any;
  private ContractForm: FormGroup;

  private listContracts =
    {
      'contracts': [
        {
          id: 0,
          name: 'Contract 1',
          invoices: [
            {
              id: '001',
              name: 'invoice 1'
            },
            {
              id: '002',
              name: 'invoice 2'
            }
          ]
        },
        {
          id: 2,
          name: 'Contract 2',
          invoices: [
            {
              id: '003',
              name: 'invoice 1'
            }
          ]
        },
        {
          id: 2,
          name: 'Contract 2',
          invoices: [
            {
              id: '003',
              name: 'invoice 1'
            }
          ]
        }
      ]
    };

  constructor(private modalService: NgbModal,
    private fb: FormBuilder) {
      this.ContractForm = this.fb.group({
        items: this.fb.array([])
      })
  }

  ngOnInit() {
    this.listContracts.contracts.forEach(element => {
      this.addItemForm(element);
    });

    console.log(this.ContractForm.getRawValue())
  }


  addItemForm(item) {
    let itemArray = this.ContractForm.get('items') as FormArray;
    itemArray.push(this.createItem(item));
    const lastIndex = itemArray.length - 1
    const itemArrayInvoice = itemArray.at(lastIndex).get('invoices') as FormArray
    for (let index = 0; index < item.invoices.length; index++) {
      itemArrayInvoice.push(this.createItemInvoice(item.invoices[index], index));
    }
  }

  createItem(item): FormGroup {
    return this.fb.group({
      id: item.id,
      name: item.name,
      invoices: this.fb.array([])
    })
  }

  createItemInvoice(item, index): FormGroup {
    return this.fb.group({
      index: index,
      id: item.id,
      name: item.name,
      status: false
    })
  }



  searchPaymentMethods() {
    this.modalReference = this.modalService.open(this.modalPaymentMethod, this.ngModalOptions);
  }

  searchPaymentContracts() {
    this.modalReference = this.modalService.open(this.modalPaymentContract, this.ngModalOptions);
  }

  closeModal() {
    this.modalReference.close();
  }

  collapseCheckbox(element) {
    // if (element.checked) {
    //   element.checked = false;
    // } else {
    //   element.checked = true;
    // }
  }
  getContracts() {

  }

  finishContracts() {

  }

}
