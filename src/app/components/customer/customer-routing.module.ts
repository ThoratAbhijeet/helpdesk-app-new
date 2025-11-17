import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomerDashboardComponent } from './customer-dashboard/customer-dashboard.component';
import { AuthGuard } from '../../shared/auth-guard.service';
import { TicketsComponent } from './tickets/tickets.component';
import { AddUpdateTicketsComponent } from './tickets/add-update-tickets/add-update-tickets.component';
import { ViewTicketsComponent } from './tickets/view-tickets/view-tickets.component';
import { ReportsComponent } from './reports/reports.component';

const routes: Routes = [
   { path: "", redirectTo: "employee", pathMatch: "full" },
      {
        path: "employee-dashboard",
        component: CustomerDashboardComponent,
        pathMatch: "full",
        outlet: "employee_menu",
        canActivate: [AuthGuard]
      },
       {
        path: "tickets",
        component: TicketsComponent,
        pathMatch: "full",
        outlet: "employee_menu",
        canActivate: [AuthGuard]
      },
       {
          path: "add-tickets",
          component: AddUpdateTicketsComponent,
          pathMatch: "full",
          outlet: "employee_menu",
          canActivate: [AuthGuard]
        },
        {
          path: "update-tickets/:id",
          component: AddUpdateTicketsComponent,
          outlet: "employee_menu",
          canActivate: [AuthGuard]
        },
        {
          path: "view-tickets/:id",
          component: ViewTicketsComponent,
          outlet: "employee_menu",
          canActivate: [AuthGuard]
        },
          {
            path: "report",
            component: ReportsComponent,
            pathMatch: "full",
            outlet: "employee_menu",
            canActivate: [AuthGuard]
          },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomerRoutingModule { }
