import { EventEmitter, Injectable } from '@angular/core';
import { BehaviorSubject, catchError, filter, finalize, Observable, share, tap, throwError } from 'rxjs';
import { HttpService } from 'src/app/tools/services/http.service';
import { Requests } from '../const';
import { Plan } from '../interfaces/plan';

@Injectable({
  providedIn: 'root'
})
export class PlansService {
  private plans!: Plan[]

  private $plans = new BehaviorSubject<Plan[]|null>(null)
  loading: boolean = false;

  



  constructor(
    private http: HttpService
  ) { }

  getPlans( update: boolean = false ): Observable<Plan[]>{
    if ( (update || !this.plans) && !this.loading){
      this.loading = true;
      this.http.request( Requests['getPlans'] )
          .pipe(
            tap(d => {
              this.plans = d.reverse();
              this.$plans.next(this.plans)
            }),
            catchError(err => {
              if ( !this.plans ){
                this.$plans.error(err);
                this.$plans = new BehaviorSubject<Plan[]|null>(this.plans||[])
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
    return this.$plans.asObservable().pipe(share())
      .pipe(
        filter(d => !!d)
      );
  }


  deletePlan( id: string ){
    return this.http.request( Requests['deletePlan'], null, id )
      .pipe(
        tap(() => {
          this.plans = this.plans.filter( p => p.id != id )
          this.$plans.next(this.plans)
        })
      )
  }



  postPlan( data: Record<string, any> ){
    return this.http.request( Requests['postPlan'], data )
      .pipe(
        tap(d => {
          this.plans.unshift(d)
          this.$plans.next(this.plans)
        })
      )      
  }

}
