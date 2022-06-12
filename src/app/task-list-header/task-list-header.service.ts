import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { TaskListHeader } from 'src/model/task-list-header';
import { EndPoint } from 'src/utils/end-points';

@Injectable({
  providedIn: 'root'
})
export class TaskListHeaderService {

  constructor(
    private httpClient: HttpClient
  ) { }

  getAllTaskListHeader(){
    return this.httpClient.get<TaskListHeader[]>(environment.apiUrl+ EndPoint.GET_ALL_TASK_LIST_HEADER);
  }

  updateTaskListHeader(taskListHeader){
    return this.httpClient.post<any>(environment.apiUrl+ EndPoint.UPDATE_TASK_LIST_HEADER, taskListHeader);
  }

  addNewTaskListHeader(taskListHeader){
    return this.httpClient.post<any>(environment.apiUrl+ EndPoint.ADD_NEW_TASK_LIST_HEADER, taskListHeader);
  }    
}
