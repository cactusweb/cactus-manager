import { Injectable } from '@angular/core';
import {
  Observable,
  finalize,
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
  RyodanReport,
  RyodanShortReport,
} from '../interfaces/ryodan-customization.interfaces';
import { RyodanRequests } from '../constants/req.constants';

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
      tap(
        ([editRep, oldReps]) =>
          (this.dataService.reports = oldReps!.map((rep) =>
            rep.id === editRep.id ? editRep : rep
          ))
      ),
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
      tap(
        ([editApp, oldApps]) =>
          (this.dataService.applications = oldApps!.map((rep) =>
            rep.id === editApp.id ? editApp : rep
          ))
      ),
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

  private request<T>(
    type: 'report' | 'application' | undefined,
    reqParams: req,
    body: any = '',
    urlParam: string = '',
    urlQuery: string = ''
  ) {
    if (type)
      type === 'report'
        ? (this.dataService.reportsPending = true)
        : (this.dataService.applicationsPending = true);

    return this.http.request(reqParams, body, urlParam, urlQuery).pipe(
      finalize(() => {
        if (type)
          type === 'report'
            ? (this.dataService.reportsPending = false)
            : (this.dataService.applicationsPending = false);
      })
    ) as Observable<T>;
  }
}
