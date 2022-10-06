import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { catchError, filter, finalize, map, Observable, Subscription, take, tap, throwError } from 'rxjs';
import { FailedLoadService } from '../failed-load/services/failed-load.service';
import { PlansSpinnerName } from './const';
import { Plan } from './interfaces/plan';
import { PlansService } from './services/plans.service';

@Component({
  selector: 'app-plans',
  templateUrl: './plans.component.html',
  styleUrls: ['./plans.component.scss']
})
export class PlansComponent implements OnInit, OnDestroy {
  plans!: Observable<Plan[]>
  spinnerName = PlansSpinnerName

  showPlanForm: boolean = false;

  viewingPlan: Plan | null = null

  sub: Subscription | undefined

  @Output('onFailedLoad') emitFailedLoad = new EventEmitter();

  constructor(
    private planService: PlansService,
    private spinner: NgxSpinnerService,
    private flService: FailedLoadService
  ) { }

  ngOnInit(): void {
    this.getPlans();
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
    // this.flService.hide();
  }

  getPlans(){
    this.spinner.show(this.spinnerName)

    this.plans = this.planService.getPlans( true )
      .pipe(
        tap(() => this.spinner.hide(this.spinnerName)),
        map(t => t.map(d => d)),
        catchError(err => {
          this.spinner.hide(this.spinnerName)
          this.onFailedLoad();
          return throwError(err)
        }),
      )
  }

  // onDeletePlan(id: string){
  //   this.plans = this.plans.filter(p => p.id != id)
  // }


  // onNewPlan( p: Plan ){
  //   this.plans = [p,...this.plans]
  //   this.plans = this.plans.map(pl => pl)
  // }

  onViewPlan(plan: Plan){
    this.viewingPlan = plan;
    this.showPlanForm = true;
  }

  
  onFailedLoad(){
    this.sub = this.flService.show()
      .pipe(
        filter(r => !r),
        take(1),
      )
      .subscribe(res => this.getPlans())
  }
}
