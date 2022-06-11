import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { MenuItem } from 'primeng/api';
import { finalize, Observable } from 'rxjs';
import { LoginService } from 'src/app/login-screen/login.service';
import { Project } from 'src/model/project';
import { ProjectUserAdd } from 'src/model/project-user-add';
import { TaskListHeader } from 'src/model/task-list-header';
import { ProjectService } from '../project.service';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.scss'],
})
export class ProjectListComponent implements OnInit {
  projects: Project[] = [];
  items: MenuItem[];
  selectedProject: Project;
  selectedUser: any;
  userList: any[] = [];

  showAddUserDialogModal: boolean = false;
  showAddTaskListHeaderDialogModal: boolean = false;
  showAddNewTaskListHeader = false;

  selectedTaskListHeader: TaskListHeader[] = [];
  defaultTaskListHeader: TaskListHeader[] = [];

  addEmailToProject: any = '';
  addNewTaskHeader: string = '';

  taskListHeader$: Observable<TaskListHeader[]>;

  addTaskListHeaderObj: TaskListHeader;

  constructor(
    private loginService: LoginService,
    private spinner: NgxSpinnerService,
    private projectService: ProjectService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getAllTaskListHeader();
    this.createNewTaskListHeaderObject();
    this.getAllProjects();
    this.items = [
      {
        label: 'View',
        icon: 'pi pi-fw pi-search',
        command: (event) =>
          this.router.navigate([
            'dashboard/project-detail',
            this.selectedProject.id,
          ]),
      },
      {
        label: 'Add User',
        icon: 'pi pi-fw pi-times',
        command: (event) => this.getAllUserByProjectId(),
      },
      {
        label: 'Add Task List',
        icon: 'pi pi-fw pi-times',
        command: (event) => this.getAllTaskListHeaderByProjectId(),
      },
    ];
  }

  getAllProjects() {
    this.spinner.show();
    this.projectService
      .getAllProjects<any>(this.loginService.currentUserValue.id)
      .subscribe(
        (response) => {
          this.projects = response.map((res) => res?.project);
          this.spinner.hide();
        },
        (error) => {
          this.spinner.hide();
        }
      );
  }

  getAllUserByProjectId() {
    this.spinner.show();
    this.projectService
      .getAllUserByProjectId<any>(this.selectedProject.id)
      .subscribe(
        (response) => {
          this.userList = response.map((res) => res?.user);
          this.spinner.hide();
          this.showAddUserDialogModal = true;
        },
        (error) => {
          this.spinner.hide();
        }
      );
  }

  addToList() {
    const isExist = this.userList.some(
      (user) => user.email === this.addEmailToProject
    );
    if (isExist) {
      alert('User already exist');
      return;
    }
    this.userList.push({
      email: this.addEmailToProject,
    });
    this.userList = [...this.userList];
    this.addEmailToProject = '';
  }

  deleteToList(item) {
    console.log(item);
    this.userList = [
      ...this.userList.filter((user) => user.email !== item.email),
    ];
  }

  addUserToProject() {
    this.spinner.show();
    const projectUser: ProjectUserAdd = {
      projectId: this.selectedProject.id,
      mailList: this.userList.map((user) => user.email),
    };

    this.projectService.addUserToProject<any>(projectUser).subscribe(
      (response) => {
        this.spinner.hide();
        this.showAddUserDialogModal = false;
      },
      (error) => {
        this.spinner.hide();
        this.showAddUserDialogModal = false;
      }
    );
  }

  addSelectedHeadersToProject() {
    this.spinner.show();
    this.selectedTaskListHeader = this.selectedTaskListHeader.filter(
      (header) => !this.disabledHeader(header)
    );
    const addedObj = {
      projectId: this.selectedProject.id,
      headerIds: this.selectedTaskListHeader,
    };
    this.projectService
      .addHeaderToProject(addedObj)
      .pipe(
        finalize(() => {
          this.spinner.hide();
          this.showAddTaskListHeaderDialogModal = false;
        })
      )
      .subscribe(
        (response) => {},
      );
  }

  addNewTaskListHeader() {
    this.spinner.show();
    this.projectService
      .addNewTaskListHeader(this.addTaskListHeaderObj)
      .pipe(finalize(() => {

          this.spinner.hide();
          this.showAddNewTaskListHeader = false;
          this.createNewTaskListHeaderObject();
      }))
      .subscribe(
        (response) => {
          this.getAllTaskListHeader();
        }
      );
  }

  createNewTaskListHeaderObject() {
    this.addTaskListHeaderObj = {
      header: '',
      isAddable: true,
    };
  }

  getAllTaskListHeader() {
    this.taskListHeader$ = this.projectService.getAllTaskListHeader();
  }

  getAllTaskListHeaderByProjectId() {
    this.spinner.show();
    this.projectService
      .getAllTaskListHeaderByProjectId(this.selectedProject?.id)
      .pipe(finalize(() => {

          this.spinner.hide();
          this.showAddTaskListHeaderDialogModal = true;
      }))
      .subscribe(
        (response: any) => {
          this.selectedTaskListHeader = response.map(
            (res) => res?.taskListHeader.id
          );
          this.defaultTaskListHeader = response.map(
            (res) => res?.taskListHeader.id
          );
        }
      );
  }

  disabledHeader(item) {
    return this.defaultTaskListHeader.some((header) => header === item);
  }
}
