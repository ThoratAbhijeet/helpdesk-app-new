import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { ToastrService } from 'ngx-toastr';
import { SharedService } from '../../../shared/shared.service';
import { Location } from '@angular/common';
import { AdminService } from '../../admin/admin.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.scss'
})
export class SignUpComponent implements OnInit {
  isEdit = false;
  isCustomerEditable = true;
  verifyemail = false;
    verificationStatus: 'none' | 'success' | 'error' = 'none';
      otp: string = '';
      remainingTime: number = 300;
       otpComplete: boolean = false;
  UserForm!: FormGroup;
  User_Id: any;
  user_ID :any;
  countryCode: string = '';
  private domainInputTimeout: any;
private timerInterval: any;
  constructor(
    private fb: FormBuilder,
    private _toastrService: ToastrService,
    private _adminService: AdminService,
    private _sharedService: SharedService,
    private url: ActivatedRoute,
    private location: Location,
    private _authService: AuthService,
    private router: Router
  ) { }
  ngOnInit(): void {
        const data = localStorage.getItem('data');
    this.user_ID = data ? JSON.parse(data)?.user_id : null;
    this.createForm();
    this.User_Id = this.url.snapshot.params['id'];


  }
   onPhoneInput(value: string) {
    const phonePattern = /^[0-9]{10}$/;
  }
  //employee form
  createForm() {
    this.UserForm = this.fb.group({
      user_name: ['', Validators.required],
      email_id: ['', [Validators.required, Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.(com|in|org|net|edu|gov)$/)]],
      phone_number: ['', [Validators.required, Validators.pattern('^((\\+91-?)|0)?[0-9]{10}$')]],
      domain: ['', Validators.required],
    })

  }
  get controls() {
    return this.UserForm.controls
  }
onDomainInput(event: Event) {
  const input = event.target as HTMLInputElement;
  const value = input.value;

  // Clear any previous timeout
  clearTimeout(this.domainInputTimeout);

  // Wait 1 second after user stops typing, then call API
  this.domainInputTimeout = setTimeout(() => {
    if (value && value.trim() !== '') {
      this.VerifyMobileNo(value); // call your API or method here
    }
  }, 1000); // adjust delay as needed (1000ms = 1s)
}
    //verify mob no
  VerifyMobileNo(domain: string) {
    this._sharedService.setLoading(true);
    this._authService.verifyDomain({ domain }).subscribe({
      next: (res: any) => {
        if (res.status === 200 || res.status === 201) {
          this._toastrService.clear();
          this._sharedService.setLoading(false);
          this._toastrService.success(res.message);
        } else {
          this._toastrService.warning(res.message);
        }
      },
      error: (err: any) => {
        if (err.error.status === 401 || err.error.status === 422) {
          this._toastrService.warning(err.error.message);
        } else {
          this._toastrService.error('Internal Server Error');
        }
        this._sharedService.setLoading(false);
      }
    });
  }
  // match domain
MatchDomain() {
const payload = {
  email_id: this.UserForm.get('email_id')?.value,
  domain: this.UserForm.get('domain')?.value
};
if (this.UserForm.valid) {
  this._sharedService.setLoading(true);
  this._authService.MatchDomain(payload).subscribe({
    next: (res: any) => {
      this._sharedService.setLoading(false);
       this.verifyemail = true;
       this.startTimer();
      this._toastrService.clear();
      if (res.status === 200 || res.status === 201) {
        this._toastrService.success(res.message);
      } else {
        this._toastrService.warning(res.message);
      }
    },
    error: (err: any) => {
      this._sharedService.setLoading(false);
      if (err.error.status === 401 || err.error.status === 422) {
        this._toastrService.warning(err.error.message);
      } else {
        this._toastrService.error('Internal Server Error');
      }
    }
  
  });
} else {
      this.UserForm.markAllAsTouched()
      this._toastrService.warning('Fill required fields')
    }
}

  //only 10 digit mob. no 
  allowOnlyDigits(event: KeyboardEvent) {
    const charCode = event.which ? event.which : event.keyCode;
    // Allow only digits (0-9)
    if (charCode < 48 || charCode > 57) {
      event.preventDefault();
    }
  }

  //add User
  addUser() {
    let data = this.UserForm.value;
    if (this.UserForm.valid) {
      this._sharedService.setLoading(true);
      this._authService.addSignUp(data).subscribe({
        next: (res: any) => {
          if (res.status == 201 || res.status == 200) {
            this._toastrService.success(res.message)
           
            // this.goToback();
          } else {
            this._toastrService.warning(res.message)
          }
          this._sharedService.setLoading(false);
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
    } else {
      this.UserForm.markAllAsTouched()
      this._toastrService.warning('Fill required fields')
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
    if (this.UserForm.valid && this.otp) {
      const data = {
        otp: this.otp,
        email_id: this.UserForm.value.email_id
      };
      this._sharedService.setLoading(true)
      this._authService.verifyOTP(data).subscribe({
        next: (res: any) => {
          if (res.status === 200 || res.status === 201) {
            this._toastrService.clear();
            this.verificationStatus = 'success';
            this._toastrService.success(res.message);
            this.verifyemail = false;    
             this.addUser()
             this.router.navigateByUrl('/auth');
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
      this.UserForm.markAllAsTouched();
      this._toastrService.warning('Fill required fields');
    }
  }
startTimer() {
  // Clear previous interval if any
  if (this.timerInterval) {
    clearInterval(this.timerInterval);
  }

  // Start countdown
  this.timerInterval = setInterval(() => {
    if (this.remainingTime > 0) {
      this.remainingTime--; // decrease by 1 second
    } else {
      clearInterval(this.timerInterval); // stop when time ends
    }
  }, 1000);
}
 get formattedTime(): string {
    const minutes = Math.floor(this.remainingTime / 60);
    const seconds = this.remainingTime % 60;
    return `${minutes < 10 ? '0' + minutes : minutes}:${seconds < 10 ? '0' + seconds : seconds}`;
  }
ngOnDestroy() {
  // Prevent memory leaks
  if (this.timerInterval) {
    clearInterval(this.timerInterval);
  }
}
  // cancel route location service
  goToback() {
    this.location.back();
  }


}
