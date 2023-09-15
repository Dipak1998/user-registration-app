import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpHeaders
} from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<any>, next: HttpHandler) {
    const token = localStorage.getItem('token'); // Replace 'token' with your actual token key

    if (token) {
      // Clone the request and add the token to the headers
      const headers = new HttpHeaders({
        'x-access-token': `${token}`
      });
      const clonedRequest = request.clone({ headers });

      return next.handle(clonedRequest);
    }

    // If there is no token, proceed with the original request
    return next.handle(request);
  }
}
