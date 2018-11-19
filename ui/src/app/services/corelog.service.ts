import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CorelogService {

  constructor(private http: HttpClient) { }

  public getResource() {
    return this.http
    .get<any>(environment.LOG_URL.concat('resource'))
    .pipe(
      map(
        data => {
          return data;
        }
      )
    );
  }


}
