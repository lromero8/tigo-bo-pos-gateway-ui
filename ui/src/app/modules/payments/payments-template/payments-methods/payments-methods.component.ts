import { Component, OnInit, ViewEncapsulation, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-payments-methods',
  templateUrl: './payments-methods.component.html',
  styleUrls: ['./payments-methods.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class PaymentsMethodsComponent implements OnInit {
  @Output() parentSearchPaymentMethods: EventEmitter<any> = new EventEmitter();
  constructor() { }

  ngOnInit() {
  }

  searchPaymentMethods() {
    this.parentSearchPaymentMethods.emit(null);
  }

}
