import { Component, EventEmitter, HostListener, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AccountService } from 'src/app/account/services/account.service';
import { SelectorValue } from 'src/app/tools/interfaces/selector-values';
import { Plan } from '../../interfaces/plan';
import { finalize, Subscription, take } from 'rxjs';
import { ToolsService } from 'src/app/tools/services/tools.service';
import { PlansService } from '../../services/plans.service';

@Component({
  selector: 'app-plan-form',
  templateUrl: './plan-form.component.html',
  styleUrls: ['./plan-form.component.scss']
})
export class PlanFormComponent implements OnInit, OnDestroy {
  form!: FormGroup
  @Output() onClose = new EventEmitter()
  @Output() onCreate = new EventEmitter<Plan>();

  @Input() plan: Plan | null = null

  loading: boolean = false
  sub!: Subscription

  dsRoleOptions: SelectorValue[] = []

  constructor(
    private acc: AccountService,
    private tools: ToolsService,
    private plansService: PlansService
  ) { }

  
  @HostListener('document:keydown.escape', ['$event'])
  onEscape(e: KeyboardEvent){
    this.onClose.emit();
  }

  ngOnInit(): void {
    this.generateForm();
    this.getDsRoles();
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
  

  generateForm(){
    this.form = new FormGroup({
      name: new FormControl( null, Validators.required ),
      activations: new FormControl( null, Validators.required ),
      unbindable: new FormControl( false ),
      license_status: new FormControl( 'renewal', Validators.required ),
      renewal_price: new FormControl( null, Validators.required ),
      roles: new FormControl( [] ),
      trial_time: new FormControl( { value: null, disabled: true }, Validators.required )
    })
    this.subOnLicenseType();

    if ( !this.plan ) return
    this.form.patchValue({
      ...this.plan,
      roles: this.plan.roles.map(r => r.id)
    })
  }

  
  getDsRoles(){
    this.acc.roles.pipe(take(1)).subscribe(roles => 
      this.dsRoleOptions = roles.map(r => {
        return { display: r.name, value: r.id }
      })
    )
  }

  
  subOnLicenseType(){
    this.sub = this.form.controls['license_status'].valueChanges.subscribe(v => {
      if ( v.includes('trial') )
        this.form.controls['trial_time'].enable();
      else
        this.form.controls['trial_time'].disable();

      if ( v == 'lifetime' || v == 'trial' )
        this.form.controls['renewal_price'].disable();
      else 
        this.form.controls['renewal_price'].enable();
    })
  }

  onSubmit(){
    this.form.markAllAsTouched();
    
    if ( this.form.controls['activations'].invalid ) this.tools.generateNotification('Set activations count!')

    if ( this.form.invalid ) return;
    
    this.loading = true;

    let data = { 
      ...this.form.value, 
      trial_time: !this.form.controls['license_status'].value.includes('trial') ? null : (this.form.controls['trial_time'].value * 24 * 60 * 60)
    }

    this.plansService.postPlan( data )
      .pipe(
        take(1),
        finalize(() => this.loading = false)
      )
      .subscribe({
        next: p => this.onCreate.emit(p),
        error: () => {},
        complete: () => this.tools.generateNotification('Plan created', 'success')
      })
      
  }
}