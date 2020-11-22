import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  constructor(private http:HttpClient) { }
  /* Get Task List */
  getTaskList(limit:any) {
    return this.http.get<any>(environment.base_url+'Task/getTaskList/'+limit);
  }
  /* Add New Task */
  addTask(info:any) {
    return this.http.post<any>(environment.base_url+'Task/addTask',info);
  }
  /* Get Task Details */
  getTaskDetails(info:any) {
    return this.http.post<any>(environment.base_url+'Task/getTaskDetails',info);
  }
  /* Edit Task Details */
  saveTaskEditDetails(info: any) {
    return this.http.post<any>(environment.base_url+'Task/editTaskDetails',info);
  }
  /* Delete Task */
  deleteTask(info:any) {
    return this.http.post<any>(environment.base_url+'Task/deleteTask',info);
  }
}
