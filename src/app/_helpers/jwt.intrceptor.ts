import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // add authorization header with jwt token if available
        let currentUserToken:any = localStorage.getItem('currentUser');
        if (currentUserToken && currentUserToken) {
          currentUserToken = JSON.parse(currentUserToken);
            request = request.clone({
                setHeaders: {
                    Authorization: currentUserToken.token
                }
            });
        }
        return next.handle(request);
    }
}
