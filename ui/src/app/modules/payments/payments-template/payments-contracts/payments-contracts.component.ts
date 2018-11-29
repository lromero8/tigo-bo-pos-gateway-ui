import { Component, OnInit, ViewEncapsulation, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'app-payments-contracts',
  templateUrl: './payments-contracts.component.html',
  styleUrls: ['./payments-contracts.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class PaymentsContractsComponent implements OnInit {
  private dataContracts: any;
  @Input('contracts')
  set data(data: any) {
    if (data) {
      this.dataContracts = data;
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
