import { Component, OnInit, ViewEncapsulation, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-payments-contracts',
  templateUrl: './payments-contracts.component.html',
  styleUrls: ['./payments-contracts.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class PaymentsContractsComponent implements OnInit {
  private listContractsShared = {
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

  @Output() parentSearchPaymentContracts: EventEmitter<any> = new EventEmitter();
  constructor() {
    this.listContractsShared.contracts = [];
   }

  ngOnInit() {
  }

  searchContracts() {
    this.parentSearchPaymentContracts.emit(null);
  }
}
