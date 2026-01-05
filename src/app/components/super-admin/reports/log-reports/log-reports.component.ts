import { Component, ElementRef, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CustomerService } from '../../../customer/customer.service';
import { ToastrService } from 'ngx-toastr';
import { debounceTime } from 'rxjs';
import { MatSelectChange } from '@angular/material/select';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-log-reports',
  templateUrl: './log-reports.component.html',
  styleUrl: './log-reports.component.scss'
})
export class LogReportsComponent implements OnInit {
  form!: FormGroup;
  allReportList: Array<any> = [];
 allDepartmentList: Array<any> = [];
 allPriorityList: Array<any> = [];
 allTicketEmployeeStatusList: Array<any> = [];
  searchTicketEmployeeValue: string = '';
  filteredTicketEmployeeList: any[] = [];
   allTicketAgentCompanyStatusList: Array<any> = [];
  searchTicketAgentCompanyValue: string = '';
   filteredTicketAgentCompanyList: any[] = [];
   allTicketEmployeeCompanyStatusList: Array<any> = [];
  searchTicketEmployeeCompanyValue: string = '';
   filteredTicketEmployeeCompanyList: any[] = [];
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
  customer_id = '';
  ticket_status ='';
  constructor(private _customerService: CustomerService, private fb: FormBuilder, private elRef: ElementRef, private _toastrService: ToastrService,) { }

  ngOnInit(): void {
    let userData = localStorage.getItem('data');
    this.user_id = userData ? JSON.parse(userData).user_id : null;
    this.createForm();
    this.getAllPriorityListWma()
    this.getAllDepartmentListWma();
    this.getTicketAssignToById();
    this.searchControl.valueChanges.pipe(debounceTime(550)).subscribe((searchKey: any) => {
      this.getSearchInput(searchKey);
    });
  }
  createForm() {
    this.form = this.fb.group({
      fromDate: [''],  // No validation for unrestricted date selection
      toDate: [''],
      user_id: [''],
      customer_id: [''],
    });
  }
 
  getAllMeetingReportList() {
    this.fromDate = this.form.value.fromDate;
    this.toDate = this.form.value.toDate;
    this.assigned_to = this.form.value.user_id;
        this.customer_id = this.form.value.customer_id;
    this._customerService.getAllLogsListReport(this.page, this.perPage, this.fromDate, this.toDate, '', this.searchKey, this.customer_id).subscribe({
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

onCompanyChange(event: MatSelectChange) {
  const customerId = event.value;
  this.customer_id = customerId;
  if (customerId) {
    this.getTicketEmployeeById(customerId);
    this.getAgentById(customerId);
  }
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
    this.customer_id = this.form.value.customer_id;
    this._customerService.downloadAllLogReportList(this.fromDate, this.toDate, this.searchKey,'' ,this.customer_id).subscribe({
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
    getAgentById(id:any) {
   this._customerService.getAllTechnicianBYCompanyListWma(id).subscribe({
      next: (res: any) => {
        if (res.data.length > 0) {
          this.allTicketAgentCompanyStatusList = res.data;
          this.filteredTicketAgentCompanyList = this.allTicketAgentCompanyStatusList;
        }else{
          this.filteredTicketAgentCompanyList = [];
        }
      }
    });
  }
    filterAgent() {
    if (this.searchTicketAgentCompanyValue !== '') {
      this.filteredTicketAgentCompanyList = this.allTicketAgentCompanyStatusList.filter(project =>
        project.user_name.toLowerCase().includes(this.searchTicketAgentCompanyValue.toLowerCase())
      );
    } else {
      this.filteredTicketAgentCompanyList = this.allTicketAgentCompanyStatusList;
    }
  }
 //get Ticket assign to by id
  getTicketAssignToById() {
   this._customerService.getAllCustomerListWma('').subscribe({
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
        project.company_name.toLowerCase().includes(this.searchTicketEmployeeValue.toLowerCase())
      );
    } else {
      this.filteredTicketEmployeeList = this.allTicketEmployeeStatusList;
    }
  }
   getTicketEmployeeById(id:any) {
   this._customerService.getAllCustomerCompnaywiseListWma(id).subscribe({
      next: (res: any) => {
        if (res.data.length > 0) {
          this.allTicketEmployeeCompanyStatusList = res.data;
          this.filteredTicketEmployeeCompanyList = this.allTicketEmployeeCompanyStatusList;
        }else{
           this.filteredTicketEmployeeCompanyList = []
        }
      }
    });
  }
    filterEmployee() {
    if (this.searchTicketEmployeeCompanyValue !== '') {
      this.filteredTicketEmployeeCompanyList = this.allTicketEmployeeCompanyStatusList.filter(project =>
        project.user_name.toLowerCase().includes(this.searchTicketEmployeeCompanyValue.toLowerCase())
      );
    } else {
      this.filteredTicketEmployeeCompanyList = this.allTicketEmployeeCompanyStatusList;
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
