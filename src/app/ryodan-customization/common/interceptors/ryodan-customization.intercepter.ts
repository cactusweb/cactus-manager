import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable()
export class RyodanCustomizationInterceptor implements HttpInterceptor {
  intercept(
    req: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    const newReq = this.replaceApiUrl(req);

    return next.handle(newReq);
  }

  private replaceApiUrl(req: HttpRequest<unknown>) {
    return req.clone({
      url: req.url.replace(
        environment.apiUrl,
        environment.customization.ryodan.apiUrl
      ),
    });
  }
}
