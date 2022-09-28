import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { filter, finalize, Subscription, take, tap } from 'rxjs';
import { spinnerName } from '../account/consts';
import { FailedLoadService } from '../failed-load/services/failed-load.service';
import { HttpService } from '../tools/services/http.service';
import { Requests } from './consts';
import { Stats } from './interfaces/stats';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class DashboardComponent implements OnInit, OnDestroy {
  stats!: Stats

  sub: Subscription | undefined


  constructor(
    private http: HttpService,
    private spinner: NgxSpinnerService,
    private flService: FailedLoadService
  ) { }

  ngOnInit(): void {
    this.getStats()
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
    this.flService.hide()
  }

  getStats(){
    this.spinner.show(spinnerName);
    
    this.http.request( Requests['getStats'] )
      .pipe(
        take(1),
        finalize(() => this.spinner.hide(spinnerName))
      )
      .subscribe({
        next: res => this.stats = res,
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
