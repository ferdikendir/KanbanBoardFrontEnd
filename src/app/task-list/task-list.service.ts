import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { EndPoint } from 'src/utils/end-points';

@Injectable({
  providedIn: 'root'
})
export class TaskListService {

  constructor(
    private httpService: HttpClient
  ) { }

  getAllTaskList(projectId) {
    return this.httpService.get(environment.apiUrl+ EndPoint.GET_ALL_TASK_BY_PROJECT_ID +'?projectId='+projectId);
  }

  updateTaskList(taskList){
    return this.httpService.post(environment.apiUrl+ EndPoint.UPDATE_TASK_LİST, taskList);
  }
}
