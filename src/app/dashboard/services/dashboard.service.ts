import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, filter, finalize, Observable, take, tap } from 'rxjs';
import { HttpService } from 'src/app/tools/services/http.service';
import { Requests } from '../consts';
import { Stats } from '../interfaces/stats';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  private stat!: Stats
  private $stat = new BehaviorSubject<Stats|null>(null)

  private loading: boolean = false;


  constructor(
    private http: HttpService
  ) { }

  getStat( update: boolean = false ): Observable<Stats>{
    if ( (!this.stat || update) && !this.loading ){
      this.loading = true;
      this.http.request( Requests['getStats'] )
        .pipe(
          take(1),
          finalize(() => this.loading = false),
          tap(d => {
            this.stat = d;
            this.$stat.next(this.stat)
          }),
          catchError(err => {
            if ( !this.stat ){
              this.$stat.error(err);
              this.$stat = new BehaviorSubject<Stats|null>(null)
            }
            return err
          })
        )
        .subscribe({
          next: ()=>{}, 
          error: ()=>{}
        })
    }

    // @ts-ignore
    return this.$stat.asObservable()
      .pipe(
        filter(d => !!d)
      )
  }

}
