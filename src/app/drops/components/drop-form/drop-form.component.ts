import { Component, EventEmitter, HostListener, OnDestroy, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { filter, finalize, Subscription, take } from 'rxjs';
import { Plan } from 'src/app/plans/interfaces/plan';
import { PlansService } from 'src/app/plans/services/plans.service';
import { SelectorValue } from 'src/app/tools/interfaces/selector-values';
import { ToolsService } from 'src/app/tools/services/tools.service';
import { Drop } from '../../interfaces/drop';
import { DropsService } from '../../services/drops.service';
import { AccountService } from 'src/app/account/services/account.service';

@Component({
  selector: 'app-drop-form',
  templateUrl: './drop-form.component.html',
  styleUrls: ['./drop-form.component.scss']
})
export class DropFormComponent implements OnInit, OnDestroy {
  form!: FormGroup;
  loading: boolean = false;
  @Output() onClose = new EventEmitter();
  @Output() onCreate = new EventEmitter<Drop>();

  sub!: Subscription

  planOptions: SelectorValue[] = [];
  plans: Plan[] = [];

  isStripePaymentWay = false;

  constructor(
    private plansService: PlansService,
    private dropsService: DropsService,
    private tools: ToolsService,
    private acc: AccountService
  ) { }

  
  @HostListener('document:keydown.escape', ['$event'])
  onEscape(e: KeyboardEvent){
    this.onClose.emit();
  }

  ngOnInit(): void {
    this.generateForm();
    this.getPlans();
    this.getPaymentWay();
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }

  generateForm(){
    this.form = new FormGroup({
      quantity: new FormControl(null, Validators.required),
      price: new FormControl(null, Validators.required),
      stripe_price_id: new FormControl({ value: null, disabled: true }, Validators.required),
      password: new FormControl(null, Validators.required),
      start_at: new FormControl( new Date().toISOString().slice(0, -8), Validators.required ),
      plan: new FormControl(null, Validators.required)
    })
    this.subOnPlanControl();
  }


  subOnPlanControl(){
    this.sub = this.form.controls['plan'].valueChanges 
      .subscribe(planId => {
        let plan = this.plans.find(p => p.id == planId)

        if ( plan?.type.includes('trial') )
          this.form.controls['price'].disable()
        else
          this.form.controls['price'].enable()
      })
  }

  getPlans(){
    this.plansService.getPlans()
      .pipe(take(1))
      .subscribe(res => {
        this.plans = res;
        this.planOptions = this.plans.map(p => { return { value: p.id, display: p.name } })
      })
  }


  onSubmit(){
    this.form.markAllAsTouched();

    if ( this.form.invalid ) return;

    this.loading = true;

    let data = {
      ...this.form.value,
      start_at: new Date(this.form.value.start_at)
    }

    this.dropsService.postDrop( data )
      .pipe(
        take(1),
        finalize(() => this.loading = false)
      )
      .subscribe({
        next: d => this.onCreate.emit(d),
        error: () => {},
        complete: () => this.tools.generateNotification('Drop created', 'success')
      })
  }

  private getPaymentWay() {
    this.acc.owner
      .pipe(
        filter((res) => !!res),
        take(1),
        filter((res) => res!.payment.way === 'Stripe')
      )
      .subscribe(() => {
        this.isStripePaymentWay = true;

        this.form.get('stripe_price_id')!.enable();
      });
  }
}
