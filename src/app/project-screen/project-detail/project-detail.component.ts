import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { TaskList } from 'src/model/task-list';
import { ProjectService } from '../project.service';
import { TaskListAction } from '../state/project.action';
import { ProjectState } from '../state/project.state';

@Component({
  selector: 'app-project-detail',
  templateUrl: './project-detail.component.html',
  styleUrls: ['./project-detail.component.scss']
})
export class ProjectDetailComponent implements OnInit {

  @Select(ProjectState.getTaskList) taskLists$: Observable<TaskList[]>;

  taskLists: TaskList[] = []
  project;
  constructor(
    private router: Router,
    private projectService: ProjectService,
    private store: Store
  ) { }

  ngOnInit(): void {
    var boardId = this.router.url.split('/')
    this.store.dispatch(new TaskListAction(parseInt(boardId[boardId.length - 1])))
    this.getTaskList();
  }
  getTaskList(){
    this.taskLists$.subscribe((response: any) => {
      this.taskLists = response?.taskLists;
      this.project = response?.project
    })
  }

}
