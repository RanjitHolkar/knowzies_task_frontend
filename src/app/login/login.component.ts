import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../auth_service/auth.service';
import { ToastrManager } from 'ng6-toastr-notifications';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public loginForm: FormGroup;
  public submitted: Boolean = false;
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private spinner: NgxSpinnerService,
    private toaster: ToastrManager) {
    this.checkUser();
  }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    })
  }

  /* Login Check */
  loginCheck() {
    this.submitted = true;
    if (this.loginForm.valid) {
      this.spinner.show();
      var form_data = new FormData();
      let allValue = this.loginForm.value;
      allValue = this.convertFormData(allValue);
      this.authService.checkLogin(allValue).subscribe(res => {
        if (res.status) {
          this.toaster.successToastr(res.message, 'Login');
          localStorage.setItem('currentUser', JSON.stringify(res.userDetails));
          this.checkUser();
        } else {
          this.toaster.errorToastr(res.message);
        }
        this.spinner.hide();
      })
    }
  }
  /* Return login form controls */
  get f() { return this.loginForm.controls }
  convertFormData(object) {
    const formData = new FormData();
    Object.keys(object).forEach(key => formData.append(key, object[key]));
    return formData;
  }

  // check Loged in user or not
  checkUser() {
    let token = localStorage.getItem('currentUser');
    if (token) {
      let userDetails = JSON.parse(token);
      console.log(userDetails.role);
      if (userDetails.role == 1) {
        this.router.navigate(['/employee-list']);
      } else {
        this.router.navigate(['/emp-task']);
      }
    } else {
      this.authService.logout();
    }
  }
}
