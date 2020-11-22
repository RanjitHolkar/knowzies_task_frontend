import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ToastrManager } from 'ng6-toastr-notifications';
import { NgxSpinnerService } from 'ngx-spinner';
import { EmpTaskService } from '../emp-task.service';

@Component({
  selector: 'app-emp-task',
  templateUrl: './emp-task.component.html',
  styleUrls: ['./emp-task.component.scss']
})
export class EmpTaskComponent implements OnInit {
  public taskList: any = [];
  public taskForm: FormGroup;
  public taskDetails: any;
  public editIndex: number;
  public viewTask: Boolean = false;
  constructor(
    private empTaskService: EmpTaskService,
    private toaster: ToastrManager,
    private spinner: NgxSpinnerService,
    private fb: FormBuilder) {
    this.getEmpTaskList();
  }

  ngOnInit(): void {
    this.taskForm = this.fb.group({
      status: [''],
      comment: ['']
    })
  }

  /* Get Employee Task List */
  getEmpTaskList() {
    this.empTaskService.getEmpTaskList().subscribe(res => {
      if (res.status) {
        this.taskList = res.list;
      }
    })
  }
  /* View Task Details */
  viewTaskDetails(index) {
    this.editIndex = index;
    this.taskDetails = this.taskList[index];
    this.taskForm.patchValue({
      status: this.taskDetails.status,
      comment: this.taskDetails.comment
    })
    this.viewTask = true;
  }
  updateTaskStatus() {
    if (this.taskForm.valid) {
      this.spinner.show();
      let data = this.taskForm.value;
      data['task_id'] = this.taskDetails.task_id;
      this.empTaskService.updateTask(data).subscribe(res => {
        if (res.status) {
          this.toaster.successToastr(res.message, 'Task');
          this.taskList[this.editIndex] = res.data;
          this.viewTask = false;
        } else {
          this.toaster.errorToastr(res.message, 'Task');
        }
        this.spinner.hide();
      })
    }
  }
}
