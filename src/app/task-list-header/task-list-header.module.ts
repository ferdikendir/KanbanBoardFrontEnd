import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskListHeaderRoutingModule } from './task-list-header-routing.module';
import { TaskListHeaderComponent } from './task-list-header/task-list-header.component';
import { TableModule } from 'primeng/table';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import {CheckboxModule} from 'primeng/checkbox';
import {DialogModule} from 'primeng/dialog';
import { ToastModule } from 'primeng/toast';


@NgModule({
  declarations: [
    TaskListHeaderComponent,
  ],
  imports: [
    CommonModule,
    TaskListHeaderRoutingModule,
    TableModule,
    FormsModule,
    ReactiveFormsModule,
    ButtonModule,
    InputTextModule,
    CheckboxModule,
    DialogModule,
    ToastModule
  ]
})
export class TaskListHeaderModule { }
