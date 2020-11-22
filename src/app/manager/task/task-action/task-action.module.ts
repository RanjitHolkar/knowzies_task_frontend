import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TaskActionRoutingModule } from './task-action-routing.module';
import { TaskActionComponent } from './task-action.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DefaultLayoutModule } from '../../../default-layout/default-layout.module';


@NgModule({
  declarations: [TaskActionComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    DefaultLayoutModule,
    TaskActionRoutingModule
  ]
})
export class TaskActionModule { }
