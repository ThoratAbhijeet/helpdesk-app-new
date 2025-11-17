import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DevelopmentDashboardComponent } from './development-dashboard/development-dashboard.component';
import { AuthGuard } from '../../shared/auth-guard.service';
import { ViewTicketComponent } from './tickets/view-ticket/view-ticket.component';
import { AddUpdateTicketComponent } from './tickets/add-update-ticket/add-update-ticket.component';
import { TicketsComponent } from './tickets/tickets.component';
import { ReportsComponent } from './reports/reports.component';


const routes: Routes = [
  { path: "", redirectTo: "developments", pathMatch: "full" },
  {
    path: "development-dashboard",
    component: DevelopmentDashboardComponent,
    pathMatch: "full",
    outlet: "development_menu",
    canActivate: [AuthGuard]
  },
  {
    path: "tickets",
    component: TicketsComponent,
    pathMatch: "full",
    outlet: "development_menu",
    canActivate: [AuthGuard]
  },
  {
    path: "add-tickets",
    component: AddUpdateTicketComponent,
    pathMatch: "full",
    outlet: "development_menu",
    canActivate: [AuthGuard]
  },
  {
    path: "update-tickets/:id",
    component: AddUpdateTicketComponent,
    outlet: "development_menu",
    canActivate: [AuthGuard]
  },
  {
    path: "view-tickets/:id",
    component: ViewTicketComponent,
    outlet: "development_menu",
    canActivate: [AuthGuard]
  },
   {
    path: "report",
    component: ReportsComponent,
    pathMatch: "full",
    outlet: "development_menu",
    canActivate: [AuthGuard]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DevelopmentRoutingModule { }
