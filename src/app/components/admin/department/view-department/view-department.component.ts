import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../admin.service';
import { DepartmentComponent } from '../department.component';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-view-department',
  templateUrl: './view-department.component.html',
  styleUrl: './view-department.component.scss'
})
export class ViewDepartmentComponent implements OnInit {
  isEdit = false
  department_details: any
  department_id :any;
  constructor(
    private _adminService: AdminService,
    private url: ActivatedRoute,
    private location: Location,
  
  ) { }
  ngOnInit(): void {
  this.department_id = this.url.snapshot.params['id'];
    //activate route get employee id
    if (this.department_id) {
      this.getDepartmentById(this.department_id);
      this.isEdit = true
    }
  }
    getDepartmentById(id: any) {
    this._adminService.getDepartmentById(id).subscribe({
      next: (result: any) => {
        this.department_details = result.data;

      }
    })

  }
   goToback() {
    this.location.back();
  }

}
