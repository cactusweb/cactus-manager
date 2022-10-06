import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { catchError, filter, finalize, Observable, Subscription, take, tap, throwError } from 'rxjs';
import { spinnerName } from '../account/consts';
import { FailedLoadService } from '../failed-load/services/failed-load.service';
import { HttpService } from '../tools/services/http.service';
import { Requests } from './consts';
import { Stats } from './interfaces/stats';
import { DashboardService } from './services/dashboard.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class DashboardComponent implements OnInit, OnDestroy {
  stats!: Stats

  sub: Subscription | undefined
  subReq!: Subscription


  constructor(
    private spinner: NgxSpinnerService,
    private flService: FailedLoadService,
    private dash: DashboardService
  ) { }

  ngOnInit(): void {
    this.getStats()
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
    this.subReq.unsubscribe();
    this.flService.hide()
  }

  getStats(){
    this.spinner.show(spinnerName);
    
    this.subReq = this.dash.getStat(true)
      .pipe(
        tap(() => this.spinner.hide(spinnerName)),
        catchError(err => {
          this.spinner.hide(spinnerName)
          this.subReq.unsubscribe();
          return throwError(err)
        })
      )
      .subscribe({
        next: d => this.stats = d,
        error: () => this.onFailedLoad()
      })
  }


  
  onFailedLoad(){
    this.sub = this.flService.show()
      .pipe(
        filter(r => !r),
        take(1),
      )
      .subscribe(res => this.getStats())
  }
}
