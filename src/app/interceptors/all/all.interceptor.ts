import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { EMPTY, Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthService } from 'src/app/services/auth/auth.service';
import { NotificationsService } from 'src/app/services/notifications/notifications.service';

@Injectable()
export class AllInterceptor implements HttpInterceptor {

  constructor(
    private auth: AuthService,
    private notifications: NotificationsService
  ) {}

  intercept(req: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    req = this.setAuthHeader(req);
    if ( !localStorage.getItem( 'accessToken' ) && !req.url.includes('sign') ){
      this.auth.logout();
      this.notifications.generateNotification( 401, 'You are not authorized' )
      return EMPTY;
    }
    
    return next.handle(req)
      .pipe( 
        catchError( err => {
          if ( err.status == 404 ) err.message = "Endpoint not found"
          
          if ( err.status == 401 ){
            this.auth.logout();
            this.notifications.generateNotification( 401, 'You are not authorized' )
          }else
          if ( err.status > 500 ){
            this.notifications.generateNotification( err.status, 'Server is temporarily unavailable' );
            // if)
            err.message = "Server is temporarily unavailable"
          }else
          if ( err.status >= 400 && err.status < 500 && req.method != 'POST' ){
            this.notifications.generateNotification( err.status, err.error.message || err.error.error || err.message )
            
          }
          // if
          return throwError(err)
        }) 
      )
  }

  
  setAuthHeader( req: HttpRequest<unknown> ): HttpRequest<unknown>{
    if ( localStorage.getItem('accessToken') )
      return req.clone({ headers: req.headers.set('authorization', `Bearer ${localStorage.getItem('accessToken')}`) });else 
    return req
  }
}
