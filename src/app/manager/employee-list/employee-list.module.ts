import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmployeeListRoutingModule } from './employee-list-routing.module';
import { EmployeeListComponent } from './employee-list.component';
import { DefaultLayoutModule } from '../../default-layout/default-layout.module';


@NgModule({
  declarations: [EmployeeListComponent],
  imports: [
    CommonModule,
    DefaultLayoutModule,
    EmployeeListRoutingModule
  ]
})
export class EmployeeListModule { }
