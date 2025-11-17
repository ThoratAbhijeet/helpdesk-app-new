import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { AdminService } from '../../../admin/admin.service';

@Component({
  selector: 'app-view-priority',
  templateUrl: './view-priority.component.html',
  styleUrl: './view-priority.component.scss'
})
export class ViewPriorityComponent implements OnInit {
  isEdit = false
  priority_details: any
  priority_id :any;
  constructor(
    private _adminService: AdminService,
    private url: ActivatedRoute,
    private location: Location,
  
  ) { }
  ngOnInit(): void {
  this.priority_id = this.url.snapshot.params['id'];
    //activate route get employee id
    if (this.priority_id) {
      this.getpriorityById(this.priority_id);
      this.isEdit = true
    }
  }
    getpriorityById(id: any) {
    this._adminService.getPriorityById(id).subscribe({
      next: (result: any) => {
        this.priority_details = result.data;

      }
    })

  }
   goToback() {
    this.location.back();
  }

}
