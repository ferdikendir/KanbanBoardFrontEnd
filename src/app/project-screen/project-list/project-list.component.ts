import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Select, Store } from '@ngxs/store';
import { NgxSpinnerService } from 'ngx-spinner';
import { MenuItem, MessageService } from 'primeng/api';
import { finalize, Observable } from 'rxjs';
import { LoginService } from 'src/app/login-screen/login.service';
import { Project } from 'src/model/project';
import { ProjectUserAdd } from 'src/model/project-user-add';
import { TaskListHeader } from 'src/model/task-list-header';
import { ProjectService } from '../project.service';
import { ProjectAction } from '../state/project.action';
import { ProjectState } from '../state/project.state';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.scss'],
  providers: [MessageService]
})
export class ProjectListComponent implements OnInit {
  @Select (ProjectState.getProjects) projects$: Observable<Project[]>;

  projects: Project[] = [];
  items: MenuItem[];
  selectedProject: Project;
  selectedUser: any;
  userList: any[] = [];

  showAddUserDialogModal: boolean = false;
  showAddTaskListHeaderDialogModal: boolean = false;
  showAddNewTaskListHeader = false;

  showNewProjectDialog = false;

  selectedTaskListHeader: TaskListHeader[] = [];
  defaultTaskListHeader: TaskListHeader[] = [];

  addEmailToProject: any = '';
  addNewTaskHeader: string = '';

  taskListHeader$: Observable<TaskListHeader[]>;

  addTaskListHeaderObj: TaskListHeader;

  projectForm: FormGroup

  constructor(
    private loginService: LoginService,
    private spinner: NgxSpinnerService,
    private projectService: ProjectService,
    private router: Router,
    private fb: FormBuilder,
    private messageService: MessageService,
    private store:  Store
  ) {}

  ngOnInit(): void {
    this.store.dispatch(new ProjectAction);
    this.createProjectForm();
    this.getAllTaskListHeader();
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
      },{
        label: 'Go To Task List Options',
        icon: 'pi pi-fw pi-times',
        command: (event) => this.router.navigate(['/dashboard/task-list-options'], {queryParams: {projectId: this.selectedProject.id}}),
      }
    ];
  }

  getAllProjects() {
    this.spinner.show();
    this.projects$
      .subscribe(
        (response) => {
          
          this.projects = response;
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
      addedBy: this.loginService.currentUserValue.fullName,
      project: this.selectedProject,
    };

    this.projectService.addUserToProject<any>(projectUser).subscribe(
      (response) => {
        this.spinner.hide();
        this.showAddUserDialogModal = false;
        this.messageService.add({severity:'success', summary: 'Success', detail: 'Add Successful', life: 3000});
      },
      (error) => {
        this.spinner.hide();
        this.showAddUserDialogModal = false;        
        this.messageService.add({severity:'error', summary: 'Error', detail: 'Add Failed', life: 3000});
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
      ).subscribe(
        (response: any) => {
          this.router.navigate(['dashboard/project-detail/'+ response.projectId]);
        });
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

  createNewProject(project){
    this.spinner.show();
    project.userIds = [this.loginService.currentUserValue.id];
    this.projectService.addProject(project)
    .pipe(finalize(() => {
      this.spinner.hide();
      this.showNewProjectDialog = false;
    }))
    .subscribe( response =>{
      this.store.dispatch(new ProjectAction());
      this.messageService.add({severity:'success', summary: 'Success', detail: 'Add Successful', life: 3000});
    });
  }

  createProjectForm(){
    this.projectForm = this.fb.group({
      projectName: ['', Validators.required],
      finishDate: ['', Validators.required],
    });
  }
}
