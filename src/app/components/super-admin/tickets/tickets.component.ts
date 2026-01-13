import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { debounceTime } from 'rxjs';
import { SharedService } from '../../../shared/shared.service';
import { CustomerService } from '../../customer/customer.service';
import { ToastrService } from 'ngx-toastr';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-tickets',
  templateUrl: './tickets.component.html',
  styleUrl: './tickets.component.scss'
})
export class TicketsComponent implements OnInit {
  allTicketList: Array<any> = [];
  TicketFollowupEmployeeIds: number[] = [];
  allTodayFollowupList: Array<any> = [];
  user_id: any;
  page = 1;
  perPage = 50;
  total = 0;
  searchKey: any = '';
  activeTabIndex: any;
  searchControl: FormControl = new FormControl('');
  expandedRowIndex: number | null = null;

  constructor(
    private _customerService: CustomerService,
    private _tosterService: ToastrService, private _sharedService: SharedService, private cdr: ChangeDetectorRef) {
  }

  ngOnInit(): void {
    let userData = localStorage.getItem('data');
    this.user_id = userData ? JSON.parse(userData).user_id : null;
    this.getTicketList();
    this.searchControl.valueChanges.pipe(debounceTime(550)).subscribe((searchKey) => {
      this.getSearchInput(searchKey);
    });
  }
  
  getSearchInput(searchKey: any) {
    this.searchKey = searchKey;
      this.getTicketList();
  
  }
  toggleDetails(index: number): void {
    this.expandedRowIndex = this.expandedRowIndex === index ? null : index;
  }
  getTicketList() {
    this._customerService.getTicketList(this.searchKey, this.page, this.perPage, '','').subscribe({
      next: (res: any) => {
        if (res.data.length > 0) {
          this.allTicketList = res.data;
          this.total = res.pagination.total
        } else {
          this.allTicketList = []
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
    // this._customerService.TicketEnableDisable(id, status).subscribe({
    //   next: (res: any) => {
    //     if (res.status === 200) {
    //       this._tosterService.success(res.message);
    //       this.getTicketList();
    //     } else {
    //       this._tosterService.warning(res.message);
    //     }
    //   },
    //   error: (error: any) => {
    //     if (error.status == 422) {
    //       this._tosterService.warning(error.message);
    //     } else {
    //       this._tosterService.error("Internal server error");
    //     }
    //   },
    // })
  }
  onPageChange(event: PageEvent): void {
    this.page = event.pageIndex + 1;
    this.perPage = event.pageSize;
    this.getTicketList();

  }

  //download  Ticket list
  downloadTicketList() {
    this._customerService.downloadTikitList('', this.searchKey,'').subscribe({
      next: (blob: Blob) => {
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'Ticket-Report.xlsx';  // Set a proper filename
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
getStatusColor(status: string): string {
  const statusColors: { [key: string]: string } = {
    'open': 'bg-primary text-white',
    'in progress': 'bg-info text-dark',
    'on hold': 'bg-danger text-white',
   're assign': 'bg-orange text-white',
    'closed': 'bg-secondary text-white',
    'accepted': 'bg-warning text-dark',
  };

  const normalizedStatus = status?.trim().toLowerCase();
  return statusColors[normalizedStatus] || 'bg-light text-dark'; // fallback
}

}