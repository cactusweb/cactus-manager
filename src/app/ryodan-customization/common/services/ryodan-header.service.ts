import { Injectable } from '@angular/core';
import { ReplaySubject, Subject } from 'rxjs';

@Injectable()
export class RyodanHeaderService {
  private _updateData$ = new Subject<void>();

  get updateData$() {
    return this._updateData$.asObservable();
  }

  private _searchString$ = new ReplaySubject<string>();

  get searchString$() {
    return this._searchString$.asObservable();
  }

  set searchString(val: string) {
    this._searchString$.next(val);
  }

  updateData() {
    this._updateData$.next();
  }
}
