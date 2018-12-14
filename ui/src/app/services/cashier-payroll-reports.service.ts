import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'environments/environment'
import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CashierPayrollReportsService {

  constructor(private http: HttpClient) { }

  public retrieve() {
    return this.http.get<any>(environment.REPORTS_URL.concat('registerPayrollReports'))
    .pipe(map(data => {
      
        return data;
    }))
  }

  public make(data) {

  }

  public modify(data, id) {

  }

  public reporting(data) {
    return this.http.post(environment.REPORT_SERVER.concat('reports/pdf'), data, {
      responseType: "blob",
      headers: new HttpHeaders().append("Content-Type", "application/json")
    });
  }
}
