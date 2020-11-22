import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrManager } from 'ng6-toastr-notifications';
import { NgxSpinnerService } from 'ngx-spinner';
import { EncryptDecryptService } from '../../Encrypt-decrypt/encrypt-decrypt.service';
import { TaskService } from './task.service';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})
export class TaskComponent implements OnInit {
public taskList:any = [];
public comment:any;
public limit:number = 0;
public viewComment:Boolean = false;
  constructor(
    private taskService:TaskService,
    private spinner:NgxSpinnerService,
    private toaster:ToastrManager,
    private router:Router,
    private encryptDecrypt:EncryptDecryptService) {
    this.getTaskList();
  }

  ngOnInit(): void {
  }
  /* Get Task List */
  getTaskList() {
    this.taskService.getTaskList('').subscribe(res =>{
      if(res.status) {
        this.taskList = res.list;
      }
    })
  }
  /* Edit Task Details */
  editTaskDetails(task_id) {
    let taskId = this.encryptDecrypt.encrypt(task_id);
    console.log(taskId);
    this.router.navigate(['/edit-task',taskId]);
  }
  /* Delete Task Details */
  deleteTask(user_id,index) {
    if(confirm('are you sure you want to delete this Task?')){
      this.spinner.show();
      this.taskService.deleteTask({task_id:this.taskList[index].task_id}).subscribe(res =>{
        if(res.status) {
          this.taskList.splice(index, 1);
          this.toaster.successToastr(res.message,'Task');
        } else {
          this.toaster.errorToastr(res.message,'Task');
        }
        this.spinner.hide();
      })
    }
  }
}
