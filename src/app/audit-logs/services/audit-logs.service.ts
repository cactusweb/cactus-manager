import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, filter, finalize, map, Observable, take, tap } from 'rxjs';
import { AccountService } from 'src/app/account/services/account.service';
import { HttpService } from 'src/app/tools/services/http.service';
import { Requests } from '../const';
import { Log } from '../interfaces/log';

@Injectable({
  providedIn: 'root'
})
export class AuditLogsService {
  private logs!: Log[]

  private $logs = new BehaviorSubject<Log[] | null>(null);
  private loading: boolean = false;
  private ownerName!: string

  constructor(
    private http: HttpService,
    private acc: AccountService
  ) {
    this.acc.owner.pipe(take(1))
      .subscribe(res => this.ownerName = res?.general.name || '')
  }

  
  getLogs( update: boolean = false ): Observable<Log[]>{
    if ( (update || !this.logs) && !this.loading){
      this.loading = true;
      this.http.request( Requests['getLogs'] )
          .pipe(
            map(d => d.reverse()),
            map((logs: Log[]) => logs.map(l => {
              return {
                ...l,
                when: l.when * 1000,
                name: l.who?.name == this.ownerName ? 'Admin' : l.who?.name
              }
            })),
            tap(d => {
              this.logs = d;
              this.$logs.next(this.logs)
            }),
            catchError(err => {
              if ( !this.logs ){
                this.$logs.error(err);
                this.$logs = new BehaviorSubject<Log[]|null>(null)
              }
              return err
            }),
            finalize(() => this.loading = false)
          )
          .subscribe({
            next: () => {},
            error: () => {}
          })
    }
    
    // @ts-ignore
    return this.$logs.asObservable()
      .pipe(
        filter(d => !!d)
      );
  }
}
