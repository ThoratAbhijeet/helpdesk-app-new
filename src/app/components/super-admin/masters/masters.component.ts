import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { debounceTime } from 'rxjs';
import { FormControl } from '@angular/forms';
import { AdminService } from '../../admin/admin.service';

@Component({
  selector: 'app-masters',
  templateUrl: './masters.component.html',
  styleUrl: './masters.component.scss'
})
export class MastersComponent implements OnInit {
  allCategoriesList: Array<any> = [];
  allDepartmentList: Array<any> = [];
  allServicesList : Array<any> =[];
  allPriorityList: Array<any> = [];
  allRoleList: Array<any> = [];
  allUserList: Array<any> = [];
  customer_id :any;
  page = 1;
  limit = 50;
  total = 0;
  selectedTabIndex = 0
  searchKeys: string[] = [];
  searchControl: FormControl = new FormControl('');
  role_id = 3;
  constructor(
    private _adminService: AdminService,
    private _tosterService: ToastrService, private router: Router) {
  }

  ngOnInit(): void {
    let userData = localStorage.getItem('data');
    this.customer_id = userData ? JSON.parse(userData).sign_customer_id : null;
    this.getTicketCategoriesList();
    const savedIndex = localStorage.getItem('selectedTabIndex');
    if (savedIndex) {
      this.selectedTabIndex = +savedIndex;
    }
    this.getSearchInput(this.searchKeys[this.selectedTabIndex]);
    this.searchControl.valueChanges.pipe(debounceTime(550)).subscribe((searchKey) => {
      this.getSearchInput(searchKey);
    });
  }
  getSearchInput(searchKey: string) {
    // Call tab-specific function
    switch (this.selectedTabIndex) {
      case 0:
        this.getTicketCategoriesList();
        break;
      case 1:
        this.getDepartmentList();
        break;
      case 2:
        this.getPriorityList();
        break;
      case 3:
        this.getRoleList();
        break;
        case 4:
        this.getServicesList();
        break;
         case 5:
        this.getEmployeeList();
        break;
    }
  }

  onTabChange(event: any) {
    this.selectedTabIndex = event.index;
    this.searchKeys[event.index] = '';
    localStorage.setItem('selectedTabIndex', event.index.toString());
    this.getSearchInput(this.searchKeys[event.index]);
  }

  getTicketCategoriesList() {
    const searchKey = this.searchKeys[this.selectedTabIndex] || '';
    this._adminService.getTicketCategoriesList(searchKey, this.page, this.limit).subscribe({
      next: (res: any) => {
        if (res.data.length > 0) {
          this.allCategoriesList = res.data
          this.total = res.pagination.total
        } else {
          this.allCategoriesList = []
          this.total = 0;
        }
      }
    })
  }
  getDepartmentList() {
    const searchKey = this.searchKeys[this.selectedTabIndex] || '';
    this._adminService.getDepartmentList(searchKey, this.page, this.limit).subscribe({
      next: (res: any) => {
        if (res.data.length > 0) {
          this.allDepartmentList = res.data
          this.total = res.pagination.total
        } else {
          this.allDepartmentList = []
          this.total = 0;
        }
      }
    })
  }

