import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { catchError, filter, finalize, Subscription, take, tap } from 'rxjs';
import { spinnerName } from '../account/consts';
import { FailedLoadService } from '../failed-load/services/failed-load.service';
import { Request } from './interfaces/request';
import { HttpService } from './services/http.service';

@Component({
  selector: 'app-api-doc',
  templateUrl: './api-doc.component.html',
  styleUrls: ['./api-doc.component.scss']
})
export class ApiDocComponent implements OnInit, OnDestroy {
  requests: Request[] = []
  accId: string = '';

  sub: Subscription | undefined

  constructor(
    private spinner: NgxSpinnerService,
    private http: HttpService,
    private flService: FailedLoadService
  ) { }

  ngOnInit(): void {
    this.getRequests();
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
    this.flService.hide();
  }


  getRequests(){
    this.spinner.show(spinnerName)

    this.http.getRequestsData()
      .pipe(
        take(1),
        finalize( () => this.spinner.hide(spinnerName) )
      )
      .subscribe({
        next: d => this.requests = d,
        error: () => this.onFailedLoad(),
      })
  }

  
  onFailedLoad(){
    this.sub = this.flService.show()
      .pipe(
        filter(r => !r),
        take(1),
      )
      .subscribe(res => this.getRequests())
  }
}
