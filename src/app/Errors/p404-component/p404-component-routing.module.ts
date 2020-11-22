import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { P404ComponentComponent } from './p404-component.component';

const routes: Routes = [
  {path:'',component:P404ComponentComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class P404ComponentRoutingModule { }
