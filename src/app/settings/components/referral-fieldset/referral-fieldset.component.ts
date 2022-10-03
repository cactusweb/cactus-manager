import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { filter, finalize, map, Subscription, take, tap } from 'rxjs';
import { spinnerName } from 'src/app/account/consts';
import { Owner } from 'src/app/account/interfaces/owner';
import { PlansService } from 'src/app/plans/services/plans.service';
import { SelectorValue } from 'src/app/tools/interfaces/selector-values';
import { SettingsFieldset } from '../../settings.component';

@Component({
  selector: 'app-referral-fieldset',
  templateUrl: './referral-fieldset.component.html',
  styleUrls: ['./referral-fieldset.component.scss']
})
export class ReferralFieldsetComponent implements OnInit, SettingsFieldset {
  form!: FormGroup

  sub!: Subscription

  planOpts!: SelectorValue[] ;

  constructor(
    private plans: PlansService,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit(): void {
    this.generateForm();
  }

  generateForm(){
    this.form = new FormGroup({
      enabled: new FormControl(false, Validators.required),
      price: new FormControl({ value: null, disabled: true }, Validators.required),
      plan: new FormControl({ value: null, disabled: true }, Validators.required)
    })

    this.listenEnableStatus()
  }

  validate(){
    this.form.markAllAsTouched();
    return this.form.valid;
  }

  // @ts-ignore
  get _form(): Record<string,any>{
    return { referral: this.form.value };
  }

  set _form(val: Owner){
    this.form.patchValue(val.referral)
  }


  listenEnableStatus(){
    this.sub = this.form.controls['enabled'].valueChanges.subscribe(res => {
      if ( res ){
        if ( !this.planOpts ) this.getPlans();

        this.form.controls['price'].enable()
        this.form.controls['plan'].enable()
      }
      else {
        this.form.controls['price'].disable()
        this.form.controls['plan'].disable()
      }
    })
  }

  getPlans(){
    let first = true;
    this.spinner.show(spinnerName)

    this.plans.getPlans()
      .pipe(
        tap(p => first && p.length == 0 ? this.plans.getPlans(true).pipe(take(1)).subscribe() : null),
        filter(p => {
          let filtered = !(first && p.length == 0);
          first = false;
          return filtered
        }),
        take(1),
        map(plans => plans.map(p => {
            return { display: p.name, value: p.id }
        })),
        finalize(() => this.spinner.hide(spinnerName))
      )
      .subscribe(res => this.planOpts = res)
  }

}
