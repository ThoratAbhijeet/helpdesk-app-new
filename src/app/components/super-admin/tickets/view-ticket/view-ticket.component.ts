import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CustomerService } from '../../../customer/customer.service';

@Component({
  selector: 'app-view-ticket',
  templateUrl: './view-ticket.component.html',
  styleUrl: './view-ticket.component.scss'
})
export class ViewTicketComponent implements OnInit {
  isEdit = false
  ticketsId: any;
  allTicketDetails: any = {};
  constructor(
    private _customerService: CustomerService,
    private url: ActivatedRoute,
    private location: Location,
    private _tosterService: ToastrService,

  ) { }
  ngOnInit(): void {
    //activate route get id
    this.ticketsId = this.url.snapshot.params['id'];
    if (this.ticketsId) {
      this.getTicketById(this.ticketsId)
    }
  }
  //get employee by id
  getTicketById(id: any) {
    this._customerService.getTicketById(id).subscribe({
      next: (result: any) => {
        this.allTicketDetails = result.data;
      }
    })
  }
  // cancel route location service
  goToback() {
    this.location.back();
  }
  isImage(base64: string): boolean {
    return base64.startsWith('data:image/');
  }

  isPdf(base64: string): boolean {
    return base64.startsWith('data:application/pdf');
  }
    //download Ticket card Details pdf
  downloadTicketTicketAttachmentDocument(id: any) {
    this._customerService.downloadCustomerTicketAttachmentDocument(id).subscribe({
      next: (response: any) => {
        const blob = new Blob([response], { type: response.type });

        // Try to get the file name from headers, fallback to default name
        const contentDisposition = response.headers?.get('content-disposition');
        let fileName = 'Ticket-Attachment-Document';
        if (contentDisposition) {
          const match = contentDisposition.match(/filename="?([^"]+)"?/);
          if (match && match[1]) {
            fileName = match[1];
          }
        }

        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = fileName;
        link.click();
        window.URL.revokeObjectURL(url);
      },
      error: (err: any) => {
        if (err.status === 401 || err.status === 422) {
          this._tosterService.warning(err.error.message);
        } else {
          this._tosterService.warning('No Data Found');
        }
      }
    });
  }
}

