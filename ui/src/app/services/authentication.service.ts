import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'environments/environment'
import { MenuRestService } from '../services/menu.rest.service'

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private http: HttpClient, private menu: MenuRestService) { }

  login(username: string, password: string) {
      return this.http.post<any>(environment.SSO_URL.concat('/login'), { user: username, password: password })
          .pipe(map(data => {
              // login successful if there's a jwt token in the response
              if (data.headers.service_code === '0') {
                  // store user details and jwt token in local storage to keep user logged in between page refreshes
                  localStorage.setItem('logout', 'not');
                  localStorage.setItem('token', data.parameters.token);
                  localStorage.setItem('tokenLife', data.parameters.tokenLife); // set token life
                  return data;
              }
              return data;
          }));
  }

  logout() {
      // remove user from local storage to log user out
      localStorage.removeItem('currentUser');
  }
}
