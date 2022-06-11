import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TaskList } from 'src/model/task-list';
import { ProjectService } from '../project.service';

@Component({
  selector: 'app-project-detail',
  templateUrl: './project-detail.component.html',
  styleUrls: ['./project-detail.component.scss']
})
export class ProjectDetailComponent implements OnInit {

  taskLists: TaskList[] = []
  project;
  constructor(
    private router: Router,
    private projectService: ProjectService
  ) { }

  ngOnInit(): void {
    var boardId = this.router.url.split('/')
    this.getTaskList(boardId[boardId.length - 1])
  }
  getTaskList(projectId){
    this.projectService.getTaskListByProjectId(projectId).subscribe( (response: any) => {
      this.taskLists = response.taskLists
      this.project = response.project
    })
  }

}
