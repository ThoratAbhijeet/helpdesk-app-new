import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AdminService } from '../../../admin/admin.service';

@Component({
  selector: 'app-view-employee',
  templateUrl: './view-employee.component.html',
  styleUrl: './view-employee.component.scss'
})
export class ViewEmployeeComponent implements OnInit {
  isEdit = false
  userId: any;
  allCustomerDetails: any = {};
  customerAgents: any[] = [];
  constructor(
    private _adminService: AdminService,
    private url: ActivatedRoute,
    private location: Location,
    private _tosterService: ToastrService,

  ) { }
  ngOnInit(): void {
    //activate route get id
    this.userId = this.url.snapshot.params['id'];
    if (this.userId) {
      this.getUserById(this.userId)
    }
  }
  //get user by id
getUserById(id: any) {
  this._adminService.getUserById(id).subscribe({
    next: (result: any) => {
      this.allCustomerDetails = result.data;
      // Ensure customerAgents is always an array
      this.customerAgents = Array.isArray(this.allCustomerDetails.agent) 
        ? this.allCustomerDetails.agent 
        : [];
    }
  });
}
  // cancel route location service
  goToback() {
    this.location.back();
  }
 
}
