import { Injectable, Optional } from '@angular/core';
import {
  Observable,
  finalize,
  map,
  of,
  switchMap,
  take,
  tap,
  withLatestFrom,
} from 'rxjs';
import { req } from 'src/app/tools/interfaces/req-map';
import { HttpService } from 'src/app/tools/services/http.service';
import { RyodanDataService } from './ryodan-data.service';
import {
  RyodanApplication,
  RyodanMetamask,
  RyodanMetamaskUser,
  RyodanReport,
  RyodanShortReport,
} from '../interfaces/ryodan-customization.interfaces';
import { RyodanRequests } from '../constants/req.constants';
import { RyodanMmHeaderService } from '../../ryodan-metamasks/components/header/header.service';

@Injectable()
export class RyodanHttpService {
  constructor(
    private http: HttpService,
    private dataService: RyodanDataService
  ) {}

  getApplications() {
    this.request<RyodanApplication[]>(
      'application',
      RyodanRequests['getApplications']
    ).subscribe({
      next: (res) => (this.dataService.applications = res),
      error: () => {},
    });
  }

  getReports() {
    this.request<RyodanShortReport[]>(
      'report',
      RyodanRequests['getReports']
    ).subscribe({
      next: (res) => (this.dataService.reports = res),
      error: () => {},
    });
  }

  putReport(data: Record<string, any>, reportId: string) {
    return this.request<RyodanReport>(
      'report',
      RyodanRequests['putReport'],
      data,
      reportId
    ).pipe(
      withLatestFrom(this.dataService.reports$),
      tap(([editRep, oldReps]) => {
        const reps = oldReps!.filter((rep) => rep.id !== reportId);
        reps.unshift(editRep);
        this.dataService.reports = reps;
      }),
      switchMap(([editRep]) => of(editRep)),
      take(1)
    );
  }

  putApplication(data: Record<string, any>, applicationId: string) {
    return this.request<RyodanApplication>(
      'report',
      RyodanRequests['putApplication'],
      data,
      applicationId
    ).pipe(
      withLatestFrom(this.dataService.applications$),
      tap(([editApp, oldApps]) => {
        const apps = oldApps!.filter((app) => app.id !== applicationId);
        apps.unshift(editApp);
        this.dataService.applications = apps;
      }),
      switchMap(([editRep]) => of(editRep)),
      take(1)
    );
  }

  getReportById(id: string) {
    return this.request<RyodanReport>(
      'report',
      RyodanRequests['getReportById'],
      undefined,
      id
    );
  }

  deleteReport(reportId: string) {
    return this.request<void>(
      undefined,
      RyodanRequests['deleteReport'],
      undefined,
      reportId
    ).pipe(
      switchMap(() => this.dataService.reports$),
      take(1),
      tap((reports) => {
        this.dataService.reports = reports!.filter(
          (rep) => rep.id !== reportId
        );
      })
    );
  }

  deleteApplication(applicationId: string) {
    return this.request<void>(
      undefined,
      RyodanRequests['deleteApplication'],
      undefined,
      applicationId
    ).pipe(
      switchMap(() => this.dataService.applications$),
      take(1),
      tap((applications) => {
        this.dataService.applications = applications!.filter(
          (app) => app.id !== applicationId
        );
      })
    );
  }

  postMetamaskWallets(phrases: string[]) {
    return this.request<RyodanMetamask[]>(
      undefined,
      RyodanRequests['postMetamasks'],
      phrases
    );
  }

  getMetamaskUsers() {
    this.request<RyodanMetamaskUser[]>(
      'metamasks',
      RyodanRequests['getMetamasks']
    ).subscribe({
      next: (d) => (this.dataService.metamaskUsers = d),
      error: () => {},
    });
  }

  getUserMetamasks(userId: string) {
    return this.request<RyodanMetamask[]>(
      undefined,
      RyodanRequests['getUserMetamasks'],
      undefined,
      userId
    );
  }

  deleteMetamaskWallet(mmId: string, userId: string) {
    return this.request<void>(
      undefined,
      RyodanRequests['deleteMetamask'],
      undefined,
      mmId
    ).pipe(
      switchMap(() => this.dataService.metamaskUsers$),
      take(1),
      tap(
        (mmUsers) =>
          (this.dataService.metamaskUsers = mmUsers!.map((mmUser) => {
            if (mmUser.user.id !== userId) return mmUser;
            return {
              ...mmUser,
              walletsCount: mmUser.walletsCount - 1,
            };
          }))
      ),
      map(() => {})
    );
  }

  deleteMetamasksForUser(userId: string) {
    return this.request<void>(
      undefined,
      RyodanRequests['deleteUserMetamasks'],
      undefined,
      userId
    ).pipe(
      switchMap(() => this.dataService.metamaskUsers$),
      take(1),
      tap((mmUsers) => {
        this.dataService.metamaskUsers = mmUsers!.map((mmUser) => {
          if (mmUser.user.id !== userId) return mmUser;
          return {
            ...mmUser,
            walletsCount: 0,
          };
        });
      })
    );
  }

  getRemainingMetamasksCount() {
    return this.request<{ count: number }>(
      undefined,
      RyodanRequests['getRemainingMetamasksCount']
    ).pipe(map((d) => d.count));
  }

  private request<T>(
    type: 'report' | 'application' | 'metamasks' | undefined,
    reqParams: req,
    body: any = '',
    urlParam: string = '',
    urlQuery: string = ''
  ) {
    this.changePendingState(type, true);

    return this.http
      .request(reqParams, body, urlParam, urlQuery)
      .pipe(
        finalize(() => this.changePendingState(type, false))
      ) as Observable<T>;
  }

  private changePendingState(
    type: 'report' | 'application' | 'metamasks' | undefined,
    state: boolean
  ) {
    if (!type) return;

    switch (type) {
      case 'report':
        this.dataService.reportsPending = state;
        break;
      case 'application':
        this.dataService.applicationsPending = state;
        break;
      case 'metamasks':
        this.dataService.metamasksPending = state;
        break;
    }
  }
}
