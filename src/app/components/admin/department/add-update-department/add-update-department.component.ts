import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AdminService } from '../../admin.service';
import { SharedService } from '../../../../shared/shared.service';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-add-update-department',
  templateUrl: './add-update-department.component.html',
  styleUrl: './add-update-department.component.scss'
})
export class AddUpdateDepartmentComponent implements OnInit {
  isEdit = false
  form!: FormGroup
  department_id: any
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
     this.department_id = this.url.snapshot.params['id'];
    //activate route get employee id
    if (this.department_id) {
      this.getDepartmentById(this.department_id);
      this.isEdit = true
    }
  }
  //create form
  createForm() {
    this.form = this.fb.group({
      department_name: ['', Validators.required],
      description: [''],
    })
  }
  get control() {
    return this.form.controls
  }
  submit() {
    this.isEdit ? this.editDepartment() : this.addDepartment()
  }
  //update Department
  editDepartment() {
    let data = this.form.getRawValue()
    if (this.form.valid) {
      this._sharedService.setLoading(true);
      this._adminService.editDepartment(this.department_id, data).subscribe({
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
  //add Department
  addDepartment() {
    let data = this.form.value;
    if (this.form.valid) {
      this._sharedService.setLoading(true);
      this._adminService.addDepartment(data).subscribe({
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
  //get Department by id
  getDepartmentById(id: any) {
    this._adminService.getDepartmentById(id).subscribe({
      next: (result: any) => {
        const data = result.data;
        this.control['department_name'].patchValue(data.department_name)
        this.control['description'].patchValue(data.description)

      }
    })

  }
   goToback() {
    this.location.back();
  }
}