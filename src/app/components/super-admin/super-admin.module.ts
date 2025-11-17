import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SuperAdminRoutingModule } from './super-admin-routing.module';
import { SuperAdminDashboardComponent } from './super-admin-dashboard/super-admin-dashboard.component';
import { CategoryComponent } from './category/category.component';
import { DepartmentComponent } from './department/department.component';
import { MastersComponent } from './masters/masters.component';
import { PriorityComponent } from './priority/priority.component';
import { ReportsComponent } from './reports/reports.component';
import { RoleComponent } from './role/role.component';
import { TicketsComponent } from './tickets/tickets.component';
import { AddUpdateCategoryComponent } from './category/add-update-category/add-update-category.component';
import { ViewCategoryComponent } from './category/view-category/view-category.component';
import { AddUpdateDepartmentComponent } from './department/add-update-department/add-update-department.component';
import { ViewDepartmentComponent } from './department/view-department/view-department.component';
import { AddUpdatePriorityComponent } from './priority/add-update-priority/add-update-priority.component';
import { ViewPriorityComponent } from './priority/view-priority/view-priority.component';
import { AddUpdateRoleComponent } from './role/add-update-role/add-update-role.component';
import { ViewRoleComponent } from './role/view-role/view-role.component';
import { CustomerComponent } from './customer/customer.component';
import { AddUpdateCustomerComponent } from './customer/add-update-customer/add-update-customer.component';
import { ViewCustomerComponent } from './customer/view-customer/view-customer.component';
import { ServicesComponent } from './services/services.component';
import { AddUpdateServiceComponent } from './services/add-update-service/add-update-service.component';
import { ViewServiceComponent } from './services/view-service/view-service.component';
import { AddUpdateTicketComponent } from './tickets/add-update-ticket/add-update-ticket.component';
import { ViewTicketComponent } from './tickets/view-ticket/view-ticket.component';
import { SharedModule } from '../../shared/shared.module';
import { EmployeeComponent } from './employee/employee.component';
import { AddUpdateEmployeeComponent } from './employee/add-update-employee/add-update-employee.component';
import { ViewEmployeeComponent } from './employee/view-employee/view-employee.component';


@NgModule({
  declarations: [
    SuperAdminDashboardComponent,
    CategoryComponent,
    DepartmentComponent,
    MastersComponent,
    PriorityComponent,
    ReportsComponent,
    RoleComponent,
    TicketsComponent,
    AddUpdateCategoryComponent,
    ViewCategoryComponent,
    AddUpdateDepartmentComponent,
    ViewDepartmentComponent,
    AddUpdatePriorityComponent,
    ViewPriorityComponent,
    AddUpdateRoleComponent,
    ViewRoleComponent,
    CustomerComponent,
    AddUpdateCustomerComponent,
    ViewCustomerComponent,
    ServicesComponent,
    AddUpdateServiceComponent,
    ViewServiceComponent,
    AddUpdateTicketComponent,
    ViewTicketComponent,
    EmployeeComponent,
    AddUpdateEmployeeComponent,
    ViewEmployeeComponent
  ],
  imports: [
    CommonModule,
    SuperAdminRoutingModule,
    SharedModule
  ]
})
export class SuperAdminModule { }
