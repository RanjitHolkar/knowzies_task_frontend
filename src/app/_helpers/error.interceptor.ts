import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrManager } from 'ng6-toastr-notifications';
@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(
    private router: Router,
    private toaster: ToastrManager,
    private spinner: NgxSpinnerService
  ) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(catchError(err => {
      if (err.status === 401) {
        this.router.navigate(['/erroe404']);
      } else if (err.status != 200) {
        this.spinner.hide();
        this.toaster.errorToastr(err.error.message,err.statusText);
        // this.router.navigate(['/error']);
      }
      const error = err.error.message || err.statusText;
      return throwError(error);
    }))
  }
}
