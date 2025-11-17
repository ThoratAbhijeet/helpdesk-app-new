import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SharedService } from '../../../shared/shared.service';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {
  LoginForm!: FormGroup;
  password: string = '';
  passwordVisible: boolean = false;
  isSubmitted = false

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private _authService: AuthService,
    private _toastrService: ToastrService,
    private _sharedService: SharedService
  ) {
  }

  ngOnInit(): void {
    this.createForm();
    localStorage.clear();
  }
  createForm() {
    this.LoginForm = this.fb.group({
      email_id: ['', [
        Validators.required,
        Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.(com|in|org|net|edu|gov)$/)
      ]],
      password: [null, Validators.required]
    });

  }

  get controls() {
    return this.LoginForm.controls;
  }

  login() {
    this.isSubmitted = true;// Set isSubmitted to true when the login process starts.
    let data = this.LoginForm.value;
    localStorage.clear();
    if (this.LoginForm.valid) {
      this._sharedService.setLoading(true)
      this._authService.login(data).subscribe({
        next: (res: any) => {
          localStorage.setItem('accessToken', res.token);
          localStorage.setItem("user_id", res.data.user_id);
          localStorage.setItem("first_name", res.data.first_name);
          localStorage.setItem("last_name", res.data.last_name);
          localStorage.setItem("mobile_number", (res.data.mobile_number));
          localStorage.setItem("designation_id", res.data.designation_id);
          localStorage.setItem("email_id", res.data.email_id);
          // localStorage.setItem("role_name", res.data.role_name);
          localStorage.setItem('expiresIn', res.expiresIn);
          localStorage.setItem('isLogin', 'true');
          if (res.status == 200 || res.status == 201) {
            localStorage.setItem('data', JSON.stringify(res.data));
            this._toastrService.clear();
            if (res.data.role_id == 1) {
              this.router.navigate(['/customer', { outlets: { customer_menu: 'customer-dashboard' } }]);
            } else if (res.data.role_id == 2) {
              this.router.navigate(['/developments', { outlets: { development_menu: 'development-dashboard' } }]);
            }
            else if (res.data.role_id == 3) {
              this.router.navigate(['/employee', { outlets: { employee_menu: 'employee-dashboard' } }]);
            }
            //  else if (res.data.role_id == 4) {
            //   this.router.navigate(['/manager', { outlets: { manager_menu: 'manager-dashboard' } }]);
            // }
            else if (res.data.role_id == 5) {
              this.router.navigate(['/super', { outlets: { super_menu: 'super-admin-dashboard' } }]);
            }
            else {
              // this.router.navigate(['/user', { outlets: { user_menu: 'user-dashboard' } }]);
              this.router.navigate(['']);
              this._toastrService.warning('Unauthorized');
            }
            this._sharedService.setLoading(false)
            this._toastrService.success(res.message);

          } else {
            this._toastrService.warning(res.message);
          }
        },
        error: (error: any) => {

          if (error.error.status == 422) {
            this._toastrService.warning(error.error.message);
          } else {
            this._toastrService.error(error.error.message);

          }
        },
      })

    } else {
      this.LoginForm.markAllAsTouched();
      this._toastrService.warning('Please fill required fields');
    }
  }
  //password show and hide
  togglePasswordVisibility() {
    this.passwordVisible = !this.passwordVisible;
  }
}
