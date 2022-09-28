import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { map, Subscription } from 'rxjs';
import { PlansService } from '../../services/plans.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
  @Output() onOpenPlanForm = new EventEmitter();

  plansLength: number = 0
  sub!: Subscription

  constructor(
    private plansService: PlansService
  ) { }

  ngOnInit(): void {
    this.getPlansLength();
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  getPlansLength(){
    this.sub = this.plansService.getPlans()
      .pipe(map(res => res.length))
      .subscribe(res => this.plansLength = res)
  }

}
