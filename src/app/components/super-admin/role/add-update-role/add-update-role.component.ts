import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { SharedService } from '../../../../shared/shared.service';

import { ToastrService } from 'ngx-toastr';
import { AdminService } from '../../../admin/admin.service';

@Component({
  selector: 'app-add-update-role',
  templateUrl: './add-update-role.component.html',
  styleUrl: './add-update-role.component.scss'
})
export class AddUpdateRoleComponent implements OnInit {
  isEdit = false
  form!: FormGroup
  role_id: any
  constructor(
    private fb: FormBuilder,
    private _toastrService: ToastrService,
    private _adminService: AdminService,
    private _sharedService: SharedService,
        private url: ActivatedRoute,
    private location: Location,
  ) { }
  ngOnInit(): void {
    this.createForm()
     this.role_id = this.url.snapshot.params['id'];
    //activate route get employee id
    if (this.role_id) {
      this.getroleById(this.role_id);
      this.isEdit = true
    }
  }
  //create form
  createForm() {
    this.form = this.fb.group({
      role_name: ['', Validators.required],
      description: [''],
    })
  }
  get control() {
    return this.form.controls
  }
  submit() {
    this.isEdit ? this.editrole() : this.addrole()
  }
  //update role
  editrole() {
    let data = this.form.getRawValue()
    if (this.form.valid) {
      this._sharedService.setLoading(true);
      this._adminService.editRole(this.role_id, data).subscribe({
        next: (res: any) => {
          if (res.status == 200) {
            this._toastrService.success(res.message)
            this.goToback();
          } else {
            this._toastrService.warning(res.message)
          }
          this._sharedService.setLoading(false);
        },
        error: (err: any) => {
          this._sharedService.setLoading(false);
          if (err.error.status == 401 || err.error.status == 422) {
            this._toastrService.warning(err.error.message)
          } else {
            this._toastrService.error('Internal Server Error')
          }

        }
      })
    } else {
      this.form.markAllAsTouched()
      this._toastrService.warning('Fill required fields')
    }
  }
  //add role
  addrole() {
    let data = this.form.value;
    if (this.form.valid) {
      this._sharedService.setLoading(true);
      this._adminService.addRole(data).subscribe({
        next: (res: any) => {
          if (res.status == 201 || res.status == 200) {
            this._toastrService.success(res.message)
            this.goToback();
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
      this.form.markAllAsTouched()
      this._toastrService.warning('Fill required fields')
    }
  }
  //get role by id
  getroleById(id: any) {
    this._adminService.getRoleById(id).subscribe({
      next: (result: any) => {
        const data = result.data;
        this.control['role_name'].patchValue(data.role_name)
        this.control['description'].patchValue(data.description)

      }
    })

  }
   goToback() {
    this.location.back();
  }
}