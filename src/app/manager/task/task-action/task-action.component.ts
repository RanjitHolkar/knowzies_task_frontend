import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrManager } from 'ng6-toastr-notifications';
import { NgxSpinnerService } from 'ngx-spinner';
import { CommonService } from '../../../common-service/common.service';
import { EncryptDecryptService } from '../../../Encrypt-decrypt/encrypt-decrypt.service';
import { EmployeeListService } from '../../employee-list/employee-list.service';
import { TaskService } from '../task.service';

@Component({
  selector: 'app-task-action',
  templateUrl: './task-action.component.html',
  styleUrls: ['./task-action.component.scss']
})
export class TaskActionComponent implements OnInit {
  public submitted:Boolean = false;
  public taskForm:FormGroup;
  public empList:any = [];
  public formStatus = 'Add';
  public taskId:any;
    constructor(
      private fb:FormBuilder,
      private router:Router,
      private spinner:NgxSpinnerService,
      private encryptDecrypt:EncryptDecryptService,
      private activateRoute:ActivatedRoute,
      private location:Location,
      private taskService:TaskService,
      private employeeService:EmployeeListService,
      private commonService:CommonService,
      private toaster:ToastrManager) {
        let task_id = this.activateRoute.snapshot.paramMap.get('task_id');
        if(task_id) {
          this.taskId = this.encryptDecrypt.decrypt(task_id);
          if(!this.taskId) {
            this.location.back();
          }
          this.geTaskEditDetails(this.taskId);
        }
        this.getEmpList();
    }

    ngOnInit(): void {
      this.taskForm = this.fb.group({
        task_name:['', Validators.required],
        start_date:['', Validators.required],
        end_date:['', Validators.required],
        description:['', Validators.required],
        user_id:[''],
        status:["1"]
      })
    }

    /* Return Forms Controle */
    get f() {return this.taskForm.controls}

    /* Save Details */
    formSubmit() {
      this.submitted = true;
      if(this.taskForm.valid) {
        var data = this.taskForm.value;
        if(this.formStatus !='Edit') {
          this.addNewTask(data);
        } else {
          data['task_id'] = this.taskId;
          this.saveEditDetails(data);
        }
      }
    }

    addNewTask(data) {
      this.spinner.show();
      this.taskService.addTask(data).subscribe(res=>{
        if(res.status) {
          this.toaster.successToastr(res.message,'Task');
          this.router.navigate(['/task-list']);
        } else {
          this.toaster.errorToastr(res.message,'Task');
        }
        this.spinner.hide();
      })
    }

    geTaskEditDetails(user_id) {
      this.spinner.show();
      this.taskService.getTaskDetails({user_id:user_id}).subscribe(res => {
        if(res.status) {
          let data = res.data;
          this.formStatus = 'Edit';
          this.taskForm.patchValue({
            task_name:data.task_name,
            start_date:data.start_date,
            end_date:data.end_date,
            description:data.description,
            user_id:data.user_id,
            status:data.status
          })
        } else {
          this.router.navigate(['/task-list']);
        }
      this.spinner.hide();
      })
    }

    /* Edit Details */
    saveEditDetails(data) {
      this.spinner.show();
      this.taskService.saveTaskEditDetails(data).subscribe(res =>{
        if(res.status) {
          this.toaster.successToastr(res.message,'Task');
          this.router.navigate(['/task-list']);
        } else {
          this.toaster.errorToastr(res.message,'Task');
        }
        this.spinner.hide();
      })
    }
    /* Get Employee List */
    getEmpList() {
      this.spinner.show();
      this.employeeService.getEmpList('').subscribe(res =>{
        if(res.status) {
          this.empList = res.list;
        }
        this.spinner.hide();
      })
    }
}
