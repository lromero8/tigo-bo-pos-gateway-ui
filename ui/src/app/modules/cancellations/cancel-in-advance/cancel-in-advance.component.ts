import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

// ************************* FORM VALIDATOR ***********************************
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
// ************************* FORM VALIDATOR ***********************************

// ************************* SERVICES ***********************************
import { ToastrService } from 'ngx-toastr';
import { CancelInAdvanceService } from '../../../services/cancel-in-advance.service';
// ************************* SERVICES ***********************************


@Component({
  selector: 'app-cancel-in-advance',
  templateUrl: './cancel-in-advance.component.html',
  styleUrls: ['./cancel-in-advance.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class CancelInAdvanceComponent implements OnInit {

    /**
     * form group definitions
     */
    public cancellation_form: FormGroup;
    public responseData: any;


  constructor(
    private formBuilder: FormBuilder,
    private toastr: ToastrService,     
    private modalService: NgbModal,
    private CancelInAdvanceService: CancelInAdvanceService,
    ) { 

        // ************************* FORM VALIDATOR ***********************************
        this.cancellation_form = this.formBuilder.group({

            numFactura: ['', [Validators.minLength(1), Validators.maxLength(8)]],
            numCuenta: ['', [Validators.minLength(1), Validators.maxLength(8)]],
            numContrato: ['', [Validators.minLength(1), Validators.maxLength(8)]],
            numIdCliente: ['', [Validators.minLength(1), Validators.maxLength(8)]],
            // emailControl: [
            //     { value: '', disabled: false }, [Validators.required, Validators.email]
            // ]
        })
        // ************************* FORM VALIDATOR ***********************************


  }

  ngOnInit() {
    this.getData();
  }

  open(content) {
    this.modalService.open(content);
  }

  getData() {
    this.CancelInAdvanceService.mock("").subscribe(
        data => {
        // console.log(data)
        // this.responseData = data
        //   if (data.headers[environment.HEADER_SERVICE_CODE] === environment.SUCCESS_CODE) {
        //     // this.toastr.success("Se ejecuto con exito el Conciliador")
        //     this.rows = data.parameters;
        //     if (data.length == 0) { 
        //       this.toastr.warning("No se encontraron registros de esa fecha");
        //     } 
        //    } else {
        //      this.toastr.error(data.headers[environment.HEADER_SERVICE_DESCRIPTION]);
        //    }

        // }, error => { this.toastr.success("Fallo critico ") 
        },
        error => { console.log("Error") }
  
      );
  }    

  onSubmit(){
        // alert("it's works! \n" + JSON.stringify(this.cancellation_form.value, null, "\t"))
        // console.log(this.cancellation_form.value);
    }

  search(){

    if(this.cancellation_form.value.numFactura !== '' || this.cancellation_form.value.numCuenta !== '' || this.cancellation_form.value.numContrato !== '' || this.cancellation_form.value.numIdCliente !== '' ){

      this.CancelInAdvanceService.search(this.cancellation_form.value.numFactura, this.cancellation_form.value.numCuenta, this.cancellation_form.value.numContrato, this.cancellation_form.value.numIdCliente).subscribe(
        data => {
          // console.log(data)
          this.responseData = data

        })

    } else{

      // console.log("vacios")
      this.toastr.error("Debe ingresar al menos un parametro de busqueda");

      
    }

  }


}
