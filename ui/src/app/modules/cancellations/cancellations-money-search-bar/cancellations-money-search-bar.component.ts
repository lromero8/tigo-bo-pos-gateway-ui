import { Component, OnInit, ViewEncapsulation , ViewChild, Output, EventEmitter } from '@angular/core';
import { BsDatepickerConfig, BsLocaleService, BsDaterangepickerDirective } from 'ngx-bootstrap/datepicker'
import { listLocales } from 'ngx-bootstrap/chronos';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";

@Component({
  selector: 'app-cancellations-money-search-bar',
  templateUrl: './cancellations-money-search-bar.component.html',
  styleUrls: ['./cancellations-money-search-bar.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class CancellationsMoneySearchBarComponent implements OnInit {

  public locale = 'en';
  public colorTheme = 'theme-dark-blue';
  public bsConfig: Partial<BsDatepickerConfig>;
  public locales = listLocales();
  public reasons: Array<any>;
  public cancelMoneyFrm: FormGroup;

  
  @ViewChild('dpa') dpa: BsDaterangepickerDirective;
  @ViewChild('dpb') dpb: BsDaterangepickerDirective;

  @Output('sendData') sendData: EventEmitter<any> = new EventEmitter<any>();
  @Output('clearData') clearData: EventEmitter<any> = new EventEmitter<any>();


  constructor(
              private localeService: BsLocaleService, 
              private formBuilder: FormBuilder,
              ) { 
    this.reasons = [
      {
        "id": 1,
        "name": "a"
      },
      {
        "id": 2,
        "name": "b"
      },
      {
        "id": 3,
        "name": "c"
      }
    ]

    this.cancelMoneyFrm = this.formBuilder.group({ 

      transacctionId : ['', [ Validators.minLength(2), Validators.maxLength(8)]],
      reason : ['', [ Validators.minLength(2), Validators.maxLength(8)]],
      startDate : ['', [ Validators.minLength(2), Validators.maxLength(8)]],
      endDate : ['', [ Validators.minLength(2), Validators.maxLength(8)]],
    }); 
  }

  ngOnInit() {
    this.bsConfig = Object.assign({}, { containerClass: this.colorTheme });
    this.localeService.use('es');
    
  }

  get f() { return this.cancelMoneyFrm.controls }
 
 public search() {
    console.log(
      this.f.transacctionId.value,
      this.f.reason.value,
      this.f.startDate.value,
      this.f.endDate.value,
    )

    this.sendData.emit({
      formData: {
        transacctionId: this.f.transacctionId.value,
        reason:   this.f.reason.value,
        startDate: this.f.startDate.value,
        endDate: this.f.endDate.value
      } 
    })
 }

 public clean() {
  this.clearData.emit({
    action: "clean"
  })
 }

}
