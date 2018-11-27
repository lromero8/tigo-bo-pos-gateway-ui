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
            },
            {
              id: '003',
              name: 'invoice 3'
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

  private listContractsAdded = {
    'contracts': [
      {
        id: 0,
        name: '',
        invoices: [
          {
            id: 0,
            name: ''
          }
        ]
      }
    ]
  };

  constructor(private modalService: NgbModal,
    private fb: FormBuilder) {
    this.ContractForm = this.fb.group({
      items: this.fb.array([])
    });
    this.listContractsAdded.contracts = [];
  }

  ngOnInit() {
    this.listContracts.contracts.forEach(element => {
      this.addItemForm(element);
    });
  }


  addItemForm(item) {
    let itemArray = this.ContractForm.get('items') as FormArray;
    itemArray.push(this.createItem(item));
    const lastIndex = itemArray.length - 1
    const itemArrayInvoice = itemArray.at(lastIndex).get('invoices') as FormArray;
    for (let index = 0; index < item.invoices.length; index++) {
      itemArrayInvoice.push(this.createItemInvoice(item.invoices[index], index));
      let currentItemInvoice = itemArrayInvoice.at(index);
      if (index > 0) {
        currentItemInvoice.get('status_invoice').disable();
      }
    }
  }

  createItem(item): FormGroup {
    return this.fb.group({
      id: item.id,
      name: item.name,
      status_item: false,
      invoices: this.fb.array([])
    })
  }

  createItemInvoice(item, index): FormGroup {
    return this.fb.group({
      index: index,
      id: item.id,
      name: item.name,
      status_invoice: false
    })
  }

  checkInvoice(contract, invoice) {
    let item = (this.ContractForm.get('items') as FormArray).at(contract);
    let itemsInvoice = item.get('invoices') as FormArray;
    const currentItemInvoice = itemsInvoice.at(invoice).get('status_invoice');
    if (currentItemInvoice.value) {
      if ((invoice + 1) < itemsInvoice.length) {
        let nextItemInvoce = itemsInvoice.at(invoice + 1).get('status_invoice');
        nextItemInvoce.enable();
      }
    } else {
      for (let index = 0; index < itemsInvoice.length; index++) {
        if (index > invoice) {
          let itemToDisable = itemsInvoice.at(index).get('status_invoice');
          itemToDisable.setValue(false);
          itemToDisable.disable();
        }
      }
    }
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
  getContracts() {

  }

  finishContracts() {
    const items = this.ContractForm.get('items') as FormArray;
    for (let index = 0; index < items.length; index++) {
      let itemAdded = false;
      const itemContract = items.at(index);
      const itemContractStatus = itemContract.get('status_item');
      if (itemContractStatus.value) {
        const itemsInvoice = items.at(index).get('invoices') as FormArray;
        for (let invoices = 0; invoices < itemsInvoice.length; invoices++) {
          const itemInvoiceStatus = itemsInvoice.at(invoices).get('status_invoice');
          const uniqueContract = itemsInvoice.at(invoices);
          if (itemInvoiceStatus.value) {
            itemAdded = true;
            const idContract = itemContract.get('id').value;
            const nameContract = itemContract.get('name').value;
            const idInvoice = uniqueContract.get('id').value;
            const nameInvoice = uniqueContract.get('name').value;
            if (invoices == 0) {
              this.listContractsAdded.contracts.push({
                id: idContract,
                name: nameContract,
                invoices: [
                  {
                    id: idInvoice,
                    name: nameInvoice
                  }
                ]
              });
            } else {
              this.listContractsAdded.contracts[index].invoices.push({
                id: idInvoice,
                name: nameInvoice
              })
            }
          }
          if (!itemAdded) {
            alert('Se ha seleccionado uno o mas contratos sin elegir alguna factura');
            return;
          }

        }

      }
    }
  }

}
