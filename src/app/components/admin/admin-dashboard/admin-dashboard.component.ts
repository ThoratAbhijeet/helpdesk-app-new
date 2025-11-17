import { Component, ElementRef, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { AdminService } from '../admin.service';
import { CustomerService } from '../../customer/customer.service';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { PageEvent } from '@angular/material/paginator';
import { ChangePasswordComponent } from '../../auth/change-password/change-password.component';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.scss'
})
export class AdminDashboardComponent implements OnInit {
  userName: string = '';
  roleName: any;
  user_id: any;
  customer_id:any;
  page = 1;
  perPage = 50;
  total = 0;
  searchKey: any = '';
  taskStatusCount: Array<any> = [];
  allOpenTicketList: Array<any> = [];
  todayTaskStatusCount: any[] = [];
  @ViewChildren('myChart') chartCanvases!: QueryList<ElementRef>;
  charts: Chart[] = [];
  selectedStatus: string = 'open';
  selectedTabIndex: number = 0;

  tabLabels = ['open', 'in progress', 'on hold', 'resolved', 'closed'];
  @ViewChild('ticketTabs') ticketTabs!: ElementRef;
  constructor(
    private _adminService: AdminService,
    private _customerService: CustomerService,
    private elRef: ElementRef,
    private dialog: MatDialog,
    private _toastrService: ToastrService
  ) {
    Chart.register(...registerables); // ✅ Register Chart.js modules
  }

  ngOnInit(): void {

    let userDetails = localStorage.getItem('data');
    if (userDetails) {
      let parsedData = JSON.parse(userDetails);
      this.userName = parsedData.user_name;
      this.roleName = parsedData.role_name;
      this.user_id = parsedData.user_id;
      this.customer_id = parsedData.customer_id;
      this.getTaskStatusCount(this.user_id);
      this.getTicketList(this.user_id);
      this.getAdminTaskStatusCount(this.user_id);
    }
    this.getStatusWiseTicketList(this.selectedStatus);

  }
  onStatusCardClick(status: string) {
    const normalizedStatus = status.trim().toLowerCase();
    this.selectedStatus = normalizedStatus;

    const tabIndex = this.tabLabels.indexOf(normalizedStatus);
    if (tabIndex !== -1) {
      this.selectedTabIndex = tabIndex;
    }

    this.getStatusWiseTicketList(this.selectedStatus);

    setTimeout(() => {
      const yOffset = -80; // adjust based on your header height
      const y = this.ticketTabs.nativeElement.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }, 300);
  }


  getAdminTaskStatusCount(id: any) {
    this._customerService.getDashBoardTicketStatusCount('',this.customer_id).subscribe({
      next: (res: any) => {
        this.taskStatusCount = res.ticket_status_counts;
      }
    });
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

  getTaskStatusCount(id: any) {
    this._customerService.getTicketStatusCount('',this.customer_id).subscribe({
      next: (res: any) => {
        if (res.data) {
          this.todayTaskStatusCount = res.data;
          setTimeout(() => {
            this.destroyCharts();
            this.createCharts();
          }, 300);
        }
      }
    });
  }

  destroyCharts() {
    this.charts.forEach(chart => chart?.destroy());
    this.charts = [];
  }

  createCharts() {
    const labels = this.todayTaskStatusCount.map(item => item.date);
    const openCounts = this.todayTaskStatusCount.map(item => item.open_count);
    const closeCounts = this.todayTaskStatusCount.map(item => item.close_count);

    this.chartCanvases.forEach(canvasRef => {
      const ctx = canvasRef.nativeElement.getContext('2d');
      if (!ctx) return;

      const chart = new Chart(ctx, {
        type: 'bar',
        data: {
          labels,
          datasets: [
            {
              label: 'Open',
              data: openCounts,
              backgroundColor: '#2196f3', // blue
              borderColor: '#1976d2',
              borderWidth: 1,
              hoverBackgroundColor: '#42a5f5'
            },
            {
              label: 'Closed',
              data: closeCounts,
              backgroundColor: '#f44336', // red
              borderColor: '#d32f2f',
              borderWidth: 1,
              hoverBackgroundColor: '#e57373'
            }
          ]

        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            title: {
              display: true,
              text: 'Daily Ticket Status (Open vs Closed)',
              font: { size: 18, weight: 'bold' },
              color: '#333'
            },
            legend: {
              labels: {
                color: '#000',
                font: { size: 14 }
              }
            }
          }

        }
      });

      this.charts.push(chart);
    });
  }
  getTicketList(id: any) {
    this._customerService.getOpenTicketList(this.searchKey, this.page, this.perPage, '').subscribe({
      next: (res: any) => {
        if (res.data.length > 0) {
          this.allOpenTicketList = res.data;
          this.total = res.pagination.total
        } else {
          this.allOpenTicketList = []
          this.total = 0;
        }
      }
    })
  }
  onPageChange(event: PageEvent): void {
    this.page = event.pageIndex + 1;
    this.perPage = event.pageSize;
    this.getTicketList(this.user_id);
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
  //change password
  openChangePasswordDialog() {
    const dialogRef = this.dialog.open(ChangePasswordComponent, {
      width: '400px', // Adjust width as needed
      maxWidth: '90vw', // Keeps it responsive
      disableClose: false, // Prevents closing on outside click
      panelClass: 'custom-dialog-center', // Custom class for centering
    });

    dialogRef.afterClosed().subscribe((message: any) => {

    });
  }
  onTabTaskChange(event: any) {
    const clickedLabel = event.tab.textLabel.trim().toLowerCase();
    this.selectedStatus = clickedLabel;
    this.getStatusWiseTicketList(this.selectedStatus);
  }

  getStatusWiseTicketList(status: string) {
    this._customerService.getStatusWiseTicketList(this.searchKey, this.page, this.perPage, status, '', this.customer_id)
      .subscribe({
        next: (res: any) => {
          if (res.data.length > 0) {
            this.allOpenTicketList = res.data;
            this.total = res.pagination.total;
          } else {
            this.allOpenTicketList = [];
            this.total = 0;
          }
        }
      });
  }
}
