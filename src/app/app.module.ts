import { NgModule } from '@angular/core';
import { BrowserModule, Title } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { SharedModule } from './shared/shared.module';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { provideToastr, ToastrModule } from 'ngx-toastr';
import { AuthGuard } from './shared/auth-guard.service';
import { AuthInterceptor } from './shared/auth-interceptor.service';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { AdminSidebarComponent } from './sidebar/admin-sidebar/admin-sidebar.component';
import { CustomerSidebarComponent } from './sidebar/customer-sidebar/customer-sidebar.component';
import { DevelopmentSidebarComponent } from './sidebar/development-sidebar/development-sidebar.component';
import { SuperAdminSidebarComponent } from './sidebar/super-admin-sidebar/super-admin-sidebar.component';

@NgModule({
  declarations: [
    AppComponent,
    AdminSidebarComponent,
    CustomerSidebarComponent,
    DevelopmentSidebarComponent,
    SuperAdminSidebarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    HttpClientModule,
    ToastrModule.forRoot({
      timeOut: 6000,
      positionClass: 'toast-bottom-right',
      preventDuplicates: true,
      closeButton:true
    }),
  ],
  providers: [
AuthGuard,
    Title,
  provideToastr(), provideAnimationsAsync(), // Toastr providers
  {  
    provide: HTTP_INTERCEPTORS,  
    useClass: AuthInterceptor,  
    multi: true  
  },
  { provide: LocationStrategy, useClass: HashLocationStrategy } 
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
