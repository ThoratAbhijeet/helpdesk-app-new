import { Component, NgZone, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { CustomerService } from '../../../customer/customer.service';
import { SharedService } from '../../../../shared/shared.service';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-update-ticket',
  templateUrl: './add-update-ticket.component.html',
  styleUrl: './add-update-ticket.component.scss'
})
export class AddUpdateTicketComponent  implements OnInit {
  isEdit = false;
  TicketForm!: FormGroup;
  allCategoryList: Array<any> = [];
  allTicketStatusList: Array<any> = [];
  allPriorityList: Array<any> = [];
  allDepartmentList: Array<any> = [];
  allAssignDepartmentList: Array<any> = [];
  allTicketEmployeeStatusList: Array<any> = [];
  TicketId: any;
  searchCategoryValue: string = '';
  filteredCategoryList: any[] = [];
  allTicketEmployeeList: Array<any> = [];
  searchTicketEmployeeValue: string = '';
  filteredTicketEmployeeList: any[] = [];
   allCompanyList: Array<any> = [];
  allServiceList: Array<any> = [];
  searchServiceValue: string = '';
  filteredServiceList: any[] = [];
  userId: any;
  constructor(
    private fb: FormBuilder,
    private _toastrService: ToastrService,
    private _customerService: CustomerService,
    private _sharedService: SharedService,
    private url: ActivatedRoute,
    private location: Location,
    private ngZone: NgZone
  ) { }
  ngOnInit(): void {
    const data = localStorage.getItem('data');
    this.userId = data ? JSON.parse(data)?.user_id : null;
    this.createForm();
     this.getAllCompanyListWma()
    this.getAllPriorityListWma();
    this.getAllDepartmentListWma()
    this.getTicketAssignToById(this.userId);
    this.getAllCategoryListWma();
    this.TicketId = this.url.snapshot.params['id'];
    //activate route get employee id
    if (this.TicketId) {
      this.getTicketById(this.TicketId);
      this.isEdit = true
      this.TicketForm.get('ticket_category_id')?.disable();
      this.TicketForm.get('department_id')?.disable();
       this.TicketForm.get('priority_id')?.disable();
       this.TicketForm.get('subject')?.disable();
    }

  }

  //Ticket form
  createForm() {
    this.TicketForm = this.fb.group({
      customer_id: ['',Validators.required],
      service_id: ['',Validators.required],
      ticket_category_id: ['',Validators.required],
      department_id: ['',Validators.required],
      priority_id: ['',Validators.required],
      subject: ['',Validators.required],
      description: [''],
     ticket_status: ['',Validators.required],
      ticket_conversation_id: [null],
      base64PDF: [null],
      assigned_to: [null],
      remarks: [null],
      message: ['',Validators.required],
    });
    
  }

