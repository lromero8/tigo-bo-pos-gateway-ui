import { Injectable, Injector } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpResponse, HttpInterceptor, HttpErrorResponse, HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { tap } from 'rxjs/operators';
import { environment } from '../../environments/environment'
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class TokenInterceptorService implements HttpInterceptor {
  constructor(private injector: Injector, private http: HttpClient, private _router: Router) { }

  handleError(err: HttpErrorResponse): Observable<any> {
    let errorMsg;
    if (err.error instanceof Error) {
      errorMsg = `An error occurred: ${err.error.message}`;
    } else {
      errorMsg = `Backend returned code ${err.status}, body was: ${err.error}`;
    }
    if (err.status === 401 || err.status === 403) {
      this.injector.get(Router).navigateByUrl(`/login`);
    }
    console.error(environment.UNAUTHORIZED);
    return Observable.throw(errorMsg);
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (localStorage.getItem('token')) {
      const token = localStorage.getItem('token');
      request = request.clone({
        setHeaders: {
          authorization: token
        }
      });
    }

    return next.handle(request).pipe(
      tap(event => {
        if (event instanceof HttpResponse) {

        }
      }, error => {
        this.handleError(error)
      })
    )
  }

  public getNewToken() {
    return this.http.get<any>(environment.SSO_URL.concat('/refresh'))
         .pipe(map(data => {
             return data;
    }));
  }
}
