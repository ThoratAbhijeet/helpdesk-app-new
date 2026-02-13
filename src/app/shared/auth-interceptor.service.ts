import { AuthService } from './../components/auth/auth.service';
import { Injectable } from "@angular/core";
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { catchError, finalize, Observable, Subscription, throwError, timer } from "rxjs";
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { SharedService } from './shared.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  private httpHeaders = new HttpHeaders({
    'Content-Type': 'application/json'
  });
user_id:any;
 private logoutTimer!: Subscription;
  constructor(private _authService: AuthService, private _router: Router, private _toastrService: ToastrService, private _sharedService: SharedService) { }

  startSessionTimer() {
    const expiresIn = Number(localStorage.getItem('expiresIn')); // seconds

    if (!expiresIn) return;
    const timeout = (expiresIn - 10) * 1000;

    this.logoutTimer = timer(timeout).subscribe(() => {
      this.autoLogout();
    });
  }
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = this._authService.getToken();
    // const loggedUserId:any = this._authService.getLoggedUserId();


    if (token && this._authService.isAuthenticated()) {
      this._sharedService.setLoading(true);
      const cloned = request.clone({
        headers: this.httpHeaders.append("Authorization", "Bearer " + token),
        // params: request.params.set("logged_user_id", loggedUserId)
      });

      return next.handle(cloned).pipe(
        finalize(() => {
          this._sharedService.setLoading(false);
         }),
        catchError((err) => this.handleAuthError(err))
        
      );
    } else {
      return next.handle(request).pipe(
        finalize(() => {
          this._sharedService.setLoading(false); 
        }),
        catchError((err) => this.handleAuthError(err))
      );
    }
  }

  private handleAuthError(err: HttpErrorResponse): Observable<any> {
    console.log(err);
    this._toastrService.clear();
    this._sharedService.setLoading(false);
    if (err.error.status == 401) {
      this._router.navigate(['']);
      this._toastrService.warning("Session Expired..!!!");
      this.Logout();
      localStorage.setItem('isLogin', 'false');
      this._sharedService.setIsLogin(false);
    }
    return throwError(err);
  }
   Logout() {
      let userData = localStorage.getItem('data');
    this.user_id = userData ? JSON.parse(userData).user_id : null;
    const data = {
      user_id: this.user_id,
      status: 'session_expired'
    };
    if (data) {
      this._authService.Logout(data).subscribe({
        next: (res: any) => {
          if (res.status == 201 || res.status == 200) {
            localStorage.clear();
            this._router.navigate(['']);
          } 
        },
        
      })
    }
  }
   autoLogout() {
    let userData = localStorage.getItem('data');
    let session_id = localStorage.getItem('session_id');

    const user_id = userData ? JSON.parse(userData).user_id : null;

    const data = {
      user_id: user_id,
      session_id: session_id,
      status: 'session_expired'
    };
    if (data) {
      this._authService.Logout(data).subscribe({
        next: (res: any) => {
          if (res.status == 201 || res.status == 200) {
            localStorage.clear();
            this._router.navigate([''])
            this._sharedService.setLoading(false);
          } else {
            this._toastrService.warning(res.message)
          }
        },
        error: (err: any) => {
          this._sharedService.setLoading(false);
          if (err.error.status == 422) {
            this._toastrService.warning(err.error.message)
          } else {
            this._toastrService.error('Internal Server Error')
          }
        }
      })
    }
  }
}
