import { Component, OnInit, ViewEncapsulation, TemplateRef } from '@angular/core';

// ************************* FORM VALIDATOR ***********************************
import { FormGroup, FormBuilder, FormArray, Validators } from "@angular/forms";
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

    public cancellationInAdvanceForm: FormGroup; 
    public modalRef: BsModalRef;

    
    public billNumber: any;
    public responseData: any; //data for datatable
    public filteredData = []; //checked data for datatable    
    public selectedRow: any; 
    public selected = []; //variable that stores checked cancelations
    public selectedCancellation: boolean = true //variable that checks if at least one cancelation is checked
    public confirmationModal: boolean = false //variable that shows and hides the second modal
    public secondForm : any;


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

    this.cancellationInAdvanceForm = this.formBuilder.group({ 
      items: this.formBuilder.array([])//reason : this.formBuilder.array([])//['', [ Validators.required, Validators.minLength(2), Validators.maxLength(8)]],
      //comment : this.formBuilder.array([])//['', [ Validators.minLength(2), Validators.maxLength(8)]],
    }); 

  }

  ngOnInit() {
    this.getData();
    this.setTitle('cancelar en adelanto');
    
  }


  openModal(template: TemplateRef<any>, row) {
    this.modalRef = this.modalService.show(template,{'class':'modal-xl modal-lg', 'keyboard': false, 'ignoreBackdropClick': true});
    // console.log(row)
    this.billNumber = row.billNumber;
    this.selectedRow = row.invoice;
        console.log(this.cancellationInAdvanceForm.getRawValue())

    this.selectedRow.forEach( i => {
      // console.log(i)
      this.addItems(i)
    })
    // console.table(this.cancellationInAdvanceForm.getRawValue())
  }

  closeModal(){

    // console.log(this.cancellationInAdvanceForm.getRawValue())
    // debugger
    let forms = this.cancellationInAdvanceForm.get("items") as FormArray
    while (forms.length > 0) {
      forms.removeAt(0)
    }    
    this.selectedRow = []
    this.selected = [];
    this.filteredData = [];
    this.modalRef.hide();
    this.confirmationModal = false

  }

  addItems(items){
    let itemsArray = this.cancellationInAdvanceForm.get('items') as FormArray;
    itemsArray.push(this.addItemsArray(items))
  }

  addItemsArray(item){
    return this.formBuilder.group({
      payment: item.amountPayment,
      paymentDate: item.paymentDate,
      reason: [""],
      comment: [""],
      dateModified: item.modifyDate,
      isChecked: false
    })
  }

  // , Validators.required]
  // , Validators.compose([Validators.required, Validators.minLength(5), Validators.maxLength(50)])

  getData() {
    this.CancelInAdvanceService.mock("").subscribe(
        data => {
        },
        error => { console.log("Error") }
  
      );
  }    


  search(ev){

    // console.log(ev.formData.numFactura)
    // console.log(ev.formData.numCuenta)
    // console.log(ev.formData.numContrato)
    // console.log(ev.formData.numIdCliente)

    if(ev.formData.numFactura !== null || ev.formData.numCuenta !== null || ev.formData.numContrato !== null || ev.formData.numIdCliente !== null ){

      if (ev.formData.numFactura !== '' || ev.formData.numCuenta !== '' || ev.formData.numContrato !== '' || ev.formData.numIdCliente !== '') { 
        
        this.CancelInAdvanceService.search(ev.formData.numFactura, ev.formData.numCuenta, ev.formData.numContrato, ev.formData.numIdCliente).subscribe(
          data => {
            this.responseData = data
            // console.log(this.responseData)
          })

      } else {
        this.toastr.error("Debe ingresar al menos un parametro de busqueda");
      }
    } else{
      this.toastr.error("Debe ingresar al menos un parametro de busqueda");
    }

  }


  public getFormData(ev){
    // console.log(ev);
    this.search(ev)
  }

  public clearFormData(ev){
    // console.log(ev);
    this.cancellationInAdvanceForm.reset()
    this.cancellationInAdvanceForm = this.formBuilder.group({
      items: this.formBuilder.array([])
    });
    this.confirmationModal = false
    this.selected = [];
    this.responseData = '';
  }

  public setTitle( newTitle: string): void {
    this.titleService.setTitle( newTitle ); 
  }

  onSelect({ selected }) {

    let items = this.cancellationInAdvanceForm.get("items") as FormArray
    for (var i = 0; i < items.length; i++) {
      items.at(i).get('reason').clearValidators()
      items.at(i).get('reason').updateValueAndValidity()

      items.at(i).get('comment').clearValidators()
      items.at(i).get('comment').updateValueAndValidity()    

      items.at(i).get('isChecked').setValue(false)          
    }



    // console.log('Select Event', selected, this.selected);

    this.selected.splice(0, this.selected.length);
    this.selected.push(...selected);
    var listSelected=[];
    if (this.selected.length > 0) {
      this.selectedCancellation = false
      this.selected.forEach(i=>{
        this.selectedRow.forEach((j,n)=>{
          if(i.id==j.id)
          listSelected.push(n)
        })
      })

    }
    else{
      this.selectedCancellation = true
    }

    listSelected.forEach(e=>{
      // debugger
      let currentItem  = (this.cancellationInAdvanceForm.get("items") as FormArray).at(e);
      let reason = currentItem.get('reason');
      reason.setValidators([Validators.required]);
      reason.updateValueAndValidity()

      let comment = currentItem.get('comment');
      comment.setValidators([Validators.required]);
      comment.updateValueAndValidity()

      let isChecked = currentItem.get('isChecked');
      isChecked.setValue(true)

    })
    // console.log("////////////////////////")

    // console.log(listSelected)
  }

  onActivate(event) {
    // console.log('Activate Event', event);
  }

  displayCheck(row) {
    return row.name !== 'Ethel Price';
  } 

  updateValue(event, cell, rowIndex) {
    // this.editing[rowIndex + '-' + cell] = false;
    // this.rows[rowIndex][cell] = event.target.value;
    // this.rows = [...this.rows];
  }  

  continue(){
    this.confirmationModal = true;
    // this.secondForm = this.cancellationInAdvanceForm.getRawValue()
    // console.log(this.secondForm)    
    console.log("Form ", this.cancellationInAdvanceForm.getRawValue())
    let items = this.cancellationInAdvanceForm.get('items') as FormArray
    // console.log("Comment ", items.at(0).get('comment').value)


    
    for (let i = 0; i < items.length; i++) {
      let element = items.at(i)
      let singleElement = items.at(i).get('isChecked');
      if (singleElement.value === true) { 
        (items.at(i) as FormGroup).removeControl('isChecked')
        this.filteredData.push((element as FormGroup).getRawValue())
      }
      
    }
    // console.log("Len ", len)
    console.log("Form ", this.filteredData)
  }


  confirmar(){

    let forms = this.cancellationInAdvanceForm.get("items") as FormArray
    while (forms.length > 0) {
      forms.removeAt(0)
    }    
    this.selectedRow = []
    this.selected = [];
    this.filteredData = [];
    this.modalRef.hide();
    this.confirmationModal = false
    
    this.toastr.success("Registro Anulado Exitosamente", "Exito")
    this.toastr.error("Error al tratar de procesar la anulacion", "Error")
  }

}
