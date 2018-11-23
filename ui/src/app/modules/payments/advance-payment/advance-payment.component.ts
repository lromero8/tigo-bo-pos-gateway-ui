//
//  
//  
//
//  Created by -- on --
//  Copyright © 2018 hightech-corp. All rights reserved.
//

import { Component, OnInit, ViewEncapsulation, ViewChild } from '@angular/core';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-advance-payment',
  templateUrl: './advance-payment.component.html',
  styleUrls: ['./advance-payment.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AdvancePaymentComponent implements OnInit {
  private modalReference: any;
  @ViewChild('modalPaymentMethod') modalPaymentMethod: any;
  @ViewChild('modalPaymentContract') modalPaymentContract: any;

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

  constructor(private modalService: NgbModal) { }

  ngOnInit() {
  }

  searchPaymentMethods() {
    this.modalReference = this.modalService.open(this.modalPaymentMethod, { size: 'lg' });
  }

  searchPaymentContracts() {
    this.modalReference = this.modalService.open(this.modalPaymentContract, { size: 'lg' });
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

}
