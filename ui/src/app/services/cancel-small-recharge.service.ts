import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'environments/environment'
import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CancelSmallRechargeService {

  constructor(private http: HttpClient) { }
}
