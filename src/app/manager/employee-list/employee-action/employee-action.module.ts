import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmployeeActionRoutingModule } from './employee-action-routing.module';
import { EmployeeActionComponent } from './employee-action.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DefaultLayoutModule } from '../../../default-layout/default-layout.module';


@NgModule({
  declarations: [EmployeeActionComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    DefaultLayoutModule,
    EmployeeActionRoutingModule
  ]
})
export class EmployeeActionModule { }
