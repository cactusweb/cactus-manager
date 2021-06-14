import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ToHomeGuard implements CanActivate {
  canActivate() {
    window.location.href = '/';
    return true;
  }
  
}
