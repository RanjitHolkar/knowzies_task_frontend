import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmpTaskRoutingModule } from './emp-task-routing.module';
import { EmpTaskComponent } from './emp-task.component';
import { DefaultLayoutModule } from '../../default-layout/default-layout.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [EmpTaskComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    DefaultLayoutModule,
    EmpTaskRoutingModule
  ]
})
export class EmpTaskModule { }
