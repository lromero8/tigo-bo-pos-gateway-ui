import { Component, OnInit, ViewEncapsulation, TemplateRef } from '@angular/core';

// ************************* FORM VALIDATOR ***********************************
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
// ************************* FORM VALIDATOR ***********************************

// ************************* SERVICES ***********************************
import { ToastrService } from 'ngx-toastr';
import { CancelInAdvanceService } from '../../../services/cancel-in-advance.service';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
// ************************* SERVICES ***********************************
import { Title } from '@angular/platform-browser';

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
    public modalRef: BsModalRef;
    
    public billNumber: any;
    public responseData: any;
    public selectedRow: any;
    public selected = [];

    public reasons = [
        { "id": "Falta de fondos", "value": "insufficientFunds" },
        { "id": "Fecha expirada", "value": "dateExpired" },
        { "id": "Razones personales", "value": "personalReasons" }     
    ];    




  constructor(
    private formBuilder: FormBuilder,
    private toastr: ToastrService,     
    private CancelInAdvanceService: CancelInAdvanceService,
    private titleService: Title,
    private modalService: BsModalService
    ) { 


  }

  ngOnInit() {
    this.getData();
    this.setTitle('cancelar en adelanto');
    
  }


  openModal(template: TemplateRef<any>, row) {
    this.modalRef = this.modalService.show(template,{'class':'modal-xl modal-lg'});
    // console.log(row)
    this.billNumber = row.billNumber;
    this.selectedRow = row.invoice;
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

  search(ev){

    if(ev.formData.numFactura !== '' || ev.formData.numCuenta !== '' || ev.formData.numContrato !== '' || ev.formData.numIdCliente !== '' ){

      this.CancelInAdvanceService.search(ev.formData.numFactura, ev.formData.numCuenta, ev.formData.numContrato, ev.formData.numIdCliente).subscribe(
        data => {
          this.responseData = data
          console.log(this.responseData)

        })

    } else{

      // console.log("vacios")
      this.toastr.error("Debe ingresar al menos un parametro de busqueda");

      
    }

  }


  public getFormData(ev){
    // console.log(ev);
    this.search(ev)
  }

  public clearFormData(ev){
    // console.log(ev);
    this.responseData = '';
  }

  public setTitle( newTitle: string): void {
    this.titleService.setTitle( newTitle ); 
  }

  onSelect({ selected }) {
    console.log('Select Event', selected, this.selected);

    this.selected.splice(0, this.selected.length);
    this.selected.push(...selected);
  }

  onActivate(event) {
    console.log('Activate Event', event);
  }

  add() {
    // this.selected.push(this.rows[1], this.rows[3]);
  }

  update() {
    // this.selected = [ this.rows[1], this.rows[3] ];
  }

  remove() {
    this.selected = [];
  }

  displayCheck(row) {
    return row.name !== 'Ethel Price';
  } 

  updateValue(event, cell, rowIndex) {
    // this.editing[rowIndex + '-' + cell] = false;
    // this.rows[rowIndex][cell] = event.target.value;
    // this.rows = [...this.rows];
  }  

}
