import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputErrorMessagesComponent } from './input-error-messages/input-error-messages.component';
import { UploadComponent } from './upload/upload.component'
import { FilterPipe } from './pipes/filter.pipe'
import { OnlyNumber } from './directives/onlynumber.directive';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import { ArchwizardModule } from 'angular-archwizard';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
  ],
  declarations: [InputErrorMessagesComponent,UploadComponent,FilterPipe, OnlyNumber, ],
  exports:[InputErrorMessagesComponent,UploadComponent,FilterPipe, OnlyNumber, OwlDateTimeModule, 
    OwlNativeDateTimeModule, ArchwizardModule, ReactiveFormsModule, FormsModule]
})
export class UtilModule { }
