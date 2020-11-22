import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EmpTaskComponent } from './emp-task.component';

const routes: Routes = [
  {path:'',component:EmpTaskComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmpTaskRoutingModule { }
