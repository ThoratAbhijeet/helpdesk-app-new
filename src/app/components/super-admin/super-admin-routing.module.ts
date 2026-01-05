import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../../shared/auth-guard.service';
import { MastersComponent } from './masters/masters.component';
import { TicketsComponent } from './tickets/tickets.component';
import { ReportsComponent } from './reports/reports.component';
import { AddUpdateDepartmentComponent } from './department/add-update-department/add-update-department.component';
import { ViewDepartmentComponent } from './department/view-department/view-department.component';
import { AddUpdateRoleComponent } from './role/add-update-role/add-update-role.component';
import { ViewRoleComponent } from './role/view-role/view-role.component';
import { AddUpdateCategoryComponent } from './category/add-update-category/add-update-category.component';
import { ViewCategoryComponent } from './category/view-category/view-category.component';
import { AddUpdatePriorityComponent } from './priority/add-update-priority/add-update-priority.component';
import { ViewPriorityComponent } from './priority/view-priority/view-priority.component';
import { AddUpdateTicketComponent } from './tickets/add-update-ticket/add-update-ticket.component';
import { ViewTicketComponent } from './tickets/view-ticket/view-ticket.component';
import { CustomerComponent } from './customer/customer.component';
import { AddUpdateCustomerComponent } from './customer/add-update-customer/add-update-customer.component';
import { ViewCustomerComponent } from './customer/view-customer/view-customer.component';
import { SuperAdminDashboardComponent } from './super-admin-dashboard/super-admin-dashboard.component';
import { ViewServiceComponent } from './services/view-service/view-service.component';
import { AddUpdateServiceComponent } from './services/add-update-service/add-update-service.component';
import { AddUpdateEmployeeComponent } from './employee/add-update-employee/add-update-employee.component';
import { ViewEmployeeComponent } from './employee/view-employee/view-employee.component';
import { LogReportsComponent } from './reports/log-reports/log-reports.component';

const routes: Routes = [
  { path: "", redirectTo: "super", pathMatch: "full" },
  {
    path: "super-admin-dashboard",
    component: SuperAdminDashboardComponent,
    pathMatch: "full",
    outlet: "super_menu",
    canActivate: [AuthGuard]
  },
   {
      path: "customer",
      component: CustomerComponent,
      pathMatch: "full",
      outlet: "super_menu",
      canActivate: [AuthGuard]
    },
    {
      path: "add-customer",
      component: AddUpdateCustomerComponent,
      pathMatch: "full",
      outlet: "super_menu",
      canActivate: [AuthGuard]
    },
    {
      path: "update-customer/:id",
      component: AddUpdateCustomerComponent,
      outlet: "super_menu",
      canActivate: [AuthGuard]
    },
    {
      path: "view-customer/:id",
      component: ViewCustomerComponent,
      outlet: "super_menu",
      canActivate: [AuthGuard]
    },
  {
    path: "master",
    component: MastersComponent,
    pathMatch: "full",
    outlet: "super_menu",
    canActivate: [AuthGuard]
  },
  {
    path: "add-department",
    component: AddUpdateDepartmentComponent,
    pathMatch: "full",
    outlet: "super_menu",
    canActivate: [AuthGuard]
  },
  {
    path: "update-department/:id",
    component: AddUpdateDepartmentComponent,
    outlet: "super_menu",
    canActivate: [AuthGuard]
  },
  {
    path: "view-department/:id",
    component: ViewDepartmentComponent,
    outlet: "super_menu",
    canActivate: [AuthGuard]
  },
  {
    path: "add-role",
    component: AddUpdateRoleComponent,
    pathMatch: "full",
    outlet: "super_menu",
    canActivate: [AuthGuard]
  },
  {
    path: "update-role/:id",
    component: AddUpdateRoleComponent,
    outlet: "super_menu",
    canActivate: [AuthGuard]
  },
  {
    path: "view-role/:id",
    component: ViewRoleComponent,
    outlet: "super_menu",
    canActivate: [AuthGuard]
  },
  {
    path: "add-category",
    component: AddUpdateCategoryComponent,
    pathMatch: "full",
    outlet: "super_menu",
    canActivate: [AuthGuard]
  },
  {
    path: "update-category/:id",
    component: AddUpdateCategoryComponent,
    outlet: "super_menu",
    canActivate: [AuthGuard]
  },
  {
    path: "view-category/:id",
    component: ViewCategoryComponent,
    outlet: "super_menu",
    canActivate: [AuthGuard]
  },
  {
    path: "add-priority",
    component: AddUpdatePriorityComponent,
    pathMatch: "full",
    outlet: "super_menu",
    canActivate: [AuthGuard]
  },
  {
    path: "update-priority/:id",
    component: AddUpdatePriorityComponent,
    outlet: "super_menu",
    canActivate: [AuthGuard]
  },
  {
    path: "view-priority/:id",
    component: ViewPriorityComponent,
    outlet: "super_menu",
    canActivate: [AuthGuard]
  },
  {
    path: "add-service",
    component: AddUpdateServiceComponent,
    pathMatch: "full",
    outlet: "super_menu",
    canActivate: [AuthGuard]
  },
  {
    path: "update-service/:id",
    component: AddUpdateServiceComponent,
    outlet: "super_menu",
    canActivate: [AuthGuard]
  },
  {
    path: "view-service/:id",
    component: ViewServiceComponent,
    outlet: "super_menu",
    canActivate: [AuthGuard]
  },
   {
    path: "add-employee",
    component: AddUpdateEmployeeComponent,
    pathMatch: "full",
    outlet: "super_menu",
    canActivate: [AuthGuard]
  },
  {
    path: "update-employee/:id",
    component: AddUpdateEmployeeComponent,
    outlet: "super_menu",
    canActivate: [AuthGuard]
  },
  {
    path: "view-employee/:id",
    component: ViewEmployeeComponent,
    outlet: "super_menu",
    canActivate: [AuthGuard]
  },
  {
    path: "tickets",
    component: TicketsComponent,
    pathMatch: "full",
    outlet: "super_menu",
    canActivate: [AuthGuard]
  },
  {
    path: "add-tickets",
    component: AddUpdateTicketComponent,
    pathMatch: "full",
    outlet: "super_menu",
    canActivate: [AuthGuard]
  },
  {
    path: "update-tickets/:id",
    component: AddUpdateTicketComponent,
    outlet: "super_menu",
    canActivate: [AuthGuard]
  },
  {
    path: "view-tickets/:id",
    component: ViewTicketComponent,
    outlet: "super_menu",
    canActivate: [AuthGuard]
  },
  {
    path: "report",
    component: ReportsComponent,
    pathMatch: "full",
    outlet: "super_menu",
    canActivate: [AuthGuard]
  },
    {
    path: "log-report",
    component: LogReportsComponent,
    pathMatch: "full",
    outlet: "super_menu",
    canActivate: [AuthGuard]
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SuperAdminRoutingModule { }
