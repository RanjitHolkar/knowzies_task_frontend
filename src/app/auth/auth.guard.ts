import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../auth_service/auth.service';
import decode from 'jwt-decode';
@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService:AuthService,private router:Router) {

  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      const expectedRole = route.data.expectedRole;
      const currentUser = localStorage.getItem('currentUser');
      let  Payload = JSON.parse(currentUser);
      let key:any = "Y2xlYW5pbmcgbWFuYWdlbWVudCAxMjM0NTY3ODk=";
      const tokenPayload:any = decode(Payload.token,key);
        let d = new Date();
        console.log('exp',tokenPayload.role);
        let currntTime = d.getTime();
        if ( tokenPayload.exp >= currntTime || tokenPayload.role !== expectedRole) {
          this.router.navigate(['login']);
          return false;
        }
        return true;
  }

}
