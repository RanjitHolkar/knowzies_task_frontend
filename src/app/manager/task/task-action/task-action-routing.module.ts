import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TaskActionComponent } from './task-action.component';

const routes: Routes = [
  {path:'', component:TaskActionComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TaskActionRoutingModule { }
