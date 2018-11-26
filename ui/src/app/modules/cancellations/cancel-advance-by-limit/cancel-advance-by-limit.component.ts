//
//  
//  
//
//  Created by -- on --
//  Copyright © 2018 hightech-corp. All rights reserved.
//

import { Component, OnInit, ViewEncapsulation } from '@angular/core';

import { trigger, transition, useAnimation } from '@angular/animations';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-cancel-advance-by-limit',
  templateUrl: './cancel-advance-by-limit.component.html',
  styleUrls: ['./cancel-advance-by-limit.component.scss'],
  encapsulation: ViewEncapsulation.None,

})
export class CancelAdvanceByLimitComponent implements OnInit {

  constructor(private modalService: NgbModal) { }


  ngOnInit() {
  }

  open(content) {
    this.modalService.open(content);
  }

}
