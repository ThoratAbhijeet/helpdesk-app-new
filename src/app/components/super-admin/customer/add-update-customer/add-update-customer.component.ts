import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AdminService } from '../../../admin/admin.service';
import { SharedService } from '../../../../shared/shared.service';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-update-customer',
  templateUrl: './add-update-customer.component.html',
  styleUrl: './add-update-customer.component.scss'
})
export class AddUpdateCustomerComponent implements OnInit {
  isEdit = false;
  isCustomerEditable = true;
  UserForm!: FormGroup;
  User_Id: any;
  role_id:any;
  user_ID :any;
  countryCode: string = '';
  allRoleList: Array<any> = [];
  allDepartmentList: any[] = [];
  customerDepartmentList: any[] = [];
  agentDepartmentList: any[] = [];
 allTechnicianEmployeeList: Array<any> = [];
  searchEmployeeValue: string[] = [];
  filteredEmployeeList: any[] = [];
  allServiceList: Array<any> = [];
  allUserAgentList: Array<any> = [];
  userAgentLists: any[][] = [];
  dropdownSettings: any = {};
  filteredRoleList: any[] = [];
  constructor(
    private fb: FormBuilder,
    private _toastrService: ToastrService,
    private _adminService: AdminService,
    private _sharedService: SharedService,
    private url: ActivatedRoute,
    private location: Location,
  ) { }
  ngOnInit(): void {
        const data = localStorage.getItem('data');
    this.user_ID = data ? JSON.parse(data)?.user_id : null;
    this.role_id = data ? JSON.parse(data)?.role_id : null;
    this.createForm();
    this.getAllDepartmentListWma();
    this.getAllRoleListWma();
    this.getAllServiceListWma();
    this.getAllTechnicianEmployeeListWma();
    this.User_Id = this.url.snapshot.params['id'];
    //activate route get employee id
    if (this.User_Id) {
      
      this.getUserById(this.User_Id);
      this.isEdit = true
    }
      this.dropdownSettings = {
    singleSelection: false,
    idField: 'service_id',
    textField: 'service_name',
    selectAllText: 'Select All',
    unSelectAllText: 'Unselect All',
    itemsShowLimit: 3,
    allowSearchFilter: true,
  };

  }
   onPhoneInput(value: string) {
    const phonePattern = /^[0-9]{10}$/;
  }
  //employee form
createForm() {
  this.UserForm = this.fb.group({
    user_name: ['', Validators.required],
    email_id: [
      '',
      [
        Validators.required,
        Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.(com|in|org|net|edu|gov)$/),
      ],
    ],
    phone_number: [
      '',
      [Validators.required, Validators.pattern('^((\\+91-?)|0)?[0-9]{10}$')],
    ],
    role_id: ['', Validators.required],
    department_id: ['', Validators.required],
    company_name: ['', Validators.required],
    address: ['', Validators.required],
    domain: ['', Validators.required],
    isSite: ['', Validators.required],

    // ✅ Use this for multi-select services
    serviceData: [[], Validators.required],

    // ✅ customerAgent array
    customerAgent: this.fb.array([]),
  });

  this.addCustomerAssigned();
}



 get controls() {
  return this.UserForm.controls;
}

