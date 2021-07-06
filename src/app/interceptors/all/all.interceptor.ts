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

@Injectable()
export class AllInterceptor implements HttpInterceptor {

  constructor(
    private auth: AuthService
  ) {}

  intercept(req: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    req = this.setAuthHeader(req);
    
    if ( !localStorage.getItem( 'accessToken' ) && !req.url.includes('sign') ){
      this.auth.logout();
      return EMPTY;
    }
    

    return next.handle(req)
      .pipe( 
        catchError( err => {
          if ( err.status == 401 )
            this.auth.logout();
            
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
