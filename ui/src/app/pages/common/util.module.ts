import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputErrorMessagesComponent } from './input-error-messages/input-error-messages.component';
import { UploadComponent } from './upload/upload.component'
import { FilterPipe } from './pipes/filter.pipe'
import { OnlyNumber } from './directives/onlynumber.directive';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import { ArchwizardModule } from 'angular-archwizard';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DatepickerModule } from 'ngx-bootstrap';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { NgBootstrapFormValidationModule } from 'ng-bootstrap-form-validation';

@NgModule({
  imports: [
    CommonModule,
    NgbModule.forRoot(),
    BsDatepickerModule.forRoot(),
    FormsModule,
    NgSelectModule,
    NgxDatatableModule,
    NgBootstrapFormValidationModule,
  ],
  declarations: [InputErrorMessagesComponent, UploadComponent, FilterPipe, OnlyNumber,

  ],
  exports: [InputErrorMessagesComponent, UploadComponent, FilterPipe, OnlyNumber, OwlDateTimeModule,
    OwlNativeDateTimeModule,
    NgbModule,
    BsDatepickerModule,
    FormsModule,
    NgSelectModule,
    ArchwizardModule,
    ReactiveFormsModule,
    NgxDatatableModule,
    NgBootstrapFormValidationModule,
  ]
})
export class UtilModule { }
