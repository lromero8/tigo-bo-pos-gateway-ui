import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'environments/environment'
import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CancelInAdvanceService {

  constructor(private http: HttpClient) { }

  public mock(request:any) {
    
    return this.http.get<any>('http://localhost:9090/cancelInAdvance',request)
        .pipe(map(data => {
          
            return data;
        }));
  }

  public search(numFactura:any, numCuenta:any, numContrato:any, numIdCliente:any) {

  	// console.log(numFactura)
  	// console.log(numCuenta == ''|| numCuenta == null?'es vacio':'no es vacio')

  	let query = "1=1"
  	query += numFactura == '' || numFactura == null? '' : '&billNumber=' + numFactura
  	query += numCuenta == '' || numCuenta == null? '' : '&accountNumber=' + numCuenta
  	query += numContrato == '' || numContrato == null? '' : '&contractNumber=' + numContrato
  	query += numIdCliente == '' || numIdCliente == null? '' : '&clientId=' + numIdCliente

  	console.log('http://localhost:9090/cancelInAdvance?'+ query)

    
    return this.http.get<any>('http://localhost:9090/cancelInAdvance?' + query)
        .pipe(map(data => {
          
            return data;
        }));
  }  

    public delete(cancelId, invoiceId) {
        // const httpOptions = {
        // headers: new HttpHeaders({ 'Content-Type': 'application/json' }), body: {id: id}}
        return this.http.delete<any>('http://localhost:9090/invoices/' + invoiceId + '?cancelInAdvanceId/' + cancelId )
            .pipe(map(data => {
                return data;
            }));
    }

}
