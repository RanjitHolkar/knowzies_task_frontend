import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrManager } from 'ng6-toastr-notifications';
import { NgxSpinnerService } from 'ngx-spinner';
import { CommonService } from '../../../common-service/common.service';
import { EncryptDecryptService } from '../../../Encrypt-decrypt/encrypt-decrypt.service';
import { MustMatch } from '../../../_helpers/must-match.validator';
import { EmployeeListService } from '../employee-list.service';

@Component({
  selector: 'app-employee-action',
  templateUrl: './employee-action.component.html',
  styleUrls: ['./employee-action.component.scss']
})
export class EmployeeActionComponent implements OnInit {
  public submitted:Boolean = false;
  public editPassword:Boolean = false;
  public empForm:FormGroup;
  public roleList:any = [];
  public formStatus = 'Add';
  public empId:any;
    constructor(
      private fb:FormBuilder,
      private router:Router,
      private spinner:NgxSpinnerService,
      private encryptDecrypt:EncryptDecryptService,
      private activateRoute:ActivatedRoute,
      private location:Location,
      private employeeListService:EmployeeListService,
      private commonService:CommonService,
      private toaster:ToastrManager) {
        let emp_id = this.activateRoute.snapshot.paramMap.get('emp_id');
        if(emp_id) {
          this.empId = this.encryptDecrypt.decrypt(emp_id);
          if(!this.empId) {
            this.location.back();
          }
          this.getempEditDetails(this.empId);
        }
    }

    ngOnInit(): void {
      this.empForm = this.fb.group({
        emp_code:['', Validators.required],
        first_name:['', Validators.required],
        last_name:['', Validators.required],
        email:['', [Validators.required,Validators.email]],
        birth_date:[''],
        password:[''],
        cPassword:['']
      },{
        validators:MustMatch("password","cPassword")
      })
      /* Hide Show Password Box */
      if(!this.empId) {
        this.addPassValidators();
      }else{
        this.editPassword = false;
      }
    }

    /* Return Forms Controle */
    get f() {return this.empForm.controls}

    /* Save Details */
    formSubmit() {
      this.submitted = true;
      if(this.empForm.valid) {
        var data = this.empForm.value;
        delete data['cPassword'];
        if(this.formStatus !='Edit') {
          this.addNewEmp(data);
        } else {
          data['user_id'] = this.empId;
          this.saveEditDetails(data);
        }
      }
    }

    addNewEmp(data) {
      this.spinner.show();
      this.employeeListService.addEmp(data).subscribe(res=>{
        if(res.status) {
          this.toaster.successToastr(res.message,'Employee');
          this.router.navigate(['/employee-list']);
        } else {
          this.toaster.errorToastr(res.message,'Employee');
        }
        this.spinner.hide();
      })
    }

    getempEditDetails(user_id) {
      this.spinner.show();
      this.employeeListService.getEmpDetails({user_id:user_id}).subscribe(res => {
        if(res.status) {
          let data = res.data;
          this.formStatus = 'Edit';
          this.empForm.patchValue({
            first_name:data.first_name,
            last_name:data.last_name,
            email:data.email,
            emp_code :data.emp_code,
            birth_date :data.birth_date
          })
        } else {
          this.router.navigate(['/employee-list']);
        }
      this.spinner.hide();
      })
    }

    /* Edit Details */
    saveEditDetails(data) {
      this.spinner.show();
      this.employeeListService.saveEmpEditDetails(data).subscribe(res =>{
        if(res.status) {
          this.toaster.successToastr(res.message,'Employee');
          this.router.navigate(['/employee-list']);
        } else {
          this.toaster.errorToastr(res.message,'Employee');
        }
        this.spinner.hide();
      })
    }

    /* Add Password Validators */
    addPassValidators() {
      this.editPassword = true;
      this.empForm.get('password').setValidators([Validators.required,
        Validators.pattern('(?=\\D*\\d)(?=[^a-z]*[a-z])(?=[^A-Z]*[A-Z]).{7,15}')]);
      this.empForm.get('password').updateValueAndValidity();
      this.empForm.get('cPassword').setValidators([Validators.required]);
      this.empForm.get('cPassword').updateValueAndValidity();
    }

    /* Remove Validators */
    removeValidators() {
      this.editPassword = false;
      this.empForm.get('password').setValidators([]);
      this.empForm.get('password').updateValueAndValidity();
      this.empForm.get('cPassword').setValidators([]);
      this.empForm.get('cPassword').updateValueAndValidity();
    }

}
