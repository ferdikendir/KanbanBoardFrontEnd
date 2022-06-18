import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';

const routes: Routes = [
  {
    path: 'dashboard',
    component: DashboardComponent,
    children:[
      {
        path: '',
        loadChildren: () => import('./../project-screen/project.module').then(m => m.ProjectModule)
      },{
        path: '',
        loadChildren: () => import('./../task-list-header/task-list-header.module').then(m => m.TaskListHeaderModule)
      },{
        path: '',
        loadChildren: () => import('./../task-list/task-list.module').then(m => m.TaskListModule)
      },{
        path: '',
        loadChildren: () => import('./../my-profile/my-profile.module').then(m => m.MyProfileModule)
      }
    ]
  },
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class DashboardRoutingModule { }
