import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { AdminService } from '../../../admin/admin.service';

@Component({
  selector: 'app-view-category',
  templateUrl: './view-category.component.html',
  styleUrl: './view-category.component.scss'
})
export class ViewCategoryComponent implements OnInit {
  isEdit = false
  Categories_details: any
  Categories_id :any;
  constructor(
    private _adminService: AdminService,
    private url: ActivatedRoute,
    private location: Location,
  
  ) { }
  ngOnInit(): void {
  this.Categories_id = this.url.snapshot.params['id'];
    //activate route get employee id
    if (this.Categories_id) {
      this.getCategoriesById(this.Categories_id);
      this.isEdit = true
    }
  }
    getCategoriesById(id: any) {
    this._adminService.getCategoriesById(id).subscribe({
      next: (result: any) => {
        this.Categories_details = result.data;

      }
    })

  }
   goToback() {
    this.location.back();
  }

}
