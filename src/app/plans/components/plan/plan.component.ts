import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { finalize, take } from 'rxjs';
import { PlansSpinnerName } from '../../const';
import { Plan } from '../../interfaces/plan';
import { PlansService } from '../../services/plans.service';

@Component({
  selector: 'app-plan',
  templateUrl: './plan.component.html',
  styleUrls: ['./plan.component.scss']
})
export class PlanComponent implements OnInit {
  @Input() plan!: Plan
  @Output() onDelete = new EventEmitter<string>();
  @Output() onView = new EventEmitter<string>()

  constructor(
    private plansService: PlansService,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit(): void {
  }

  deletePlan(){
    this.spinner.show(PlansSpinnerName)

    this.plansService.deletePlan(this.plan.id)
      .pipe(
        take(1),
        finalize(() => this.spinner.hide(PlansSpinnerName))
      )
      .subscribe({
        next: () => {},
        error: () => {},
        complete: () => this.onDelete.emit(this.plan.id)
      })
  }

}
