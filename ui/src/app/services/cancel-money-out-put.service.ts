import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'environments/environment'
import { DateService } from '../services/date.service'
import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CancelMoneyOutPutService {

  public startDate: any = '';
  public endDate: any = '';



  constructor(private http: HttpClient, private dateService: DateService) { }

  public search(transactionId:any, reason:any, paymentDate:any) {


  	// alert("entro al servicio")

  	// console.log(transactionId)
  	// console.log(reason == ''|| reason == null?'es vacio':'no es vacio')
  	// console.log(paymentDate == ''? 'es vacio' : 'no es vacio')


  	let query = "1=1"
  	query += transactionId == '' || transactionId == null? '' : '&transactionId=' + transactionId
  	query += reason == '' || reason == null? '' : '&reason=' + reason


  	if (paymentDate != null && paymentDate != '') { 
	  	this.startDate = this.dateService.changeFormat(paymentDate[0])
	  	this.endDate = this.dateService.changeFormat(paymentDate[1])  

	  	if (this.startDate == this.endDate) { 
	  		// console.log("Dates are the same")
		  	query += this.startDate == '' || this.startDate == null? '' : '&paymentDate=' + this.startDate

	  	} else {
	  		// console.log("Dates are different")
		  	query += this.startDate == '' || this.startDate == null? '' : '&paymentDate_gte=' + this.startDate + '&paymentDate_lte=' + this.endDate
	  	}

  	}



  	console.log('http://localhost:9090/cancelMoneyOutPut?'+ query)

    
    return this.http.get<any>('http://localhost:9090/cancelMoneyOutPut?' + query)
        .pipe(map(data => {
          
            return data;
        }));
  }

}
