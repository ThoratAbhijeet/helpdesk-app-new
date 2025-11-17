import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AdminService } from '../../admin.service';

@Component({
  selector: 'app-view-role',
  templateUrl: './view-role.component.html',
  styleUrl: './view-role.component.scss'
})
export class ViewRoleComponent implements OnInit {
  isEdit = false
  role_details: any
  role_id :any;
  constructor(
    private _adminService: AdminService,
    private url: ActivatedRoute,
    private location: Location,
  
  ) { }
  ngOnInit(): void {
  this.role_id = this.url.snapshot.params['id'];
    //activate route get employee id
    if (this.role_id) {
      this.getRoleById(this.role_id);
      this.isEdit = true
    }
  }
    getRoleById(id: any) {
    this._adminService.getRoleById(id).subscribe({
      next: (result: any) => {
        this.role_details = result.data;

      }
    })

  }
   goToback() {
    this.location.back();
  }

}
