import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../../admin/admin.service';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-view-customer',
  templateUrl: './view-customer.component.html',
  styleUrl: './view-customer.component.scss'
})
export class ViewCustomerComponent implements OnInit {
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
  this._adminService.getCustomerById(id).subscribe({
    next: (result: any) => {
      const userData = result.data;

      // 🟢 Assign full user details for the template
      this.allCustomerDetails = userData;

      // 🟢 Ensure serviceData is always an array
      this.allCustomerDetails.serviceData = Array.isArray(userData.serviceData)
        ? userData.serviceData
        : [];

      // 🟢 Ensure customerAgents is always an array
      this.customerAgents = Array.isArray(userData.agent)
        ? userData.agent.map((agent: any) => ({
            ...agent,
            department_name: agent.department_name || '--',
            user_name: agent.user_name || '--'
          }))
        : [];
    },
    error: (err) => {
      console.error('Error fetching user data:', err);
    },
  });
}

  // cancel route location service
  goToback() {
    this.location.back();
  }
 
}
