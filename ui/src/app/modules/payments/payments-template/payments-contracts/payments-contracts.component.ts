import { Component, OnInit, ViewEncapsulation, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'app-payments-contracts',
  templateUrl: './payments-contracts.component.html',
  styleUrls: ['./payments-contracts.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class PaymentsContractsComponent implements OnInit {
  private dataContracts: any;
  private totalInvoices: Number = 0;
  @Input('contracts')
  set data(data: any) {
    if (data) {            
      this.dataContracts = data;
      for (let index = 0; index < data.length; index++) {
        let contracts = data[index].contracts;
        for (let c = 0; c < data[index].contracts.length; c++) {
          let invoices = contracts[c].invoices;
          for (let i = 0; i < contracts.length; i++) {
            let invoiceValue = invoices[i].price_invoice;
            this.totalInvoices = this.totalInvoices  + invoiceValue;
          }

        }

      }
    }

  }

  @Output() parentSearchPaymentContracts: EventEmitter<any> = new EventEmitter();
  constructor() {
  }

  ngOnInit() {
  }

  searchContracts() {
    this.parentSearchPaymentContracts.emit(null);
  }
}
