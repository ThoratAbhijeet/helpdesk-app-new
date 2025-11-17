import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AdminService } from '../../../admin/admin.service';
import { SharedService } from '../../../../shared/shared.service';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-add-update-service',
  templateUrl: './add-update-service.component.html',
  styleUrl: './add-update-service.component.scss'
})
export class AddUpdateServiceComponent implements OnInit {
  isEdit = false
  form!: FormGroup
  service_id: any
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
     this.service_id = this.url.snapshot.params['id'];
    //activate route get employee id
    if (this.service_id) {
      this.getserviceById(this.service_id);
      this.isEdit = true
    }
  }
  //create form
  createForm() {
    this.form = this.fb.group({
      service_name: ['', Validators.required],
      description: [''],
    })
  }
  get control() {
    return this.form.controls
  }
  submit() {
    this.isEdit ? this.editservice() : this.addservice()
  }
  //update service
  editservice() {
    let data = this.form.getRawValue()
    if (this.form.valid) {
      this._sharedService.setLoading(true);
      this._adminService.editServices(this.service_id, data).subscribe({
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
  //add service
  addservice() {
    let data = this.form.value;
    if (this.form.valid) {
      this._sharedService.setLoading(true);
      this._adminService.addServices(data).subscribe({
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
  //get service by id
  getserviceById(id: any) {
    this._adminService.getServicesById(id).subscribe({
      next: (result: any) => {
        const data = result.data;
        this.control['service_name'].patchValue(data.service_name)
        this.control['description'].patchValue(data.description)

      }
    })

  }
   goToback() {
    this.location.back();
  }
}