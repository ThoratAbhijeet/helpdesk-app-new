import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CustomerRoutingModule } from './customer-routing.module';
import { CustomerDashboardComponent } from './customer-dashboard/customer-dashboard.component';
import { ReportsComponent } from './reports/reports.component';
import { TicketsComponent } from './tickets/tickets.component';
import { AddUpdateTicketsComponent } from './tickets/add-update-tickets/add-update-tickets.component';
import { ViewTicketsComponent } from './tickets/view-tickets/view-tickets.component';
import { SharedModule } from '../../shared/shared.module';


@NgModule({
  declarations: [
    CustomerDashboardComponent,
    ReportsComponent,
    TicketsComponent,
    AddUpdateTicketsComponent,
    ViewTicketsComponent
  ],
  imports: [
    CommonModule,
    CustomerRoutingModule,
  SharedModule
  ]
})
export class CustomerModule { }
