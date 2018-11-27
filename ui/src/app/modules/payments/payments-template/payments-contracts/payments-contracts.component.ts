import { Component, OnInit, ViewEncapsulation, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'app-payments-contracts',
  templateUrl: './payments-contracts.component.html',
  styleUrls: ['./payments-contracts.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class PaymentsContractsComponent implements OnInit {
  @Input('contracts') contractsParent: any;

  @Output() parentSearchPaymentContracts: EventEmitter<any> = new EventEmitter();
  constructor() {
   }

  ngOnInit() {
  }

  searchContracts() {
    this.parentSearchPaymentContracts.emit(null);
  }
}
