import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren:() => import('./login/login.module').then(m =>m.LoginModule),
  },
  {
    path: 'employee-list',
    loadChildren:() => import('./manager/employee-list/employee-list.module').then(m =>m.EmployeeListModule),canActivate: [AuthGuard],  data: {    expectedRole: 'manager'  }
  },
  {
    path: 'add_employee',
    loadChildren:() => import('./manager/employee-list/employee-action/employee-action.module').then(m =>m.EmployeeActionModule),canActivate: [AuthGuard],  data: {    expectedRole: 'manager'  }
  },
  {
    path: 'edit-employee/:emp_id',
    loadChildren:() => import('./manager/employee-list/employee-action/employee-action.module').then(m =>m.EmployeeActionModule),canActivate: [AuthGuard],  data: {    expectedRole: 'manager'  }
  },
  {
    path: 'task-list',
    loadChildren:() => import('./manager/task/task.module').then(m =>m.TaskModule),canActivate: [AuthGuard],  data: { expectedRole: 'manager' }
  },
  {
    path: 'add-task',
    loadChildren:() => import('./manager/task/task-action/task-action.module').then(m =>m.TaskActionModule),canActivate: [AuthGuard],  data: { expectedRole: 'manager' }
  },
  {
    path: 'edit-task/:task_id',
    loadChildren:() => import('./manager/task/task-action/task-action.module').then(m =>m.TaskActionModule),canActivate: [AuthGuard],  data: { expectedRole: 'manager' }
  },
  /* Employee Route Start*/
  {
    path: 'emp-task',
    loadChildren:() => import('./employee/emp-task/emp-task.module').then(m =>m.EmpTaskModule),canActivate: [AuthGuard],  data: { expectedRole: 'employee' }
  },
  { path: 'erroe404',
    loadChildren: () => import('./Errors/p404-component/p404-component.module').then(m =>m.P404ComponentModule)
  },
  { path: '**',
    loadChildren: () => import('./Errors/p404-component/p404-component.module').then(m =>m.P404ComponentModule)
  }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
