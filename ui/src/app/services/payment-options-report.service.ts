import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'environments/environment'
import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PaymentOptionsReportService {

  constructor(private http: HttpClient) { }

  public retrieve() {
    return this.http.get<any>(environment.REPORTS_URL.concat('paymentOptionsReport'))
    .pipe(map(data => {
      
        return data;
    }))
  }

  public make(data) {

  }

  public modify(data, id) {

  }


}
