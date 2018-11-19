import { Component, OnInit, Input, ChangeDetectorRef, ViewEncapsulation } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'input-error-messages',
  templateUrl: './input-error-messages.component.html',
  styleUrls: ['./input-error-messages.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class InputErrorMessagesComponent implements OnInit {

  
  @Input('ipName') ipn:FormControl;
  @Input('frmName') frm:any;
  @Input('dataValidation') obj:any; 
  
  constructor(
    private ref: ChangeDetectorRef
    ) { }

  ngOnInit() {
    
  }
  
   //read_prop(obj, prop) {
    //return obj[prop];
  //}
  
  ngOnChanges() {
    this.ref.detectChanges()
    //console.log(typeof(JSON.parse(this.ipn)))
    console.log(
          //this.obj[this.ipn].maxLength
      )
  }
  
 

}
