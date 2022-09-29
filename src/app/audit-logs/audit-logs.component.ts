import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { filter, finalize, map, Subscription, take, tap } from 'rxjs';
import { spinnerName } from '../account/consts';
import { AccountService } from '../account/services/account.service';
import { FailedLoadService } from '../failed-load/services/failed-load.service';
import { HttpService } from '../tools/services/http.service';
import { logStatuses, Requests } from './const';
import { Log } from './interfaces/log';

@Component({
  selector: 'app-audit-logs',
  templateUrl: './audit-logs.component.html',
  styleUrls: ['./audit-logs.component.scss']
})
export class AuditLogsComponent implements OnInit, OnDestroy {
  logs: Log[] = []

  pipeData: { filter: string[], search: string } = { filter: [], search: '' }

  ownerName: string = '';

  pipeParams = {
    search: [['key'], ['who', 'name']],
    filter: ['action'],
  }

  sub: Subscription | null = null

  constructor(
    private spinner: NgxSpinnerService,
    private http: HttpService,
    private acc: AccountService,
    private flService: FailedLoadService
  ) { }

  ngOnInit(): void {
    this.getLogs();

    this.acc.owner.pipe(take(1))
      .subscribe(res => this.ownerName = res?.name || '')
  }

  
  ngOnDestroy(): void {
    this.sub?.unsubscribe()
    this.flService.hide();
  }


  getLogs(){
    this.spinner.show(spinnerName)

    this.http.request( Requests['getLogs'] )
      .pipe(
        take(1),
        finalize(() => this.spinner.hide(spinnerName)),
        map((logs: Log[]) => logs.reverse()),
        map(logs => logs.map(l => {
          return {
            ...l,
            when: l.when * 1000,
            name: l.who?.name == this.ownerName ? 'Admin' : l.who?.name
          }
        }))
      )
      .subscribe({
        next: (v) => this.logs = v,
        error: () => this.onFailedLoad(),
      })
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
    return item.id;
  }
}
