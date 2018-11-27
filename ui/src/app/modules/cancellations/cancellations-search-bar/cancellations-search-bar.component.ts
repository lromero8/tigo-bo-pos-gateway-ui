import { Component, OnInit, ViewEncapsulation, EventEmitter, Output, Input,  } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";

@Component({
  selector: 'app-cancellations-search-bar',
  templateUrl: './cancellations-search-bar.component.html',
  styleUrls: ['./cancellations-search-bar.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class CancellationsSearchBarComponent implements OnInit {


  public cancellation_form: FormGroup; 
  
  constructor(
    private formBuilder: FormBuilder, 
  ) {

    // ************************* FORM VALIDATOR ***********************************
    this.cancellation_form = this.formBuilder.group({

      numFactura: ['', [ Validators.minLength(5), Validators.maxLength(8)]],
      numCuenta: ['', [ Validators.minLength(5), Validators.maxLength(8)]],
      numContrato: ['', [ Validators.minLength(5), Validators.maxLength(8)]],
      numIdCliente: ['', [ Validators.minLength(5), Validators.maxLength(8)]],
      // emailControl: [
      //     { value: '', disabled: false }, [Validators.required, Validators.email]
      // ]
    })
    // ************************* FORM VALIDATOR ***********************************
    
  }

  @Output('sendData') sendData: EventEmitter<any> = new EventEmitter<any>();
  @Output('clearData') clearData: EventEmitter<any> = new EventEmitter<any>();


  public onSubmit() {
    /*console.log(
      this.cancellation_form.controls.numFactura.value,
      this.cancellation_form.controls.numCuenta.value,
      this.cancellation_form.controls.numContrato.value,
      this.cancellation_form.controls.numIdCliente.value
    )*/
    this.search();
  }

  public ngOnInit() {
  }

  public search() {
    this.sendData.emit({
      formData: {
        numFactura:  this.cancellation_form.controls.numFactura.value,
        numCuenta: this.cancellation_form.controls.numCuenta.value,
        numContrato: this.cancellation_form.controls.numContrato.value,
        numIdCliente: this.cancellation_form.controls.numIdCliente.value
      }
    })
  }

  public clear() {
    this.clearData.emit({
      action: 'clear'
    });
  }



}
