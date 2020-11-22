import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EmpTaskService {

  constructor(private httpClient: HttpClient) { }

  /* Get Employee Task List */
  getEmpTaskList() {
    return this.httpClient.get<any>(environment.base_url + 'Task/getEmpTaskList/');
  }
  /* Update Task Status */
  updateTask(info: any) {
    return this.httpClient.post<any>(environment.base_url + 'Task/editTaskDetails', info);
  }
}
