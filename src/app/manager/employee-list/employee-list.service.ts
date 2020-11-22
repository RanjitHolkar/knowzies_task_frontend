import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EmployeeListService {
  constructor(private http:HttpClient) { }
  /* Get Employee List */
  getEmpList(limit:any) {
    return this.http.get<any>(environment.base_url+'Employee/getEmployeeList/'+limit);
  }
  /* Add New Employee */
  addEmp(info:any) {
    return this.http.post<any>(environment.base_url+'Employee/addEmployee',info);
  }
  /* Get Edit Employee Details */
  getEmpDetails(info:any) {
    return this.http.post<any>(environment.base_url+'Employee/getEmployeeDetails',info);
  }
  /* Edit Employee Details */
  saveEmpEditDetails(info: any) {
    return this.http.post<any>(environment.base_url+'Employee/editEmployeeDetails',info);
  }
  /* Delete Employee */
  deleteEmp(info:any) {
    return this.http.post<any>(environment.base_url+'Employee/deleteEmployee',info);
  }
}
