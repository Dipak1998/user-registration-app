import { Router, NavigationStart } from "@angular/router";
import { Injectable, ViewChild } from "@angular/core";
import { Observable, Subject, BehaviorSubject, Observer } from "rxjs";
import { HttpClient } from '@angular/common/http';
import { environment } from "src/environments/environment";

@Injectable()
export class UserService {


  apiUrl:string = environment.apiUrl + 'api';

  constructor(
    private router: Router,
    private http: HttpClient
  ) { }


  logoutOnExpiry() {
    this.logout();
    this.router.navigate(['login']);
  }


  getToken() {
    return localStorage.getItem("token");
  }
  getSessionExpiry() {
    return this.getTokenPayload()["exp"];
  }
  getDataFromToken(key: any) {
    return this.getTokenPayload()[key];
  }

  // Fetch user profile data
  getProfile(): Observable<any> {
    // In a real application, you may need to pass the user ID or a token for authentication
    return this.http.get(`${this.apiUrl}/profile`);
  }

  // Update user profile data
  updateProfile(updatedProfileData: any): Observable<any> {
    // In a real application, you may need to pass the user ID or a token for authentication
    return this.http.put(`${this.apiUrl}/profile`, updatedProfileData);
  }

  // check if the expiration of token is valid.
  validateSession() {
    // return true;
    if (localStorage?.getItem("token")) {
      let timeStamp = this.getDataFromToken("exp") * 1000;
      var diff = parseInt(localStorage?.getItem("timeDiff") ?? '0', 10);
      let now = Date.now();
      let boolean: boolean = timeStamp > now;
      return boolean;
    } else {
    
      return false;
    }
  }

  // remove the user meta data in the local storage
  resetSession() {
    localStorage.removeItem("token");
    //console.log(this.getRole());
  }

  public reloadOnLogout: any;

  logout(
    reload: boolean = true) {
  
    // reset the session
    this.resetSession();

    if (reload) {
      setTimeout(function () {
        window.location.replace('/login');
        // window.location.reload();
      });
    }
  }


  // get the payload from JWT   -- header.payload.signature
  getTokenPayload() {
    if (localStorage.getItem("token")) {
      // get the part of the token which can be base 64 decoded
      let payload = localStorage?.getItem("token")?.split(".")[1];
      // decode the payload
      let decoded = this.b64DecodeUnicode(payload);
      let parsed = JSON.parse(decoded);
      return parsed;
    } else {
      return false;
    }
  }


  // method to base64 decode the token to get decoded text ( should work with unicode text also )
  b64DecodeUnicode(str: any) {
    return decodeURIComponent(
      atob(str)
        .split("")
        .map(function (c) {
          return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
        })
        .join("")
    );
  }

  b64EncodeUnicode(str: any) {
    return btoa(
      encodeURIComponent(str).replace(/%([0-9A-F]{2})/g, function (match, p1) {
        return String.fromCharCode(<any>"0x" + p1);
      })
    );
  }
}