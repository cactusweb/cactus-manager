import { Injectable } from '@angular/core';
import {
  RyodanApplication,
  RyodanMetamaskUser,
  RyodanShortReport,
} from '../interfaces/ryodan-customization.interfaces';
import { BehaviorSubject, distinctUntilChanged, share } from 'rxjs';
import { distinctUntilChangedJSON } from '../utils/pipelines.utils';

@Injectable()
export class RyodanDataService {
  private readonly _applicationsPending$ = new BehaviorSubject(false);

  private readonly _reportsPending$ = new BehaviorSubject(false);

  private readonly _metamaskUsersPending$ = new BehaviorSubject(false);

  private readonly _applications$ = new BehaviorSubject<
    RyodanApplication[] | null
  >(null);

  private readonly _reports$ = new BehaviorSubject<RyodanShortReport[] | null>(
    null
  );

  private readonly _metamaskUsers$ = new BehaviorSubject<
    RyodanMetamaskUser[] | null
  >(null);

  get reports$() {
    return this._reports$
      .asObservable()
      .pipe(share(), distinctUntilChangedJSON());
  }

  set reports(data: RyodanShortReport[]) {
    this._reports$.next(data);
  }

  get applications$() {
    return this._applications$
      .asObservable()
      .pipe(share(), distinctUntilChangedJSON());
  }

  set applications(data: RyodanApplication[]) {
    this._applications$.next(data);
  }

  get metamaskUsers$() {
    return this._metamaskUsers$
      .asObservable()
      .pipe(share(), distinctUntilChangedJSON());
  }

  set metamaskUsers(data: RyodanMetamaskUser[]) {
    this._metamaskUsers$.next(data);
  }

  get applicationsPending$() {
    return this._applicationsPending$
      .asObservable()
      .pipe(share(), distinctUntilChanged());
  }

  set applicationsPending(data: boolean) {
    this._applicationsPending$.next(data);
  }

  get reportsPending$() {
    return this._reportsPending$
      .asObservable()
      .pipe(share(), distinctUntilChanged());
  }

  set reportsPending(data: boolean) {
    this._reportsPending$.next(data);
  }

  get metamaskUsersPending$() {
    return this._metamaskUsersPending$
      .asObservable()
      .pipe(share(), distinctUntilChanged());
  }

  set metamasksPending(data: boolean) {
    this._metamaskUsersPending$.next(data);
  }
}