  getPriorityList() {
    const searchKey = this.searchKeys[this.selectedTabIndex] || '';
    this._adminService.getPriorityList(searchKey, this.page, this.limit).subscribe({
      next: (res: any) => {
        if (res.data.length > 0) {
          this.allPriorityList = res.data
          this.total = res.pagination.total
        } else {
          this.allPriorityList = []
          this.total = 0;
        }
      }
    })
  }
  getRoleList() {
    const searchKey = this.searchKeys[this.selectedTabIndex] || '';
    this._adminService.getRoleList(searchKey, this.page, this.limit).subscribe({
      next: (res: any) => {
        if (res.data.length > 0) {
          this.allRoleList = res.data
          this.total = res.pagination.total
        } else {
          this.allRoleList = []
          this.total = 0;
        }
      }
    })
  }
getServicesList() {
    const searchKey = this.searchKeys[this.selectedTabIndex] || '';
    this._adminService.getServicesList(searchKey, this.page, this.limit).subscribe({
      next: (res: any) => {
        if (res.data.length > 0) {
          this.allServicesList = res.data
          this.total = res.pagination.total
        } else {
          this.allServicesList = []
          this.total = 0;
        }
      }
    })
  }
  getEmployeeList() {
    const searchKey = this.searchKeys[this.selectedTabIndex] || '';
    this._adminService.getEmployeeWmaList(searchKey, this.page, this.limit).subscribe({
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
  changeEventCategory(event: any, id: any) {
    let status = 0;
    if (event.checked) {
      status = 1;
    }
    this._adminService.CategoriesEnableDisable(id, status).subscribe({
      next: (res: any) => {
        if (res.status === 200) {
          this._tosterService.success(res.message);
          this.getTicketCategoriesList();
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
  changeEventDepartment(event: any, id: any) {
    let status = 0;
    if (event.checked) {
      status = 1;
    }
    this._adminService.departmentEnableDisable(id, status).subscribe({
      next: (res: any) => {
        if (res.status === 200) {
          this._tosterService.success(res.message);
          this.getDepartmentList();
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
  changeEventPriority(event: any, id: any) {
    let status = 0;
    if (event.checked) {
      status = 1;
    }
    this._adminService.priorityEnableDisable(id, status).subscribe({
      next: (res: any) => {
        if (res.status === 200) {
          this._tosterService.success(res.message);
          this.getPriorityList();
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
  changeEventRole(event: any, id: any) {
    let status = 0;
    if (event.checked) {
      status = 1;
    }
    this._adminService.roleEnableDisable(id, status).subscribe({
      next: (res: any) => {
        if (res.status === 200) {
          this._tosterService.success(res.message);
          this.getRoleList();
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
  changeEventServices(event: any, id: any) {
    let status = 0;
    if (event.checked) {
      status = 1;
    }
    this._adminService.ServicesEnableDisable(id, status).subscribe({
      next: (res: any) => {
        if (res.status === 200) {
          this._tosterService.success(res.message);
          this.getRoleList();
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
  changeEventEmployee(event: any, id: any) {
    let status = 0;
    if (event.checked) {
      status = 1;
    }
    this._adminService.userEnableDisable(id, status).subscribe({
      next: (res: any) => {
        if (res.status === 200) {
          this._tosterService.success(res.message);
          this.getRoleList();
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
    this.limit = event.pageSize;
    switch (this.selectedTabIndex) {
      case 0:
        this.getTicketCategoriesList();
        break;
      case 1:
        this.getDepartmentList();
        break;
      case 2:
        this.getPriorityList();
        break;
      case 3:
        this.getRoleList();
        break;
      case 4:
        this.getServicesList();
        break;
      case 5:
        this.getEmployeeList();
        break;
    }

  }
  // Called on button click to switch tab
  changeTab(tab_name: any) {
    const currentTabIndex = this.selectedTabIndex;
    const tabs = document.querySelectorAll('.mdc-tab__text-label');
    for (let t = 0; t < tabs.length; t++) {
      const tabText = (tabs[t] as HTMLElement).innerText.replace(/\s+/g, ' ').trim();
      const tabNameClean = tab_name.toString().replace(/\s+/g, ' ').trim();
      if (tabText === tabNameClean) {
        (tabs[t] as HTMLElement).click();
        break;
      }
    }
  }

 
  //download Category list
  downloadCategoryList() {
    const currentSearchKey = this.searchKeys[this.selectedTabIndex] || ''; 
    this._adminService.downloadCategoryList(currentSearchKey).subscribe({
      next: (blob: Blob) => {
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'Category-List.xlsx';  // Set a proper filename
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
  //download Department list
  downloadDepartmentList() {
    const currentSearchKey = this.searchKeys[this.selectedTabIndex] || ''; 
    this._adminService.downloadDepartmentList(currentSearchKey).subscribe({
      next: (blob: Blob) => {
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'Department-List.xlsx';  // Set a proper filename
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
  //download Priority list
  downloadPriorityList() {
    const currentSearchKey = this.searchKeys[this.selectedTabIndex] || ''; 
    this._adminService.downloadPriorityList(currentSearchKey).subscribe({
      next: (blob: Blob) => {
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'Priority-List.xlsx';  // Set a proper filename
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
  //download Role list
  downloadRoleList() {
    const currentSearchKey = this.searchKeys[this.selectedTabIndex] || ''; 
    this._adminService.downloadRoleList(currentSearchKey).subscribe({
      next: (blob: Blob) => {
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'Role-List.xlsx';  // Set a proper filename
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
   //download Services list
  downloadServicesList() {
    const currentSearchKey = this.searchKeys[this.selectedTabIndex] || ''; 
    this._adminService.downloadServicesList(currentSearchKey).subscribe({
      next: (blob: Blob) => {
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'Services-List.xlsx';  // Set a proper filename
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
  downloadEmployeeList() {
    const currentSearchKey = this.searchKeys[this.selectedTabIndex] || ''; 
    this._adminService.downloadUserList(currentSearchKey).subscribe({
      next: (blob: Blob) => {
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'Employee-List.xlsx';  // Set a proper filename
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