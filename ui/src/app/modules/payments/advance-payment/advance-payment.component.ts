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
    [
      {
        id: 123213,
        client_name: 'JORGE ANTONIO',
        client_last_name: 'SAAVEDRA SAAVEDRA',
        contrat_number: '1070230',
        type_account: 'CET',
        contracts: [
          {
            id: 0,
            name_contract: 'Contrato 1',
            invoices: [
              {
                id: 0,
                name_invoice: 'Factura 1'
              },
              {
                id: 1,
                name_invoice: 'Factura 2'
              }
            ]
          },
          {
            id: 1,
            name_contract: 'Contrato 2',
            invoices: [
              {
                id: 0,
                name_invoice: 'Factura 1'
              },
              {
                id: 1,
                name_invoice: 'Factura 2'
              }
            ]
          }
        ]
      }
    ];

  private listContractsAdded = [
    {
      id: null,
      client_name: null,
      client_last_name: null,
      contrat_number: null,
      type_account: null,
      contracts: [
        {
          id: null,
          name_contract: '',
          invoices: [
            {
              id: null,
              name_invoice: ''
            }
          ]
        }
      ]
    }
  ];

  constructor(private modalService: NgbModal,
    private fb: FormBuilder) {
    this.ContractForm = this.fb.group({
      items: this.fb.array([])
    });
    this.listContractsAdded = [];
  }

  ngOnInit() {
    this.listContracts.forEach(element => {
      this.addItemForm(element);
    });
  }


  addItemForm(item) {
    let itemArray = this.ContractForm.get('items') as FormArray;
    itemArray.push(this.createItem(item));
    const lastIndex = itemArray.length - 1
    let itemArrayToUse = itemArray.at(lastIndex) as FormArray;
    let contractsArray = itemArrayToUse.get('contracts') as FormArray;

    for (let h = 0; h < item.contracts.length; h++) {

      contractsArray.push(this.createItemContract(item.contracts[h], h));
      let contractArrayToUse = contractsArray.at(h) as FormArray;
      let invoicesArray = contractArrayToUse.get('invoices') as FormArray;

      for (let i = 0; i < item.contracts[h].invoices.length; i++) {

        invoicesArray.push(this.createItemInvoice(item.contracts[h].invoices[i], i));
        let currentItemInvoice = invoicesArray.at(i);
        if (i > 0) {
          currentItemInvoice.get('status_invoice').disable();
        }
      }
    }
    console.table(this.ContractForm.getRawValue());
  }

  createItem(item): FormGroup {
    return this.fb.group({
      id: item.id,
      client_name: item.client_name,
      client_last_name: item.client_last_name,
      contract_number: item.contract_number,
      type_account: item.type_accounnt,
      contracts: this.fb.array([])
    })
  }

  createItemContract(item, index): FormGroup {
    return this.fb.group({
      index: index,
      id: item.id,
      name_contract: item.name_contract,
      status_contract: false,
      invoices: this.fb.array([])
    })
  }

  createItemInvoice(item, index): FormGroup {
    return this.fb.group({
      index: index,
      id: item.id,
      name_invoice: item.name_invoice,
      status_invoice: false
    })
  }

  checkInvoice(element, contract, invoice) {

    let items = this.ContractForm.get('items') as FormArray;
    let uniqueItem = items.at(element);
    let itemsContract = uniqueItem.get('contracts')as FormArray;
    let uniqueItemsInvoice = itemsContract.at(contract);
    let itemsInvoice = uniqueItemsInvoice.get('invoices') as FormArray;
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
  //   const items = this.ContractForm.get('items') as FormArray;
  //   for (let index = 0; index < items.length; index++) {
  //     let itemAdded = false;
  //     const itemContract = items.at(index);
  //     const itemContractStatus = itemContract.get('status_item');
  //     if (itemContractStatus.value) {
  //       const itemsInvoice = items.at(index).get('invoices') as FormArray;
  //       for (let invoices = 0; invoices < itemsInvoice.length; invoices++) {
  //         const itemInvoiceStatus = itemsInvoice.at(invoices).get('status_invoice');
  //         const uniqueContract = itemsInvoice.at(invoices);
  //         if (itemInvoiceStatus.value) {
  //           itemAdded = true;
  //           const idContract = itemContract.get('id').value;
  //           const nameContract = itemContract.get('name').value;
  //           const idInvoice = uniqueContract.get('id').value;
  //           const nameInvoice = uniqueContract.get('name').value;
  //           if (invoices == 0) {
  //             this.listContractsAdded.contracts.push({
  //               user: {
  //                 id: 10000,
  //                 name_user: 'Juan Perez'
  //               },
  //               contract: {
  //                 id: idContract,
  //                 name_contract: nameContract,
  //                 type_account: 'CET'
  //               },
  //               invoices: [
  //                 {
  //                   id: idInvoice,
  //                   name_invoice: nameInvoice
  //                 }
  //               ]
  //             });
  //           } else {
  //             this.listContractsAdded.contracts[index].invoices.push({
  //               id: idInvoice,
  //               name_invoice: nameInvoice
  //             })
  //           }
  //         }
  //         if (!itemAdded) {
  //           alert('Se ha seleccionado uno o mas contratos sin elegir alguna factura');
  //           return;
  //         }
  //       }
  //     }
  //   }
  // }
  }
}
