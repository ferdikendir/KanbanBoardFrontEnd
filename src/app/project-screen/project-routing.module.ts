import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ProjectListComponent } from './project-list/project-list.component';
import { ProjectDetailComponent } from './project-detail/project-detail.component';

const routes: Routes = [
  {
    path: 'project-list',
    component: ProjectListComponent
  },
  {
    path: 'project-detail/:id',
    component: ProjectDetailComponent,
  }
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class ProjectRoutingModule { }