  get controls() {
    return this.TicketForm.controls;
  }

onCompanyChange(event: Event) {
  const customerId = (event.target as HTMLSelectElement).value; 
  if (customerId) {
    this.getAllServiceListWma(customerId);
  }
}
 submit() {
  // Patch 'description' with the current 'message' value before submission
  const messageValue = this.TicketForm.get('message')?.value;
  this.TicketForm.patchValue({ description: messageValue });

  this.isEdit ? this.editTicket() : this.addTicket();
}
  //update Ticket
  editTicket() {
    const data = this.TicketForm.getRawValue();

    if (this.TicketForm.valid) {
      Swal.fire({
        title: 'Do you want to update?',
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: 'Yes, update it!',
        cancelButtonText: 'Cancel',
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
      }).then((result) => {
        if (result.isConfirmed) {
          this._sharedService.setLoading(true);

          this._customerService.editTicket(this.TicketId, data).subscribe({
            next: (res: any) => {
              this._sharedService.setLoading(false);
              if (res.status === 200) {
                Swal.fire('Updated!', res.message, 'success');
                this.goToback();
              } else {
                this._toastrService.warning(res.message);
              }
            },
            error: (err: any) => {
              this._sharedService.setLoading(false);
              if (err.error.status == 401 || err.error.status == 422) {
                this._toastrService.warning(err.error.message);
              } else {
                this._toastrService.error('Internal Server Error');
              }
            },
          });
        }
      });
    } else {
      this.TicketForm.markAllAsTouched();
      this._toastrService.warning('Fill required fields');
    }
  }
  //add Ticket
  addTicket() {
    const data = this.TicketForm.getRawValue();
    if (this.TicketForm.valid) {
      Swal.fire({
        title: 'Do you want to create this Ticket?',
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: 'Yes, create it!',
        cancelButtonText: 'Cancel',
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
      }).then((result) => {
        if (result.isConfirmed) {
          this._sharedService.setLoading(true);

          this._customerService.addTicket(data).subscribe({
            next: (res: any) => {
              this._sharedService.setLoading(false);

              if (res.status === 201 || res.status === 200) {
                Swal.fire('Created!', res.message, 'success');
                this.goToback();
              } else {
                this._toastrService.warning(res.message);
              }
            },
            error: (err: any) => {
              this._sharedService.setLoading(false);
              if (err.error.status === 422) {
                this._toastrService.warning(err.error.message);
              } else {
                this._toastrService.error('Internal Server Error');
              }
            }
          });
        }
      });
    } else {
      this.TicketForm.markAllAsTouched();
      this._toastrService.warning('Fill required fields');
    }
  }
   //get Ticket by id
  getTicketById(id: any) {
    this._customerService.getTicketById(id).subscribe({
      next: (result: any) => {
        const customerData = result.data;
        this.controls['customer_id'].patchValue(customerData.customer_id)
        this.controls['service_id'].patchValue(customerData.service_id)
        this.controls['ticket_category_id'].patchValue(customerData.ticket_category_id)
        this.controls['department_id'].patchValue(customerData.department_id)
        this.controls['priority_id'].patchValue(customerData.priority_id)
        this.controls['subject'].patchValue(customerData.subject)
        this.controls['message'].patchValue(customerData.description)
        this.controls['ticket_status'].patchValue(customerData.ticket_status)
        this.controls['assigned_to'].patchValue(customerData.assigned_to)
       this.controls['remarks'].patchValue(customerData.ticketStatusHistory[0].remarks)
      }
    })
  }

onFileSelected(event: any) {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = () => {
      const base64String = (reader.result as string).split(',')[1];
      this.TicketForm.patchValue({
        base64PDF: base64String
      });
      console.log("Base64 ready to send:", base64String.substring(0, 100) + "...");
    };
    reader.readAsDataURL(file);
  }
}


  //get Ticket assign to by id
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
  //get status  list...
 getAllDepartmentListWma() {
    this._customerService.getAllDepartmentListWma().subscribe({
      next: (res: any) => {
        if (res.data.length > 0) {
          this.allDepartmentList = res.data;



        }
      }
    });
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

 getAllCompanyListWma() {
  this._customerService.getAllCompanyListWma().subscribe({
    next: (res: any) => {
      if (res.data.length > 0) {
        // Hide or exclude "Customer" department
        this.allCompanyList = res.data
      }
    },
    error: (err) => {
      console.error('Error fetching Company:', err);
    }
  });
}

getAllServiceListWma(id:any) {
    this._customerService.getAllServiceListWma(id).subscribe({
      next: (res: any) => {
        if (res.data.length > 0) {
          this.allServiceList = res.data;
          this.filteredServiceList = this.allServiceList;
        }
      }
    });
  }

  filterService() {
    if (this.searchServiceValue !== '') {
      this.filteredServiceList = this.allServiceList.filter(project =>
        project.service_name.toLowerCase().includes(this.searchServiceValue.toLowerCase())
      );
    } else {
      this.filteredServiceList = this.allServiceList;
    }
  }


  // cancel route location service
  goToback() {
    this.location.back();
  }

}

