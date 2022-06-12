import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { TaskListHeaderComponent } from './task-list-header/task-list-header.component';

const routes: Routes = [
  {
    path: 'task-list-header',
    component: TaskListHeaderComponent
  }
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class TaskListHeaderRoutingModule { }
