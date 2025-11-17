import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { CategoryComponent } from './category/category.component';
import { DepartmentComponent } from './department/department.component';
import { MastersComponent } from './masters/masters.component';
import { PriorityComponent } from './priority/priority.component';
import { ReportsComponent } from './reports/reports.component';
import { RoleComponent } from './role/role.component';
import { TicketsComponent } from './tickets/tickets.component';
import { SharedModule } from '../../shared/shared.module';
import { AddUpdateCategoryComponent } from './category/add-update-category/add-update-category.component';
import { ViewCategoryComponent } from './category/view-category/view-category.component';
import { AddUpdateDepartmentComponent } from './department/add-update-department/add-update-department.component';
import { ViewDepartmentComponent } from './department/view-department/view-department.component';
import { AddUpdatePriorityComponent } from './priority/add-update-priority/add-update-priority.component';
import { ViewPriorityComponent } from './priority/view-priority/view-priority.component';
import { AddUpdateRoleComponent } from './role/add-update-role/add-update-role.component';
import { ViewRoleComponent } from './role/view-role/view-role.component';
import { AddUpdateTicketsComponent } from './tickets/add-update-tickets/add-update-tickets.component';
import { ViewTicketsComponent } from './tickets/view-tickets/view-tickets.component';
import { ServicesComponent } from './services/services.component';
import { AddUpdateServiceComponent } from './services/add-update-service/add-update-service.component';
import { ViewServiceComponent } from './services/view-service/view-service.component';
import { UserComponent } from './user/user.component';
import { AddUpdateUserComponent } from './user/add-update-user/add-update-user.component';
import { ViewUserComponent } from './user/view-user/view-user.component';


@NgModule({
  declarations: [
    AdminDashboardComponent,
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
    AddUpdateTicketsComponent,
    ViewTicketsComponent,
    ServicesComponent,
    AddUpdateServiceComponent,
    ViewServiceComponent,
    UserComponent,
    AddUpdateUserComponent,
    ViewUserComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    SharedModule
  ]
})
export class AdminModule { }
