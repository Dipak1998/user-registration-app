import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HttpClientService {

  baseUrl:string = environment.apiUrl + 'api/';
  constructor(private httpClient: HttpClient) { }

  private addTokenToHeaders(headers: HttpHeaders): HttpHeaders {
    const token = localStorage.getItem('token'); // Replace 'token' with your actual token key
    if (token) {
      return headers.set('Authorization', `Bearer ${token}`);
    }
    return headers;
  }

  public request<T>(
    method: string,
    url: string,
    data?: any,
    customHeaders?: HttpHeaders,
    customParams?: HttpParams
  ): Observable<T> {
    let headers = new HttpHeaders();
    let params = new HttpParams();
    let apiUrl = this.baseUrl+url;
    // Customize headers
    if (customHeaders) {
      headers = customHeaders;
    } else {
      headers = this.addTokenToHeaders(headers);
    }

    // Customize params
    if (customParams) {
      params = customParams;
    }

    const requestOptions = {
      headers: headers,
      params: params
    };

    switch (method) {
      case 'GET':
        return this.httpClient.get<T>(apiUrl, requestOptions);
      case 'POST':
        return this.httpClient.post<T>(apiUrl, data, requestOptions);
      case 'PUT':
        return this.httpClient.put<T>(apiUrl, data, requestOptions);
      case 'DELETE':
        return this.httpClient.delete<T>(apiUrl, requestOptions);
      default:
        throw new Error('Invalid HTTP method');
    }
  }
}
