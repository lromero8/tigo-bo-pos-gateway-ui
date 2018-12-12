import { Injectable } from '@angular/core';
import * as moment from 'moment';



@Injectable({
  providedIn: 'root'
})
export class DateService {

  constructor() { }

  public changeFormat(date) {
    return moment(date).isValid() ? moment(date).format('YYYY-MM-DD') : moment().format('YYYY-MM-DD HH:mm:ss');
  }

  public changeFormatForTables(date) {
    return moment(date).isValid() ? moment(date).format('DD-MM-YYYY') : moment().format('DD-MM-YYYY');
  }

  public validDate(date): boolean {
    return moment(date).isValid();
  }

  // return current date example: 2018-12-31 00:00:00
  public getCurrentDate() {
    return moment().format('YYYY-MM-DD HH:mm:ss');
  }

  // return example: 2018-12
  public getYearMonth(date) {
    return moment(date).isValid() ? moment(date).format('YYYY-MM') : moment().format('YYYY-MM-DD HH:mm:ss');
  }

  public setCustomFormat(date, type_format) {
    return moment(date).isValid() ? moment(date).format(type_format) : moment().format(type_format);
  }
  
  public stringToDate(stringDate, currentFormat, newFormat) {
    return moment(stringDate, currentFormat).format(newFormat);
  }

}