get customerAgentArray(): FormArray {
  return this.UserForm.get('customerAgent') as FormArray;
}

  newCustomerAgent(data?: any): FormGroup {
  return this.fb.group({
    user_id: [data?.user_id || '', Validators.required],
    department_id: [
      data?.department_id || '',
      [
        Validators.required,
      ],
    ],
  });
}


  addCustomerAssigned(data?: any) {
    this.customerAgentArray.push(this.newCustomerAgent(data));
    const newIndex = this.customerAgentArray.length - 1;
    this.searchEmployeeValue.push('');

    // Initialize filtered list for new row
    this.filteredEmployeeList[newIndex] = [...this.allTechnicianEmployeeList];
  }

  deleteMeetingAssigned(i: number, agents_id: any) {
  const removeRow = () => {
    this.customerAgentArray.removeAt(i);
    this.filteredEmployeeList.splice(i, 1);
    this.searchEmployeeValue.splice(i, 1);

    // ✅ Reapply filters for all remaining dropdowns
    this.customerAgentArray.controls.forEach((_, idx) =>
      this.filterEmployee(idx)
    );

    if (this.customerAgentArray.length === 0) {
      this.addCustomerAssigned();
    }
  };

  if (this.isEdit) {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You will not be able to recover this item!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, cancel!',
    }).then((result) => {
      if (result.isConfirmed) {
        if (agents_id != null) {
          this.deleteUserAssigned(agents_id);
        }
        removeRow();
        Swal.fire('Deleted!', 'Your item has been deleted.', 'success');
      }
    });
  } else {
    removeRow();
  }
}


  // delete Meeting Assigned..
  deleteUserAssigned(agents_id: any) {
    this._adminService.deleteUserAssigned(agents_id).subscribe({
      next: (res: any) => {
        if (res.data > 0) {
        this._toastrService.success(res.message);
        }
      },
    });
  }
  submit() {
    this.isEdit ? this.editUser() : this.addUser()
  }
  //only 10 digit mob. no 
  allowOnlyDigits(event: KeyboardEvent) {
    const charCode = event.which ? event.which : event.keyCode;
    // Allow only digits (0-9)
    if (charCode < 48 || charCode > 57) {
      event.preventDefault();
    }
  }
  //update User
  editUser() {
    // let data = this.UserForm.getRawValue();
    let data = {
      ...this.UserForm.value,
      isPartner: this.UserForm.value.isPartner ? 'true' : 'false'
    };
    if (this.UserForm.valid) {
      this._sharedService.setLoading(true);
      this._adminService.editUser(this.User_Id, data).subscribe({
        next: (res: any) => {
          if (res.status == 200) {
            this._toastrService.success(res.message);
            this.goToback();
          } else {
            this._toastrService.warning(res.message)
          }
          this._sharedService.setLoading(false);
        },
        error: (err: any) => {
          this._sharedService.setLoading(false);
          if (err.error.status == 401 || err.error.status == 422) {
            this._toastrService.warning(err.error.message)
          } else {
            this._toastrService.error('Internal Server Error')
          }

        }
      })
    } else {
      this.UserForm.markAllAsTouched()
      this._toastrService.warning('Fill required fields')
    }
  }
  //add User
  addUser() {
    let data = this.UserForm.value;
    if (this.UserForm.valid) {
      this._sharedService.setLoading(true);
      this._adminService.addUser(data).subscribe({
        next: (res: any) => {
          if (res.status == 201 || res.status == 200) {
            this._toastrService.success(res.message)
            this.goToback();
          } else {
            this._toastrService.warning(res.message)
          }
          this._sharedService.setLoading(false);
        },
        error: (err: any) => {
          this._sharedService.setLoading(false);
          if (err.error.status == 422) {
            this._toastrService.warning(err.error.message)
          } else {
            this._toastrService.error('Internal Server Error')
          }
        }
      })
    } else {
      this.UserForm.markAllAsTouched()
      this._toastrService.warning('Fill required fields')
    }
  }
  //get employee by id
getUserById(id: any) {
  this._adminService.getCustomerById(id).subscribe({
    next: (result: any) => {
      const userData = result.data;

      // Patch main fieldsrole_id: ['', Validators.required],
      this.controls['user_name'].patchValue(userData.customer_name);
      this.controls['phone_number'].patchValue(userData.phone_number);
      this.controls['email_id'].patchValue(userData.email_id);
      this.controls['company_name'].patchValue(userData.company_name);
        this.controls['address'].patchValue(userData.address);
          this.controls['domain'].patchValue(userData.domain);
          this.controls['department_id'].patchValue(userData.department_id);
      this.controls['role_id'].patchValue(userData.role_id);
          this.controls['isSite'].patchValue(userData.isSite);
      this.onDepartmentChange(userData.department_id);

      //Patch serviceData (convert object array to just IDs)
if (userData.service && userData.service.length > 0) {
  // Find matching service objects from allServiceList
  const selectedServices = this.allServiceList.filter((service: any) =>
    userData.service.some((s: any) => s.service_id === service.service_id)
  );

  this.UserForm.controls['serviceData'].patchValue(selectedServices);
} else {
  this.UserForm.controls['serviceData'].patchValue([]);
}




  // Build/patch customerAgent FormArray
      const customerAgentArray = this.customerAgentArray;
      customerAgentArray.clear();

      if (userData.agent && userData.agent.length > 0) {
        userData.agent.forEach((agent: any, index: number) => {
          const group = this.newCustomerAgent();
          customerAgentArray.push(group);

          // patch department first (so selection triggers proper load flow)
          group.patchValue({ department_id: agent.department_id });

          // fetch userAgent list then patch user_id AFTER response
          // normalize agent.user_id to number if possible to avoid type mismatch
          const selectedUserId = agent.user_id !== null && agent.user_id !== undefined
            ? (isNaN(+agent.user_id) ? agent.user_id : +agent.user_id)
            : null;

          this.getUserAgentById(agent.department_id, index, selectedUserId);
        });
      } else {
        customerAgentArray.push(this.newCustomerAgent());
      }




      // 🟢 Re-fetch technician list *after* patching
      this.getAllTechnicianEmployeeListWma();
    }
  });
}


