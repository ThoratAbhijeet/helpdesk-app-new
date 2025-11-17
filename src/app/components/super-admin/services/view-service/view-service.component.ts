import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../../admin/admin.service';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-view-service',
  templateUrl: './view-service.component.html',
  styleUrl: './view-service.component.scss'
})
export class ViewServiceComponent implements OnInit {
  isEdit = false
  service_details: any
  service_id :any;
  constructor(
    private _adminService: AdminService,
    private url: ActivatedRoute,
    private location: Location,
  
  ) { }
  ngOnInit(): void {
  this.service_id = this.url.snapshot.params['id'];
    //activate route get employee id
    if (this.service_id) {
      this.getserviceById(this.service_id);
      this.isEdit = true
    }
  }
    getserviceById(id: any) {
    this._adminService.getServicesById(id).subscribe({
      next: (result: any) => {
        this.service_details = result.data;

      }
    })

  }
   goToback() {
    this.location.back();
  }

}
