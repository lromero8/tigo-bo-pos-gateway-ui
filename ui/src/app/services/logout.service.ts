import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'environments/environment'
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LogoutService {

  constructor(private http: HttpClient) { }

  public logOut() {
    return this.http.get<any>(environment.SSO_URL.concat('/logout') )
      .pipe(map(data => {
        return data;
    }));
  }
}
