import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'environments/environment'
import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CancelOnDemandService {

  constructor(private http: HttpClient) { }

  public search(numFactura:any, numCuenta:any, numContrato:any, numIdCliente:any) {

  	let query = "1=1"
  	query += numFactura == '' || numFactura == null? '' : '&billNumber=' + numFactura
  	query += numCuenta == '' || numCuenta == null? '' : '&accountNumber=' + numCuenta
  	query += numContrato == '' || numContrato == null? '' : '&contractNumber=' + numContrato
  	query += numIdCliente == '' || numIdCliente == null? '' : '&clientId=' + numIdCliente

  	console.log('http://localhost:9090/cancelOnDemand?'+ query)

    
    return this.http.get<any>('http://localhost:9090/cancelOnDemand?' + query)
        .pipe(map(data => {
          
            return data;
        }));
  }

}
