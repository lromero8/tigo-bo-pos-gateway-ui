import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputErrorMessagesComponent } from './input-error-messages/input-error-messages.component';
import { UploadComponent } from './upload/upload.component'
import { FilterPipe } from './pipes/filter.pipe'
import { OnlyNumber } from './directives/onlynumber.directive';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DatepickerModule } from 'ngx-bootstrap';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { FormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';

@NgModule({
  imports: [
    CommonModule,
    NgbModule.forRoot(),
    BsDatepickerModule.forRoot(),
    FormsModule,
    NgSelectModule
  ],
  declarations: [InputErrorMessagesComponent,UploadComponent,FilterPipe, OnlyNumber,
    
    ],
  exports:[InputErrorMessagesComponent,UploadComponent,FilterPipe, OnlyNumber, OwlDateTimeModule, 
    OwlNativeDateTimeModule,
    NgbModule, 
    BsDatepickerModule,
    FormsModule,
    NgSelectModule
  ]
})
export class UtilModule { }
