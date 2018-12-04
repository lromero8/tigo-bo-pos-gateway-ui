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

  public newCurrency(data) {
    return this.http.post<any>(environment.SETUPS_URL.concat('currencies'), data)
    .pipe(map(data => {
      
        return data;
    }));
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

  public newBank(data) {
    return this.http.post<any>(environment.SETUPS_URL.concat('banks'), data)
    .pipe(map(data => {
      
        return data;
    }));
  }

  /**
   * 
   */
  public getCollectors() {

  }

  public editCollector() {

  }

  public newCollector(data) {
    
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

  public newCard(data) {
    return this.http.post<any>(environment.SETUPS_URL.concat('cards'), data)
    .pipe(map(data => {
      
        return data;
    }));
  }
}
