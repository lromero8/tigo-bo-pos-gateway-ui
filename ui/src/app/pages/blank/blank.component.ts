import { Component, OnInit, ViewEncapsulation } from '@angular/core';

import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import {DatatableComponent} from '@swimlane/ngx-datatable';
import { ViewChild} from '@angular/core';
@Component({
  selector: 'app-blank',
  templateUrl: './blank.component.html',
  styleUrls: ['./blank.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class BlankComponent implements OnInit {

  public displayedColumns = ['numero', 'notificacion', 'customColumn1'];


  	//ngx-table
  	@ViewChild(DatatableComponent) table: DatatableComponent;


	rows = ELEMENT_DATA;

	temp = ELEMENT_DATA;

	// temp = [];

	columns = [
    { prop: 'numero' },
    { prop: 'notificacion' },
    { name: 'acciones' }
  ];
	

  	//ngx-table 


  constructor() {


   }

  ngOnInit() {
 /* 	this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;*/

  }


  // applyFilter(filterValue: string) {
  //   filterValue = filterValue.trim(); // Remove whitespace
  //   filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
  //   this.dataSource.filter = filterValue;
  // }


  updateFilter(event) {
    const val = event.target.value.toLowerCase();

    // filter our data
    const temp = this.temp.filter((d) =>  {


      return Object.keys(d).forEach(key => {
      	return d[key].toLowerCase().indexOf(val) !== -1 || !val;
      })
      
      

    });  

    // update the rows
    this.rows = temp;
    // Whenever the filter changes, always go back to the first page
    // this.table.offset = 0;

  }

  delete(row){
  	console.log(row)
  }


  

}




export interface PeriodicElement {
  id: number;
  numero: string;
  notificacion: boolean;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {id: 0 , numero: '71717171', notificacion: true},
  {id: 1 , numero: '72727272', notificacion: false},
  {id: 2 , numero: '73737373', notificacion: true},
  {id: 3 , numero: '74747474', notificacion: true},
  {id: 4 , numero: '75757575', notificacion: false},
  {id: 5 , numero: '76767676', notificacion: false},
  {id: 6 , numero: '77777777', notificacion: true},
  {id: 7 , numero: '78787878', notificacion: false},
  {id: 8 , numero: '79797979', notificacion: true},
  {id: 9 , numero: '70707070', notificacion: true},
];
