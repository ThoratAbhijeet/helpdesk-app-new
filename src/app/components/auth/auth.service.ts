import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
 //api
 url = environment.baseUrl;
 httpHeaders = new HttpHeaders({
   'Content-Type': 'application/json',
 });
  constructor(private http: HttpClient) { }

      //login
      login(data: any): Observable<any> {
        return this.http.post(this.url + 'api/user/login', data, {
          headers: this.httpHeaders,
        });
      }
  public isAuthenticated(): boolean {
    return this.getToken() !== null;
  }
  getToken() {
    let accessToken = localStorage.getItem('accessToken');
    if (accessToken != null) {
      return accessToken;
    }
    return null;
  }
  //Change password
changePassword(data: any): Observable<any> {
  return this.http.put(this.url + 'api/user/change-password', data);
}
 //verify email_id
 verifyEmail_id(data: any): Observable<any> {
  return this.http.post(this.url + 'api/user/check-emailid', data);
}
//send otp
sendOTP(data: any): Observable<any> {
  return this.http.post(this.url + 'api/user/send-otp', data);
}
//verify otp
verifyOTP(data: any): Observable<any> {
  return this.http.post(this.url + 'api/user/verify-otp', data);
}
//forget password
forgotPassword(data: any): Observable<any> {
  return this.http.post(this.url + 'api/user/forgot-Password', data);
}
//verify email_id sign up
sendOTPIfEmailNotExist(data: any): Observable<any> {
  return this.http.post(
    this.url + 'api/user/send-otp-if-email-not-exists',
    data
  );
}
//add sign up
  addSignUp(data: any): Observable<any> {
    return this.http.post(this.url + 'api/user/signup', data);
  }
   //verify domain
  verifyDomain(data: any): Observable<any> {
    return this.http.post(this.url  + 'api/user/domain-check', data);
  }
     //verify domain
  MatchDomain(data: any): Observable<any> {
    return this.http.post(this.url  + 'api/user/match', data);
  }
}