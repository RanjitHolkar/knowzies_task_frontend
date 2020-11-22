import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { P404ComponentRoutingModule } from './p404-component-routing.module';
import { P404ComponentComponent } from './p404-component.component';


@NgModule({
  declarations: [P404ComponentComponent],
  imports: [
    CommonModule,
    P404ComponentRoutingModule
  ]
})
export class P404ComponentModule { }
