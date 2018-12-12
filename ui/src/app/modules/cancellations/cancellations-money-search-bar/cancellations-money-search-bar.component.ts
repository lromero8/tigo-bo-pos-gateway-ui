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

  public bsValue = new Date();
  public bsRangeValue: Date[];
  public maxDate = new Date()


  
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
        "id": 'a',
        "name": "a"
      },
      {
        "id": 'b',
        "name": "b"
      },
      {
        "id": 'c',
        "name": "c"
      }
    ]

    this.maxDate.setDate(this.maxDate.getDate() + 7);
    this.bsRangeValue = [this.bsValue, this.maxDate];

    this.cancelMoneyFrm = this.formBuilder.group({ 

      transactionId : ['', [ Validators.minLength(2), Validators.maxLength(8)]],
      reason : ['', [ Validators.minLength(1), Validators.maxLength(8)]],
      dateRange : [/*this.bsRangeValue*/'', [ /*Validators.required*/ ]],
    }); 



  }

  ngOnInit() {
    this.bsConfig = Object.assign({}, { containerClass: this.colorTheme }, { dateInputFormat: 'MM/DD/YYYY' });
    this.localeService.use('es');
    
  }

  get f() { return this.cancelMoneyFrm.controls }
 
 public search() {
    console.log(
      this.f.transactionId.value,
      this.f.reason.value,
      this.f.dateRange.value,
    )

    this.sendData.emit({
      formData: {
        transactionId: this.f.transactionId.value,
        reason:   this.f.reason.value,
        dateRange: this.f.dateRange.value,
      } 
    })
 }

 public clean() {
  this.clearData.emit({
    action: "clean"
  })
 }

}
