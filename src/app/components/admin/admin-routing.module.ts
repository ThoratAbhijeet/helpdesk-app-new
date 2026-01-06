import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { AuthGuard } from '../../shared/auth-guard.service';
import { MastersComponent } from './masters/masters.component';
import { AddUpdateDepartmentComponent } from './department/add-update-department/add-update-department.component';
import { ViewDepartmentComponent } from './department/view-department/view-department.component';
import { ViewRoleComponent } from './role/view-role/view-role.component';
import { AddUpdateRoleComponent } from './role/add-update-role/add-update-role.component';
import { ViewCategoryComponent } from './category/view-category/view-category.component';
import { AddUpdateCategoryComponent } from './category/add-update-category/add-update-category.component';
import { AddUpdatePriorityComponent } from './priority/add-update-priority/add-update-priority.component';
import { ViewPriorityComponent } from './priority/view-priority/view-priority.component';
import { TicketsComponent } from './tickets/tickets.component';
import { AddUpdateTicketsComponent } from './tickets/add-update-tickets/add-update-tickets.component';
import { ViewTicketsComponent } from './tickets/view-tickets/view-tickets.component';
import { ReportsComponent } from './reports/reports.component';
import { ViewUserComponent } from './user/view-user/view-user.component';
import { AddUpdateUserComponent } from './user/add-update-user/add-update-user.component';
import { UserComponent } from './user/user.component';
import { LogReportsComponent } from './reports/log-reports/log-reports.component';

const routes: Routes = [
  { path: "", redirectTo: "customer", pathMatch: "full" },
    {
    path: "user",
    component: UserComponent,
    pathMatch: "full",
    outlet: "customer_menu",
    canActivate: [AuthGuard]
  },
  {
    path: "add-user",
    component: AddUpdateUserComponent,
    pathMatch: "full",
    outlet: "customer_menu",
    canActivate: [AuthGuard]
  },
  {
    path: "update-user/:id",
    component: AddUpdateUserComponent,
    outlet: "customer_menu",
    canActivate: [AuthGuard]
  },
  {
    path: "view-user/:id",
    component: ViewUserComponent,
    outlet: "customer_menu",
    canActivate: [AuthGuard]
  },
  {
    path: "customer-dashboard",
    component: AdminDashboardComponent,
    pathMatch: "full",
    outlet: "customer_menu",
    canActivate: [AuthGuard]
  },
  {
    path: "master",
    component: MastersComponent,
    pathMatch: "full",
    outlet: "customer_menu",
    canActivate: [AuthGuard]
  },
  {
    path: "add-department",
    component: AddUpdateDepartmentComponent,
    pathMatch: "full",
    outlet: "customer_menu",
    canActivate: [AuthGuard]
  },
  {
    path: "update-department/:id",
    component: AddUpdateDepartmentComponent,
    outlet: "customer_menu",
    canActivate: [AuthGuard]
  },
  {
    path: "view-department/:id",
    component: ViewDepartmentComponent,
    outlet: "customer_menu",
    canActivate: [AuthGuard]
  },
  {
    path: "add-role",
    component: AddUpdateRoleComponent,
    pathMatch: "full",
    outlet: "customer_menu",
    canActivate: [AuthGuard]
  },
  {
    path: "update-role/:id",
    component: AddUpdateRoleComponent,
    outlet: "customer_menu",
    canActivate: [AuthGuard]
  },
  {
    path: "view-role/:id",
    component: ViewRoleComponent,
    outlet: "customer_menu",
    canActivate: [AuthGuard]
  },
  {
    path: "add-category",
    component: AddUpdateCategoryComponent,
    pathMatch: "full",
    outlet: "customer_menu",
    canActivate: [AuthGuard]
  },
  {
    path: "update-category/:id",
    component: AddUpdateCategoryComponent,
    outlet: "customer_menu",
    canActivate: [AuthGuard]
  },
  {
    path: "view-category/:id",
    component: ViewCategoryComponent,
    outlet: "customer_menu",
    canActivate: [AuthGuard]
  },
  {
    path: "add-priority",
    component: AddUpdatePriorityComponent,
    pathMatch: "full",
    outlet: "customer_menu",
    canActivate: [AuthGuard]
  },
  {
    path: "update-priority/:id",
    component: AddUpdatePriorityComponent,
    outlet: "customer_menu",
    canActivate: [AuthGuard]
  },
  {
    path: "view-priority/:id",
    component: ViewPriorityComponent,
    outlet: "customer_menu",
    canActivate: [AuthGuard]
  },
  {
    path: "tickets",
    component: TicketsComponent,
    pathMatch: "full",
    outlet: "customer_menu",
    canActivate: [AuthGuard]
  },
  {
    path: "add-tickets",
    component: AddUpdateTicketsComponent,
    pathMatch: "full",
    outlet: "customer_menu",
    canActivate: [AuthGuard]
  },
  {
    path: "update-tickets/:id",
    component: AddUpdateTicketsComponent,
    outlet: "customer_menu",
    canActivate: [AuthGuard]
  },
  {
    path: "view-tickets/:id",
    component: ViewTicketsComponent,
    outlet: "customer_menu",
    canActivate: [AuthGuard]
  },
  {
    path: "report",
    component: ReportsComponent,
    pathMatch: "full",
    outlet: "customer_menu",
    canActivate: [AuthGuard]
  },
    {
    path: "log-report",
    component: LogReportsComponent,
    pathMatch: "full",
    outlet: "customer_menu",
    canActivate: [AuthGuard]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
