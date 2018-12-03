import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { VoucherOnDemandPaymentMassiveService } from '../../../services/voucher-on-demand-payment-massive.service'

@Component({
  selector: 'app-voucher-ondemand-payment-massive',
  templateUrl: './voucher-ondemand-payment-massive.component.html',
  styleUrls: ['./voucher-ondemand-payment-massive.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class VoucherOndemandPaymentMassiveComponent implements OnInit {

  constructor(private titleService: Title) { }

  ngOnInit() {
    this.setTitle('Opciones de pago');
  }

  public setTitle( newTitle: string): void {
    this.titleService.setTitle( newTitle ); 
  }

}
