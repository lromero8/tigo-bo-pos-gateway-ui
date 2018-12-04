import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'environments/environment'
import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PaymentOptionsService {

  constructor(private http: HttpClient) { }

  /**
   * 
   */
  public getCurrencies() {
    return this.http.get<any>(environment.SETUPS_URL.concat('currencies'))
    .pipe(map(data => {
      
        return data;
    }));
  }

  public editCurrency() {

  }

  public newCurrency() {

  }

  /**
   * 
   */
  public getBanks() {
    return this.http.get<any>(environment.SETUPS_URL.concat('banks'))
    .pipe(map(data => {
      
        return data;
    }));
  }

  public editBank() {

  }

  public newBank() {

  }

  /**
   * 
   */
  public getCollectors() {

  }

  public editCollector() {

  }

  public newCollector() {

  }


  /**
   * 
   */
  public getCards() {
    return this.http.get<any>(environment.SETUPS_URL.concat('cards'))
    .pipe(map(data => {
      
        return data;
    }));
  }

  public editCard() {

  }

  public newCard() {

  }
}
