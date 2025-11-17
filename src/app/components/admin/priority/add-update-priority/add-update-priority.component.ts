import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AdminService } from '../../admin.service';
import { SharedService } from '../../../../shared/shared.service';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-add-update-priority',
  templateUrl: './add-update-priority.component.html',
  styleUrl: './add-update-priority.component.scss'
})
export class AddUpdatePriorityComponent implements OnInit {
  isEdit = false
  form!: FormGroup
  priority_id: any
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
     this.priority_id = this.url.snapshot.params['id'];
    //activate route get employee id
    if (this.priority_id) {
      this.getpriorityById(this.priority_id);
      this.isEdit = true
    }
  }
  //create form
  createForm() {
    this.form = this.fb.group({
      priority_name: ['', Validators.required],
      response_time_hrs: ['', Validators.required],
      resolution_time_hrs: ['', Validators.required],
      description: [''],
    })
  }
  get control() {
    return this.form.controls
  }
  submit() {
    this.isEdit ? this.editpriority() : this.addpriority()
  }
  //update priority
  editpriority() {
    let data = this.form.getRawValue()
    if (this.form.valid) {
      this._sharedService.setLoading(true);
      this._adminService.editPriority(this.priority_id, data).subscribe({
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
  //add priority
  addpriority() {
    let data = this.form.value;
    if (this.form.valid) {
      this._sharedService.setLoading(true);
      this._adminService.addPriority(data).subscribe({
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
  //get priority by id
  getpriorityById(id: any) {
    this._adminService.getPriorityById(id).subscribe({
      next: (result: any) => {
        const data = result.data;
        this.control['priority_name'].patchValue(data.priority_name)
         this.control['response_time_hrs'].patchValue(data.response_time_hrs)
          this.control['resolution_time_hrs'].patchValue(data.resolution_time_hrs)
        this.control['description'].patchValue(data.description)

      }
    })

  }
   goToback() {
    this.location.back();
  }
}