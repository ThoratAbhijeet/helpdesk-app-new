import { Component, ElementRef, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { PageEvent } from '@angular/material/paginator';
import { ToastrService } from 'ngx-toastr';
import { debounceTime } from 'rxjs';
import { CustomerService } from '../customer.service';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrl: './reports.component.scss'
})
export class ReportsComponent implements OnInit {
  form!: FormGroup;
  allReportList: Array<any> = [];
 allDepartmentList: Array<any> = [];
 allPriorityList: Array<any> = [];
 allTicketEmployeeStatusList: Array<any> = [];
  searchTicketEmployeeValue: string = '';
  filteredTicketEmployeeList: any[] = [];
  allCategoryList: Array<any> = [];
  searchCategoryValue: string = '';
  filteredCategoryList: any[] = [];
  page = 1;
  perPage = 50;
  total = 0;
  fromDate = '';
  toDate = '';
  user_id = '';
   assigned_to = '';
  department_id = '';
  priority_id = '';
  ticket_category_id = '';
  searchControl: any;
  searchKey: any = '';
  customer_id:any;
  
  constructor(private _customerService: CustomerService, private fb: FormBuilder, private elRef: ElementRef, private _toastrService: ToastrService,) { }

  ngOnInit(): void {
    let userData = localStorage.getItem('data');
    this.user_id = userData ? JSON.parse(userData).user_id : null;
    this.customer_id = userData ? JSON.parse(userData).sign_customer_id : null;
    this.createForm();
    this.getAllPriorityListWma()
    this.getAllDepartmentListWma();
    this.getAllCategoryListWma();
    this.getTicketAssignToById(this.user_id);
    this.searchControl.valueChanges.pipe(debounceTime(550)).subscribe((searchKey: any) => {
      this.getSearchInput(searchKey);
    });
  }
  createForm() {
    this.form = this.fb.group({
      fromDate: [''],  // No validation for unrestricted date selection
      toDate: [''],
      department_id: [''],
      company_name: [''],
      priority_id: [''],
      ticket_category_id: [''],
      assigned_to: ['']
    });
  }
 
  getAllMeetingReportList() {
    this.fromDate = this.form.value.fromDate;
    this.toDate = this.form.value.toDate;
    this.department_id = this.form.value.department_id;
    this.priority_id = this.form.value.priority_id;
    this.ticket_category_id = this.form.value.ticket_category_id;
    this.assigned_to = this.form.value.assigned_to;
    
    this._customerService.getAllTicketsListReport(this.page, this.perPage, this.fromDate, this.toDate, this.department_id, this.priority_id, this.ticket_category_id, this.assigned_to, this.searchKey,this.user_id,this.customer_id).subscribe({
      next: (res: any) => {
        if (res.data.length > 0) {
          this.allReportList = res.data;
          this.total = res.pagination.total;
        } else {
          this.allReportList = [];
          this.total = 0;
        }
      }
    });
  }


  getSearchInput(searchKey: any) {
    this.searchKey = searchKey;
    this.getAllMeetingReportList();
  }



  onPageChange(event: PageEvent): void {
    this.page = event.pageIndex + 1;
    this.perPage = event.pageSize;
    this.getAllMeetingReportList();
  }




