import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgOtpInputModule } from 'ng-otp-input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { MatSelectModule } from '@angular/material/select';
import { MatTabsModule } from '@angular/material/tabs';
import { MatPaginatorModule } from '@angular/material/paginator';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { NgChartsModule } from 'ng2-charts';
import { MatDialogModule } from '@angular/material/dialog';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatPaginatorModule,
    MatSelectModule,
    NgxMatSelectSearchModule,
    FormsModule,
    MatFormFieldModule,
     NgOtpInputModule,
     MatTabsModule,
     MatSlideToggleModule,
     NgChartsModule,
     MatDialogModule,
     NgMultiSelectDropDownModule,
     
  ],
  exports:[
    CommonModule,
    ReactiveFormsModule,
    MatPaginatorModule,
    MatSelectModule,
    NgxMatSelectSearchModule,
    FormsModule,
    MatFormFieldModule,
     NgOtpInputModule,
     MatTabsModule,
     MatSlideToggleModule,
     NgChartsModule,
     MatDialogModule,
     NgMultiSelectDropDownModule,


    
  ],
})
export class SharedModule { }
