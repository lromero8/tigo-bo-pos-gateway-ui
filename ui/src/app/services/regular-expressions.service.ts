import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'environments/environment'
import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RegularExpressionsService {

  constructor(private http: HttpClient) { }

  public retrieve(){
    return this.http.get<any>(environment.SETUPS_URL.concat('regularExpressions'))
    .pipe(map(data => {
      
        return data;
    }));
  }
}
