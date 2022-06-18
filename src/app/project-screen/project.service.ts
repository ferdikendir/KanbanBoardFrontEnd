import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ProjectUserAdd } from 'src/model/project-user-add';
import { TaskList } from 'src/model/task-list';
import { TaskListHeader } from 'src/model/task-list-header';
import { EndPoint } from 'src/utils/end-points';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  constructor(
    private httpService: HttpClient
  ) { }

  addProject(project){
    return this.httpService.post<any>(environment.apiUrl+ EndPoint.ADD_PROJECT, project);
  }
  
  getAllProjects <T>(userId) {
    return this.httpService.get<T[]>(environment.apiUrl+ EndPoint.GET_ALL_PROJECT+ '?userId=' + userId);
  }

  getAllUserByProjectId <T>(projectId) {
    return this.httpService.get<T[]>(environment.apiUrl+ EndPoint.GET_ALL_USER_BY_PROJECT_ID+ '?projectId=' + projectId);
  }

  addUserToProject <T>(mailList: ProjectUserAdd) {
    return this.httpService.post<T>(environment.apiUrl+ EndPoint.ADD_USER_TO_PROJECT, mailList);
  }

  getTaskListByProjectId(projectId){
    return this.httpService.get<TaskList[]>(environment.apiUrl+ EndPoint.GET_ALL_TASK_BY_PROJECT_ID+ '?projectId=' + projectId);
  }

  getAllTaskListHeader(){
    return this.httpService.get<TaskListHeader[]>(environment.apiUrl+ EndPoint.GET_ALL_TASK_LIST_HEADER);
  }

  getAllTaskListHeaderByProjectId(projectId){
    return this.httpService.get<TaskListHeader[]>(environment.apiUrl+ EndPoint.GET_ALL_TASK_LIST_HEADER_BY_PROJECT_ID+ '?projectId=' + projectId);
  }

  addNewTaskListHeader(taskListHeader){
    return this.httpService.post<TaskList>(environment.apiUrl+ EndPoint.ADD_NEW_TASK_LIST_HEADER, taskListHeader);
  }

  addHeaderToProject(taskListHeader): Observable<TaskList>{
    return this.httpService.post<TaskList>(environment.apiUrl+ EndPoint.ADD_HEADER_TO_PROJECT, taskListHeader);
  }

  updateCard(card){
    return this.httpService.post<any>(environment.apiUrl+ EndPoint.UPDATE_CARD, card);
  }

  addCard(card){
    return this.httpService.post<any>(environment.apiUrl+ EndPoint.ADD_CARD, card);
  }

  moveCard(moveCard){
    return this.httpService.post<any>(environment.apiUrl+ EndPoint.MOVE_CARD, moveCard);
  }

  deleteCard(card){
    return this.httpService.post<any>(environment.apiUrl+ EndPoint.DELETE_CARD, card);
  }
}
