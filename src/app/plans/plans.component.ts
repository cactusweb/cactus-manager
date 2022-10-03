import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { filter, finalize, Subscription, take, tap } from 'rxjs';
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
  plans!: Plan[]
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

    this.planService.getPlans( true )
      .pipe(
        take(1),
        finalize(() => this.spinner.hide(this.spinnerName))
      )
      .subscribe({
        next: d => this.plans = d,
        error: () => this.onFailedLoad()
      })
  }

  onDeletePlan(id: string){
    this.plans = this.plans.filter(p => p.id != id)
  }


  onNewPlan( p: Plan ){
    this.plans = [p,...this.plans]
    this.plans = this.plans.map(pl => pl)
  }

  onViewPlan(id: string){
    this.viewingPlan = this.plans.find(p => p.id == id) || null;
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
