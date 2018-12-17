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
import { MoneyInputService } from 'app/services/money-input.service';

@Component({
  selector: 'app-money-input',
  templateUrl: './money-input.component.html',
  styleUrls: ['./money-input.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class MoneyInputComponent implements OnInit {
  private modalReference: any;
  private ngModalOptions: NgbModalOptions = {
    backdrop: 'static',
    keyboard: false,
    size: 'lg'
  };
  @ViewChild('modalPaymentMethod') modalPaymentMethod: any;
  @ViewChild('modalPaymentContract') modalPaymentContract: any;
  private ContractForm: FormGroup;

  private listContractsAdded = [
    {
      id: null,
      client_name: null,
      client_last_name: null,
      contract_number: null,
      type_account: null,
      contracts: [
        {
          id: null,
          name_contract: '',
          invoices: [
            {
              id: null,
              name_invoice: '',
              price_invoice: null
            }
          ]
        }
      ]
    }
  ];

  constructor(private modalService: NgbModal,
    private fb: FormBuilder,
    private moneyInput: MoneyInputService) {
    this.ContractForm = this.fb.group({
      items: this.fb.array([])
    });
    this.listContractsAdded = [];
  }

  ngOnInit() {
    this.ContractForm = this.fb.group({
      items: this.fb.array([])
    });
  }

  resetForm() {
    this.ContractForm.reset();
    this.ContractForm = this.fb.group({
      items: this.fb.array([])
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
  }

  createItem(item): FormGroup {
    return this.fb.group({
      id: item.id,
      client_name: item.client_name,
      client_last_name: item.client_last_name,
      contract_number: item.contract_number,
      type_account: item.type_account,
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
      price_invoice: item.price_invoice,
      status_invoice: false
    })
  }

  checkInvoice(element, contract, invoice) {

    let items = this.ContractForm.get('items') as FormArray;
    let uniqueItem = items.at(element);
    let itemsContract = uniqueItem.get('contracts') as FormArray;
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

  checkContract(element, contract) {

    let items = this.ContractForm.get('items') as FormArray;
    let uniqueItem = items.at(element);
    let itemsContract = uniqueItem.get('contracts') as FormArray;
    let uniqueContract = itemsContract.at(contract);
    const currentItemInvoice = uniqueContract.get('status_contract');
    let itemsInvoices = uniqueContract.get('invoices') as FormArray;
    if (!currentItemInvoice.value) {
      for (let i = 0; i < itemsInvoices.length; i++) {
        let uniqueInvoice = itemsInvoices.at(i).get('status_invoice');
        uniqueInvoice.setValue(false);
        uniqueInvoice.disable();
      }
    } else {
        let uniqueInvoice = itemsInvoices.at(0).get('status_invoice');
        uniqueInvoice.enable();
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

    this.resetForm();
    this.moneyInput.getContracts('', '', '')
    .subscribe(
      response => {
          response.forEach(element => {
            this.addItemForm(element);
          });
      },
      error => {

      }
    );
  }

  finishContracts() {
    this.listContractsAdded = [];
    const items = this.ContractForm.get('items') as FormArray;
    for (let i = 0; i < items.length; i++) {
      const idClient = items.at(i).get('id').value;
      const clientName = items.at(i).get('client_name').value;
      const clientLastName = items.at(i).get('client_last_name').value;
      const contractNumber = items.at(i).get('contract_number').value;
      const typeAccount = items.at(i).get('type_account').value;
      this.listContractsAdded.push({
        id: idClient,
        client_name: clientName,
        client_last_name: clientLastName,
        contract_number: contractNumber,
        type_account: typeAccount,
        contracts: []
      });
      const itemsContracts = items.at(i).get('contracts') as FormArray;
      for (let c = 0; c < itemsContracts.length; c++) {
        let itemAdded = false;
        const itemContractStatus = itemsContracts.at(c).get('status_contract');
        if (itemContractStatus.value) {
          const idContract = itemsContracts.at(c).get('id').value;
          const nameContract = itemsContracts.at(c).get('name_contract').value;
          const itemsInvoices = itemsContracts.at(c).get('invoices') as FormArray;
          this.listContractsAdded[i].contracts.push({
            id: idContract,
            name_contract: nameContract,
            invoices: []
          });

          for (let inv = 0; inv < itemsInvoices.length; inv++) {
            const itemInvoiceStatus = itemsInvoices.at(inv).get('status_invoice').value;
            if (itemInvoiceStatus) {
              itemAdded = true;
              const idInvoice = itemsInvoices.at(inv).get('id').value;
              const nameInvoice = itemsInvoices.at(inv).get('name_invoice').value;
              const priceInvoice = itemsInvoices.at(inv).get('price_invoice').value;
              this.listContractsAdded[i].contracts[c].invoices.push({
                id: idInvoice,
                name_invoice: nameInvoice,
                price_invoice: priceInvoice
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
    this.closeModal();
  }
}
