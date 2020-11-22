import { Injectable } from '@angular/core';
import { map } from "rxjs/operators";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../environments/environment";
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public baseUrl = environment.base_url;
  constructor(private http:HttpClient,private router:Router) { }
  /* Check Login */
  checkLogin(info:any) {
    return this.http.post<any>(this.baseUrl+'check_login', info).pipe(map(res=> {
      return res;
    }))
  }
  /* User Logout */
  logout() {
    localStorage.removeItem('currentUser');
    this.router.navigate(['/login']);
  }

}
