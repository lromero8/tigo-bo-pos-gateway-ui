
import { Injectable, Injector } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpResponse, HttpInterceptor, HttpErrorResponse, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { map } from 'rxjs/operators';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Injectable({
  providedIn: 'root'
})

export class RefreshTokenService {

  public minute: number;
  public second: number;
  public tokenLife: number;

  constructor(
    private http: HttpClient,
    private injector: Injector,
    private _router: Router,
  ) {
    this.second = 1000; // Milisecongs
    this.minute = this.second * 60 ;
    this.tokenLife = Number(localStorage.getItem('tokenLife'));
  }

  public getNewToken() {
    return this.http.get<any>(environment.SSO_URL.concat('/refresh'))
      .pipe(map(data => {
        return data;
      }));
  }

  /**
   *
   * @param tokenLife
   */
  public setNewToken() {
    if (this.tokenLife > 1) {
      if (localStorage.getItem('logout') === 'yes') {
        console.log('on sign in, ');
      } else {
        console.log('on other page');
        setInterval(() => {

          this.getNewToken().subscribe(
            data => {
              if (data.parameters) {
                localStorage.setItem('token', data.parameters.token)
              }
            },
            error => {
              console.log('no setted new token ');
            }
          )

        }, this.setUpTime(this.tokenLife));
      }
     } else {
       if(environment.production) {
        console.error('Ese valor no puede ser usado');
       }
     }
  }

  /**
   * @description
   * Set time for get new token
   * @param time
   */
  public setUpTime(time: number): number {
    return (( time / 60 )  * this.minute) - ( Number(environment.REMANIG_TIME_FOR_GET_NEW_TOKEN) * this.second);
  }

}
