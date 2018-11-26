import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputErrorMessagesComponent } from './input-error-messages/input-error-messages.component';
import { UploadComponent } from './upload/upload.component'
import { FilterPipe } from './pipes/filter.pipe'
import { OnlyNumber } from './directives/onlynumber.directive';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  imports: [
    CommonModule,
    NgbModule.forRoot(),
  ],
  declarations: [InputErrorMessagesComponent,UploadComponent,FilterPipe, OnlyNumber, ],
  exports:[InputErrorMessagesComponent,UploadComponent,FilterPipe, OnlyNumber, OwlDateTimeModule, 
    OwlNativeDateTimeModule,
    NgbModule,
  ]
})
export class UtilModule { }
