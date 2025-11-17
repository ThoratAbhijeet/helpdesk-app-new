import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DevelopmentRoutingModule } from './development-routing.module';
import { DevelopmentDashboardComponent } from './development-dashboard/development-dashboard.component';
import { ReportsComponent } from './reports/reports.component';
import { TicketsComponent } from './tickets/tickets.component';
import { AddUpdateTicketComponent } from './tickets/add-update-ticket/add-update-ticket.component';
import { ViewTicketComponent } from './tickets/view-ticket/view-ticket.component';
import { SharedModule } from '../../shared/shared.module';


@NgModule({
  declarations: [
    DevelopmentDashboardComponent,
    ReportsComponent,
    TicketsComponent,
    AddUpdateTicketComponent,
    ViewTicketComponent
  ],
  imports: [
    CommonModule,
    DevelopmentRoutingModule,
    SharedModule
  ]
})
export class DevelopmentModule { }
