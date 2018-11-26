//
//  
//  
//
//  Created by -- on --
//  Copyright © 2018 hightech-corp. All rights reserved.
//

import { Component, OnInit, ViewEncapsulation } from '@angular/core';

import { trigger, transition, useAnimation } from '@angular/animations';
import { bounce, fadeInDown, fadeInUp } from 'ng-animate';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-cancel-advance-by-limit',
  templateUrl: './cancel-advance-by-limit.component.html',
  styleUrls: ['./cancel-advance-by-limit.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: [
    trigger('bounce', [transition('* => *', useAnimation(bounce))]),
    trigger('fadeInDown', [transition('* => *', useAnimation(fadeInDown))]),
    trigger('fadeInUp', [transition('* => *', useAnimation(fadeInUp))]),
  ]
})
export class CancelAdvanceByLimitComponent implements OnInit {

  constructor(private modalService: NgbModal) { }


  ngOnInit() {
  }

  open(content) {
    this.modalService.open(content);
  }

}
