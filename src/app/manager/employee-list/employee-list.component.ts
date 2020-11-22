import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrManager } from 'ng6-toastr-notifications';
import { NgxSpinnerService } from 'ngx-spinner';
import { EncryptDecryptService } from '../../Encrypt-decrypt/encrypt-decrypt.service';
import { EmployeeListService } from './employee-list.service';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.scss']
})
export class EmployeeListComponent implements OnInit {
public limit:number = 0;
public empList:any = [];
  constructor(
    private employeeService:EmployeeListService,
    private spinner:NgxSpinnerService,
    private toaster:ToastrManager,
    private router:Router,
    private encryptDecrypt:EncryptDecryptService,) {
    this.getEmpList();
  }

  ngOnInit(): void {
  }
  /* Get Employee List */
  getEmpList() {
    this.limit = 0;
    this.employeeService.getEmpList(this.limit).subscribe(res =>{
      if(res.status) {
        this.empList = res.list;
      }
    })
  }
  /* Edit Employee Details */
  editEmpDetails(user_id) {
    let userId = this.encryptDecrypt.encrypt(user_id);
    console.log(userId);
    this.router.navigate(['/edit-employee',userId]);
  }
  /* Delete Employee Details */
  deleteEmp(user_id,index) {
    if(confirm('are you sure you want to delete this Employee?')){
      this.spinner.show();
      this.employeeService.deleteEmp({user_id:this.empList[index].user_id}).subscribe(res =>{
        if(res.status) {
          this.empList.splice(index, 1);
          this.toaster.successToastr(res.message,'User');
        } else {
          this.toaster.errorToastr(res.message,'User');
        }
        this.spinner.hide();
      })
    }
  }

}
