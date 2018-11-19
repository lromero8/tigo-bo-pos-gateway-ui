import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'environments/environment'
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class MenuRestService {

  constructor(private http: HttpClient) { }

  public  getMenu(rol) {
     return this.http.get<any>(environment.LOG_URL.concat('menu/', rol))
         .pipe(map(data => {
             return data.parameters;
    }));
  }
}
