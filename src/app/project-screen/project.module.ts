import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectListComponent } from './project-list/project-list.component';
import { ProjectDetailComponent } from './project-detail/project-detail.component';
import { TableModule } from 'primeng/table';
import { ProjectRoutingModule } from './project-routing.module';

import {ContextMenuModule} from 'primeng/contextmenu';
import {DialogModule} from 'primeng/dialog';
import {ListboxModule} from 'primeng/listbox';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {ButtonModule} from 'primeng/button';
import {DragDropModule} from 'primeng/dragdrop';
import {CheckboxModule} from 'primeng/checkbox';
import { MaterialModule } from './material.module';
import { TaskListComponent } from './task-list/task-list.component';
import { NgbCollapseModule } from '@ng-bootstrap/ng-bootstrap';
import { CardComponent } from './card/card.component';
import {DropdownModule} from 'primeng/dropdown';
import {AvatarModule} from 'primeng/avatar';
import { ToastModule } from 'primeng/toast';
@NgModule({
  declarations: [
    ProjectListComponent,
    ProjectDetailComponent,
    TaskListComponent,
    CardComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ProjectRoutingModule,
    TableModule,
    ContextMenuModule,
    DialogModule,
    ListboxModule,
    InputTextModule,
    ButtonModule,
    DragDropModule,
    CheckboxModule,
    MaterialModule,
    NgbCollapseModule,
    DropdownModule,
    AvatarModule,
    ToastModule
  ]
})
export class ProjectModule { }
