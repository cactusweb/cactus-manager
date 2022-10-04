import { EventEmitter, Injectable } from '@angular/core';
import { BehaviorSubject, catchError, Observable, share, tap, throwError } from 'rxjs';
import { HttpService } from 'src/app/tools/services/http.service';
import { Requests } from '../const';
import { Plan } from '../interfaces/plan';

@Injectable({
  providedIn: 'root'
})
export class PlansService {
  private plans!: Plan[]

  private $plans = new BehaviorSubject<Plan[]>([])

  



  constructor(
    private http: HttpService
  ) { }

  getPlans( update: boolean = false ): Observable<Plan[]>{
    if ( update )
      this.http.request( Requests['getPlans'] )
          .pipe(
            tap(d => {
              this.plans = d.reverse();
              this.$plans.next(this.plans)
            }),
            catchError(err => {
              this.$plans.error(err);
              return err
            })
          )
          .subscribe({
            next: () => {},
            error: () => this.$plans = new BehaviorSubject<Plan[]>(this.plans||[])
          })
        
    return this.$plans.asObservable().pipe(share());
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
