import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { catchError, EMPTY, Observable, throwError } from 'rxjs';
import { AuthService } from 'src/app/auth/services/auth.service';
import { ToolsService } from './tools.service';

@Injectable()
export class Interceptor implements HttpInterceptor {

  constructor(
    private auth: AuthService,
    private tools: ToolsService
  ) {}

  intercept(req: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    req = this.setAuthHeader(req);

    
    if ( !localStorage.getItem( 'accessToken' ) && !req.url.includes('sign') ){
      this.auth.logout();
      this.tools.generateNotification( 'Error 401: You are not authorized' )
      return EMPTY;
    }

    return next.handle(req)
      .pipe( 
        catchError( err => {
          if ( err.status == 0 ){
            err.message = "Connection timeout";
            this.tools.generateNotification('Connection timeout. Check you internet connection.')
          }

          if ( err.status == 404 ) err.message = "Endpoint not found"
          
          if ( err.status == 401 ){
            this.auth.logout();
            this.tools.generateNotification( 'Error 401: You are not authorized' )
          }else
          if ( err.status > 500 ){
            this.tools.generateNotification( `Error ${err.status}: Server is temporarily unavailable` );
            err.message = "Server is temporarily unavailable"
          }else
          if ( err.status >= 400 && err.status <= 500){
            this.tools.generateNotification( `Error ${err.status}: ${err.error.message || err.error.error || err.message}` )
          }
          // if
          return throwError(err)
        })
      )
  }

  
  setAuthHeader( req: HttpRequest<unknown> ): HttpRequest<unknown>{
    if ( !localStorage['accessToken'] ) return req

    return req.clone({ headers: req.headers.set('authorization', `Bearer ${localStorage.getItem('accessToken')}`) });
  }
}
