import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'environments/environment'
import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SmallRechargePaymentService {

  constructor(private http: HttpClient) { }

  getContracts(nContract, nIdentification, nAccount) {
    return this.http.get<any>('http://localhost:3000/contracts')
      .pipe(
        map(data => {
          return data;
        })
      );
  }
}
