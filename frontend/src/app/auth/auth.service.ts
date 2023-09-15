import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClientService } from '../services/http-client.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {


  constructor(private httpClientService: HttpClientService) {}

  register(user: any): Observable<any> {
    const method = "POST"
    return this.httpClientService.request(method,'auth/register', user);
  }

  login(payload:{email:string,password:string}): Observable<any> {
    const method = "POST"
    return this.httpClientService.request(method,'auth/login', payload);
  }
  isValidUser():boolean{
    return localStorage?.getItem('token') ? true :  false
  }
}
