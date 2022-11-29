import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { catchError, filter, finalize, map, Observable, Subscription, take, tap, throwError } from 'rxjs';
import { spinnerName } from '../account/consts';
import { AccountService } from '../account/services/account.service';
import { FailedLoadService } from '../failed-load/services/failed-load.service';
import { HttpService } from '../tools/services/http.service';
import { TransactionViewService } from './components/transaction-view/transaction-view.service';
import { TxInfo } from './components/transaction-view/tx-info';
import { logStatuses, Requests } from './const';
import { Log } from './interfaces/log';
import { AuditLogsService } from './services/audit-logs.service';

@Component({
  selector: 'app-audit-logs',
  templateUrl: './audit-logs.component.html',
  styleUrls: ['./audit-logs.component.scss']
})
export class AuditLogsComponent implements OnInit, OnDestroy {
  logs!: Observable<Log[]>

  pipeData: { filter: string[], search: string } = { filter: [], search: '' }

  ownerName: string = '';

  pipeParams = {
    search: [['key'], ['who', 'name']],
    filter: ['action'],
  }

  sub: Subscription | null = null
  txInfo: Observable<TxInfo|undefined>;

  constructor(
    private spinner: NgxSpinnerService,
    private logSvc: AuditLogsService,
    private acc: AccountService,
    private flService: FailedLoadService,
    public txService: TransactionViewService
  ) { 
    this.txInfo = this.txService.getPopup()
  }

  ngOnInit(): void {
    this.getLogs();

    this.acc.owner.pipe(take(1))
      .subscribe(res => this.ownerName = res?.general.name || '')
  }

  
  ngOnDestroy(): void {
    this.sub?.unsubscribe()
    this.flService.hide();
  }


  getLogs(){
    this.spinner.show(spinnerName)

    this.logs = this.logSvc.getLogs(true)
      .pipe(
        tap(d => d = d.map(l => l)),
        tap(() => this.spinner.hide(spinnerName)),
        catchError(err => {
          this.spinner.hide(spinnerName)
          this.onFailedLoad();
          return throwError(err);
        })
      )
  }

  
  onFailedLoad(){
     this.sub = this.flService.show()
      .pipe(
        filter(r => !r),
        take(1),
      )
      .subscribe(res => this.getLogs())
  }

  
  trackByFn(index: any, item: Log){
    return item.details;
  }
}