  //download All Ticket report list
  downloadAllMeetingReportList() {
this.fromDate = this.form.value.fromDate;
    this.toDate = this.form.value.toDate;
    this.department_id = this.form.value.department_id;
    this.priority_id = this.form.value.priority_id;
    this.ticket_category_id = this.form.value.ticket_category_id;
    this.assigned_to = this.form.value.assigned_to;
    this._customerService.downloadAllTikitReportList(this.fromDate, this.toDate, this.department_id, this.priority_id,this.ticket_category_id,this.assigned_to,this.searchKey,this.user_id ,this.customer_id).subscribe({
      next: (blob: Blob) => {
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'All-Ticket-Report.xlsx';  // Set a proper filename
        link.click();
        window.URL.revokeObjectURL(url);
      },
      error: (err: any) => {
        if (err.error.status == 401 || err.error.status == 422) {
          this._toastrService.warning(err.error.message);
        } else {
          this._toastrService.warning('No Data Found');
        }
      }
    })
  }
  //get status  list...
  getAllPriorityListWma() {
    this._customerService.getAllPriorityListWma().subscribe({
      next: (res: any) => {
        if (res.data.length > 0) {
          this.allPriorityList = res.data;
        }
      }
    });
  }
// get Department list...
getAllDepartmentListWma() {
  this._customerService.getAllDepartmentListWma().subscribe({
    next: (res: any) => {
      if (res.data.length > 0) {
        // Hide or exclude "Customer" department
        this.allDepartmentList = res.data.filter(
          (dept: any) => dept.department_name.toLowerCase() !== 'customer'
        );
      }
    },
    error: (err) => {
      console.error('Error fetching departments:', err);
    }
  });
}
  downloadAttachmentDoment(meetingId: any, id: any) {
    // this._userService.downloadAttachmentDocument(meetingId, id).subscribe({
    //   next: (response: any) => {
    //     const blob = new Blob([response], { type: response.type });

    //     // Try to get the file name from headers, fallback to default name
    //     const contentDisposition = response.headers?.get('content-disposition');
    //     let fileName = 'AttachmentDocument';
    //     if (contentDisposition) {
    //       const match = contentDisposition.match(/filename="?([^"]+)"?/);
    //       if (match && match[1]) {
    //         fileName = match[1];
    //       }
    //     }

    //     const url = window.URL.createObjectURL(blob);
    //     const link = document.createElement('a');
    //     link.href = url;
    //     link.download = fileName;
    //     link.click();
    //     window.URL.revokeObjectURL(url);
    //   },
    //   error: (err: any) => {
    //     if (err.status === 401 || err.status === 422) {
    //       this._toastrService.warning(err.error.message);
    //     } else {
    //       this._toastrService.warning('No Data Found');
    //     }
    //   }
    // });
  }
   //Category list wma
  getAllCategoryListWma() {
    this._customerService.getAllCategoriesListWma('').subscribe({
      next: (res: any) => {
        if (res.data.length > 0) {
          this.allCategoryList = res.data;
          this.filteredCategoryList = this.allCategoryList;
        }
      }
    });
  }

  filterCategory() {
    if (this.searchCategoryValue !== '') {
      this.filteredCategoryList = this.allCategoryList.filter(project =>
        project.name.toLowerCase().includes(this.searchCategoryValue.toLowerCase())
      );
    } else {
      this.filteredCategoryList = this.allCategoryList;
    }
  }
   getTicketAssignToById(id: any) {
   this._customerService.getAllCustomerListWma(id).subscribe({
      next: (res: any) => {
        if (res.data.length > 0) {
          this.allTicketEmployeeStatusList = res.data;
          this.filteredTicketEmployeeList = this.allTicketEmployeeStatusList;
        }
      }
    });
  }
    filterAssignTo() {
    if (this.searchTicketEmployeeValue !== '') {
      this.filteredTicketEmployeeList = this.allTicketEmployeeStatusList.filter(project =>
        project.user_name.toLowerCase().includes(this.searchTicketEmployeeValue.toLowerCase())
      );
    } else {
      this.filteredTicketEmployeeList = this.allTicketEmployeeStatusList;
    }
  }

  getStatusColor(status: string): string {
  const statusColors: { [key: string]: string } = {
    'open': 'bg-primary text-white',
    'in progress': 'bg-info text-dark',
    'on hold': 'bg-danger text-white',
    'resolved': 'bg-success text-white',
    'closed': 'bg-secondary text-white',
    'accepted': 'bg-warning text-dark',
  };

  const normalizedStatus = status?.trim().toLowerCase();
  return statusColors[normalizedStatus] || 'bg-light text-dark'; // fallback
}

}
