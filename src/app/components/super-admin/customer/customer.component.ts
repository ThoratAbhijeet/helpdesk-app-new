import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { AdminService } from '../../admin/admin.service';
import { ToastrService } from 'ngx-toastr';
import { debounceTime } from 'rxjs';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrl: './customer.component.scss'
})
export class CustomerComponent implements OnInit {
  allUserList: Array<any> = [];
  page = 1;
  perPage = 50;
  total = 0;
  searchKey: any = '';
  searchControl: FormControl = new FormControl('');
  constructor(
    private _adminService: AdminService,
    private _tosterService: ToastrService,) {
  }

  ngOnInit(): void {
    this.getCustomerList();
    this.searchControl.valueChanges.pipe(debounceTime(550)).subscribe((searchKey) => {
      this.getSearchInput(searchKey);
    });
  }
  getSearchInput(searchKey: any) {
    this.searchKey = searchKey;
    this.getCustomerList();
  }
  getCustomerList() {
    this._adminService.getCustomerList(this.searchKey, this.page, this.perPage).subscribe({
      next: (res: any) => {
        if (res.data.length > 0) {
          this.allUserList = res.data
          this.total = res.pagination.total
        } else {
          this.allUserList = []
          this.total = 0;
        }
      }
    })
  }
  changeEvent(event: any, id: any) {
    let status = 0;
    if (event.checked) {
      status = 1;
    }
    this._adminService.customerEnableDisable(id, status).subscribe({
      next: (res: any) => {
        if (res.status === 200) {
          this._tosterService.success(res.message);
          this.getCustomerList();
        } else {
          this._tosterService.warning(res.message);
        }
      },
      error: (error: any) => {
        if (error.status == 422) {
          this._tosterService.warning(error.message);
        } else {
          this._tosterService.error("Internal server error");
        }
      },
    })
  }
  onPageChange(event: PageEvent): void {
    this.page = event.pageIndex + 1;
    this.perPage = event.pageSize;
    this.getCustomerList();

  }
  //download Customer list
  downloadCustomerList() {
    this._adminService.downloadCustomersList(this.searchKey).subscribe({
      next: (blob: Blob) => {
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'customer-List.xlsx';  // Set a proper filename
        link.click();
        window.URL.revokeObjectURL(url);
      },
      error: (err: any) => {
        if (err.error.status == 401 || err.error.status == 422) {
          this._tosterService.warning(err.error.message);
        } else {
          this._tosterService.warning('No Data Found');
        }
      }
    })
  }
}