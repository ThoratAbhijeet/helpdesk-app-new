import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Observable, Subscription } from 'rxjs';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { SharedService } from '../../../shared/shared.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.scss'
})
export class ForgotPasswordComponent implements OnInit {
  form!: FormGroup;
  isSubmitted = false;
  verifyemail = true;
  forgotpassword = false;
  verificationStatus: 'none' | 'success' | 'error' = 'none';
  otpComplete: boolean = false;
  otp: string = '';
  newpassword: string = '';
  confirmpassword: string = '';
  remainingTime: number = 300;
  timerSubscription: Subscription = new Subscription();;
  passwordVisible: boolean = false;
  confirmpasswordVisible: boolean = false;
  constructor(private fb: FormBuilder, private _toastrService: ToastrService, private _authSerivce: AuthService, private router: Router, private _sharedService: SharedService
  ) { }
  ngOnInit(): void {
    this.createForm();
    this.startTimer();
    localStorage.clear();

  }

  createForm() {
    this.form = this.fb.group({
      email_id: ['', [
        Validators.required,
        Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.(com|in|org|net|edu|gov)$/)
      ]],

    });
  }
  get controls() {
    return this.form.controls;
  }
  //verify email
  VerifyEmail() {
    let data = this.form.value;
    if (this.form.valid) {
      this._sharedService.setLoading(true)
      this._authSerivce.verifyEmail_id(data).subscribe({
        next: (res: any) => {
          if (res.status === 200 || res.status === 201) {
            this._toastrService.clear();
            this.verificationStatus = 'success'; // Set status to success
            this.verifyemail = true;
            this._sharedService.setLoading(false)
          } else {
            this.verificationStatus = 'error'; // Set status to error
            this._toastrService.warning(res.message);
          }
        },
        error: (err: any) => {
          this.verificationStatus = 'error'; // Set status to error
          if (err.error.status === 401 || err.error.status === 422) {
            this._toastrService.warning(err.error.message);
          } else {
            this._toastrService.error('Internal Server Error');
          }
          this._sharedService.setLoading(false)
        }
      });
    } else {
      this.form.markAllAsTouched();
      this._toastrService.warning('Fill required fields');
    }
  }
  //send otp
  sendOTP() {
    let data = this.form.value;
    this.VerifyEmail();
    if (this.form.valid) {
      this._sharedService.setLoading(true)
      this._authSerivce.sendOTP(data).subscribe({
        next: (res: any) => {
          if (res.status === 200 || res.status === 201) {
            this._toastrService.clear();
            this.verificationStatus = 'success';
            this._toastrService.success(res.message);
            this.verifyemail = false;
            this.startTimer();
            this._sharedService.setLoading(false)
          } else {
            this.verificationStatus = 'error';
            this._toastrService.warning(res.message);
          }
        },
        error: (err: any) => {
          this.verificationStatus = 'error';
          if (err.error.status === 401 || err.error.status === 422) {
            this._toastrService.warning(err.error.message);
          } else {
            this._toastrService.warning(err.error.message);
          }
          this._sharedService.setLoading(false)
        }
      });
    } else {
      this.form.markAllAsTouched();
      this._toastrService.warning('Fill required fields');
    }
  }
  //after fill otp then change btn verify
  onOtpChange(otp: string): void {
    this.otp = otp.replace(/\D/g, '');
    this.otpComplete = otp.length === 6;
    this.otp = otp;
  }
  //only allow number
  onKeyDown(event: KeyboardEvent): void {
    // Only allow number keys and the Backspace key
    const allowedKeys = ['Backspace', 'ArrowLeft', 'ArrowRight'];

    // If the key pressed is not a number or one of the allowed keys, prevent the input
    if (!event.key.match(/^\d$/) && !allowedKeys.includes(event.key)) {
      event.preventDefault();
    }
  }
  //verify otp
  verifyOTP() {
    if (this.form.valid && this.otp) {
      const data = {
        otp: this.otp,
        email_id: this.form.value.email_id
      };
      this._sharedService.setLoading(true)
      this._authSerivce.verifyOTP(data).subscribe({
        next: (res: any) => {
          if (res.status === 200 || res.status === 201) {
            this._toastrService.clear();
            this.verificationStatus = 'success';
            this._toastrService.success(res.message);
            this.verifyemail = false;
            this.forgotpassword = true;
            this._sharedService.setLoading(false)
          } else {
            this.verificationStatus = 'error';
            this._toastrService.warning(res.message);
          }
        },
        error: (err: any) => {
          this.verificationStatus = 'error';
          if (err.error.status === 401 || err.error.status === 422) {
            this._toastrService.warning(err.error.message);
          } else {
            this._toastrService.warning(err.error.message);
          }
          this._sharedService.setLoading(false)
        }
      });
    } else {
      this.form.markAllAsTouched();
      this._toastrService.warning('Fill required fields');
    }
  }
  // new password  fill
  onnewpassword(event: Event): void {
    this.newpassword = (event.target as HTMLInputElement).value;
  }
  //create confirm password
  onconfirmpassword(event: Event): void {
    this.confirmpassword = (event.target as HTMLInputElement).value;
  }
  //forgot Password new password create
  forgotPassword() {
    if (this.form.valid && this.otp) {
      const data = {
        email_id: this.form.value.email_id,
        newPassword: this.newpassword,
        confirmPassword: this.confirmpassword
      };
      this._sharedService.setLoading(true)
      this._authSerivce.forgotPassword(data).subscribe({
        next: (res: any) => {
          if (res.status === 200 || res.status === 201) {
            this._toastrService.clear();
            this.verificationStatus = 'success';
            this._toastrService.success(res.message);
            this.verifyemail = false;
            this.router.navigateByUrl('/auth');
            this.forgotpassword = false;
          } else {
            this.verificationStatus = 'error';
            this._toastrService.warning(res.message);
          }
        },
        error: (err: any) => {
          this.verificationStatus = 'error';
          if (err.error.status === 401 || err.error.status === 422) {
            this._toastrService.warning(err.error.message);
          } else {
            this._toastrService.warning(err.error.message);
          }
          this._sharedService.setLoading(false)
        }
      });
    } else {
      this.form.markAllAsTouched();
      this._toastrService.warning('Fill required fields');
    }
  }
  //password show and hide
  togglePasswordVisibility() {
    this.passwordVisible = !this.passwordVisible;
  }
  //confirm password cisible
  togglePasswordVisibilityConfirm() {
    this.confirmpasswordVisible = !this.confirmpasswordVisible;
  }
  ngOnDestroy(): void {
    if (this.timerSubscription) {
      this.timerSubscription.unsubscribe();
    }
  }
  startTimer() {
    this.timerSubscription = new Subscription();
    this.timerSubscription = new Observable(observer => {
      setInterval(() => {
        if (this.remainingTime > 0) {
          this.remainingTime--;
        } else {
          observer.complete();
        }
      }, 1000);
    }).subscribe();
  }
  get formattedTime(): string {
    const minutes = Math.floor(this.remainingTime / 60);
    const seconds = this.remainingTime % 60;
    return `${minutes < 10 ? '0' + minutes : minutes}:${seconds < 10 ? '0' + seconds : seconds}`;
  }

}

