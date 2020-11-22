import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TaskRoutingModule } from './task-routing.module';
import { TaskComponent } from './task.component';
import { DefaultLayoutModule } from '../../default-layout/default-layout.module';

@NgModule({
  declarations: [
    TaskComponent
  ],
  imports: [
    CommonModule,
    DefaultLayoutModule,
    TaskRoutingModule
  ]
})
export class TaskModule { }
