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

}