// 🔹 Fetch all employees (Technician List)
getAllTechnicianEmployeeListWma() {
  this._adminService.getAllTechnicianEmployeeListWma().subscribe({
    next: (res: any) => {
      if (res.data?.length > 0) {
        this.allTechnicianEmployeeList = res.data;

        // Initialize filtered list for each row
        this.filteredEmployeeList = this.customerAgentArray.controls.map(() => [
          ...this.allTechnicianEmployeeList,
        ]);

        // Apply filtering for all
        this.customerAgentArray.controls.forEach((_, idx) =>
          this.filterEmployee(idx)
        );
      }
    },
  });
}

// 🔹 When any employee is selected
onEmployeeSelected(index: number) {
  // Refilter all dropdowns whenever a selection changes
  this.customerAgentArray.controls.forEach((_, idx) => this.filterEmployee(idx));
}

// 🔹 Filter employees for a specific dropdown
filterEmployee(index: number) {
  const searchValue = (this.searchEmployeeValue[index] || '').toLowerCase();

  // ✅ Collect all selected employee IDs (excluding current index)
  const selectedIds = this.customerAgentArray.controls
    .map((ctrl, i) => (i !== index ? ctrl.get('User_Id')?.value : null))
    .filter((id) => !!id);

  // ✅ Clone full employee list
  let list = [...this.allTechnicianEmployeeList];

  // ✅ Apply search filter if applicable
  if (searchValue) {
    list = list.filter((item: any) =>
      item.user_name.toLowerCase().includes(searchValue)
    );
  }

  // ✅ Keep currently selected employee visible for this dropdown
  const currentSelectedId =
    this.customerAgentArray.at(index).get('User_Id')?.value;

  // ✅ Filter out already selected employees in other dropdowns
  this.filteredEmployeeList[index] = list.filter(
    (item: any) =>
      !selectedIds.includes(item.User_Id) || item.User_Id === currentSelectedId
  );
}



getAllDepartmentListWma() {
  this._adminService.getAllDepartmentListWma().subscribe({
    next: (res: any) => {
      if (res.data?.length > 0) {
        this.allDepartmentList = res.data;
        // ✅ Only keep Customer department
        this.customerDepartmentList = this.allDepartmentList.filter(
          (d: any) => d.department_name?.toLowerCase() === 'customer'
        );
       this.agentDepartmentList = this.allDepartmentList.filter(
  (d: any) => d.department_name?.toLowerCase() !== 'customer'
);

      }
    }
  });
}

getAllRoleListWma() {
  this._adminService.getAllRoleListWma().subscribe({
    next: (res: any) => {
      if (res.data?.length > 0) {
        this.allRoleList = res.data;
      }
    }
  });
}
onDepartmentAgentChange(departmentId: number, index: number) {
  this.getUserAgentById(departmentId, index);
}

getUserAgentById(departmentId: number, index: number, selectedUserId?: any) {
  this._adminService.getUserAgentById(departmentId).subscribe({
    next: (res: any) => {
      if (res.data?.length > 0) {
        this.userAgentLists[index] = res.data;
        this.allUserAgentList = res.data;

        // 🟢 Patch user_id after dropdown is ready
        if (selectedUserId) {
          const group = this.customerAgentArray.at(index) as FormGroup;
          group.patchValue({
            user_id: selectedUserId,
          });
        }
      } else {
        this.userAgentLists[index] = [];
      }
    },
  });
}


// prevent selecting same department twice
isAgentAlreadySelected(userId: number, currentIndex: number): boolean {
  return this.customerAgentArray.controls.some((ctrl, index) =>
    index !== currentIndex && ctrl.get('user_id')?.value === userId
  );
}
onDepartmentChange(departmentId: number) {
  const selectedDept = this.customerDepartmentList.find(
    (dept) => dept.department_id === departmentId
  );

  if (selectedDept?.department_name?.toLowerCase() === 'customer') {
    this.filteredRoleList = this.allRoleList.filter(
      (role: any) => role.role_name?.toLowerCase() === 'customer'
    );

    if (this.filteredRoleList.length > 0) {
      this.UserForm.patchValue({
        role_id: this.filteredRoleList[0].role_id
      });
    }
  } else {
    this.filteredRoleList = [];
    this.UserForm.patchValue({ role_id: null });
  }
}
  getAllServiceListWma() {
    this._adminService.getAllServicesListWma().subscribe({
      next: (res: any) => {
        if (res.data.length > 0) {
          this.allServiceList = res.data;

        }
      }
    });
  }
  // cancel route location service
  goToback() {
    this.location.back();
  }


}
