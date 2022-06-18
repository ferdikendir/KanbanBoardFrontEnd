import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskListRoutingModule } from './task-list-routing.module';
import { TableModule } from 'primeng/table';
import { TaskListComponent } from './task-list/task-list.component';
import { ContextMenuModule } from 'primeng/contextmenu';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';



@NgModule({
  declarations: [
    TaskListComponent
  ],
  imports: [
    CommonModule,
    TaskListRoutingModule,
    TableModule,
    ContextMenuModule,
    FormsModule,
    ReactiveFormsModule,
    ButtonModule
  ]
})
export class TaskListModule { }
