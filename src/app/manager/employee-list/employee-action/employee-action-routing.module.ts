import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EmployeeActionComponent } from './employee-action.component';

const routes: Routes = [
  {path:'', component:EmployeeActionComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmployeeActionRoutingModule { }
