import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { SharedService } from '../../../../shared/shared.service';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { CustomerService } from '../../../customer/customer.service';
import { AdminService } from '../../../admin/admin.service';

@Component({
  selector: 'app-add-update-category',
  templateUrl: './add-update-category.component.html',
  styleUrl: './add-update-category.component.scss'
})
export class AddUpdateCategoryComponent implements OnInit {
  isEdit = false
  form!: FormGroup
  Categories_id: any;
   allDepartmentList: any[] = [];
   allPriorityList: Array<any> = [];
  constructor(
    private fb: FormBuilder,
    private _toastrService: ToastrService,
    private _adminService: AdminService,
    private _sharedService: SharedService,
    private _customerService: CustomerService,
    private url: ActivatedRoute,
    private location: Location,
  ) { }
  ngOnInit(): void {
    this.createForm();
    this.getAllDepartmentListWma();
    this.getAllPriorityListWma();
    this.Categories_id = this.url.snapshot.params['id'];
    //activate route get employee id
    if (this.Categories_id) {
      this.getCategoriesById(this.Categories_id);
      this.isEdit = true
    }
  }
    //get company  list...
  getAllDepartmentListWma() {
    this._adminService.getAllDepartmentListWma().subscribe({
      next: (res: any) => {
        if (res.data.length > 0) {
          this.allDepartmentList = res.data;

        }
      }
    });
  }
    //get status  list...
  getAllPriorityListWma() {
    this._customerService.getAllPriorityListWma().subscribe({
      next: (res: any) => {
        if (res.data.length > 0) {
          this.allPriorityList = res.data;
        }
      }
    });
  }
  //create form
  createForm() {
    this.form = this.fb.group({
      parent_category: ['', Validators.required],
      department_id: ['', Validators.required],
      name: ['', Validators.required],
      priority_id: ['', Validators.required],
      sla_hours: ['', Validators.required],
      description: [''],
    })
  }
  get control() {
    return this.form.controls
  }
  submit() {
    this.isEdit ? this.editCategories() : this.addCategories()
  }
  //update Categories
  editCategories() {
    let data = this.form.getRawValue()
    if (this.form.valid) {
      this._sharedService.setLoading(true);
      this._adminService.editCategories(this.Categories_id, data).subscribe({
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
  //add Categories
  addCategories() {
    let data = this.form.value;
    if (this.form.valid) {
      this._sharedService.setLoading(true);
      this._adminService.addCategories(data).subscribe({
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
  //get Categories by id
  getCategoriesById(id: any) {
    this._adminService.getCategoriesById(id).subscribe({
      next: (result: any) => {
        const data = result.data;
      this.control['parent_category'].patchValue(data.parent_category)
          this.control['department_id'].patchValue(data.department_id)
         this.control['name'].patchValue(data.name)
        this.control['priority_id'].patchValue(data.priority_id)
        this.control['sla_hours'].patchValue(data.sla_hours)
        this.control['description'].patchValue(data.description)

      }
    })

  }
  goToback() {
    this.location.back();
  }
}