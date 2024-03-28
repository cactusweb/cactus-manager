import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, Subject } from 'rxjs';

export interface ComponentCanDeactivate {
  canDeactivate: () => boolean | Observable<boolean>;
}

@Injectable({
  providedIn: 'root'
})
export class PendingChangesGuard  {
  canDeactivate(component: ComponentCanDeactivate): Observable<boolean> | boolean {
    return component.canDeactivate()
      // confirm('WARNING: You have unsaved changes. Press Cancel to go back and save these changes, or OK to lose these changes.');
  }
  
}
