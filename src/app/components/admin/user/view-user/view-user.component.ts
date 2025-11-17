import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../admin.service';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-view-user',
  templateUrl: './view-user.component.html',
  styleUrl: './view-user.component.scss'
})
export class ViewUserComponent implements OnInit {
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
