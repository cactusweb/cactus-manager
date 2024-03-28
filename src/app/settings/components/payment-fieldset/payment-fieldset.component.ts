import { AfterViewChecked, Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Owner } from 'src/app/account/interfaces/owner';
import { paymentWays, currencies } from '../../const';
import { SettingsFieldset } from '../../settings.component';
import { AmeriaFieldsetComponent } from '../ameria-fieldset/ameria-fieldset.component';
import { CryptoFieldsetComponent } from '../crypto-fieldset/crypto-fieldset.component';
import { PaymentCallsFieldsetComponent } from '../payment-calls-fieldset/payment-calls-fieldset.component';
import { PaymentDetailsFieldsetComponent } from '../payment-details-fieldset/payment-details-fieldset.component';
import { TinkoffFieldsetComponent } from '../tinkoff-fieldset/tinkoff-fieldset.component';

@Component({
  selector: 'app-payment-fieldset',
  templateUrl: './payment-fieldset.component.html',
  styleUrls: ['./payment-fieldset.component.scss']
})
export class PaymentFieldsetComponent implements OnInit, OnDestroy, SettingsFieldset {
  @ViewChild('PaymentWayData') dataFieldset!: TinkoffFieldsetComponent | AmeriaFieldsetComponent | CryptoFieldsetComponent
  @ViewChild('PaymentDetails') dataDetails!: PaymentDetailsFieldsetComponent
  @ViewChild('PaymentCalls') dataCalls!: PaymentCallsFieldsetComponent;
  form!: UntypedFormGroup;

  paymentOpts = paymentWays
  currencyOpts = currencies

  sub!: Subscription

  owner!: Owner
  showPaymentDetails: boolean = false;
  showPaymentCalls: boolean = false;

  constructor() { }

  ngOnInit(): void {
    this.generateForm()
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }
  


  generateForm(){
    this.form = new UntypedFormGroup({
      way: new UntypedFormControl(''),
      currency: new UntypedFormControl('USD', Validators.required)
    })

    this.sub = this.form.controls['way'].valueChanges
      .subscribe(res => {
        if ( !res ) return
        setTimeout(() => {
          this.dataFieldset._form = this.owner
        }, 10);
      })
  }

  validate(){
    this.form.markAllAsTouched();
    return (this.dataFieldset ? this.dataFieldset.validate() : true) && this.form.valid;
  }

  // @ts-ignore
  get _form(): Record<string, any>{
    let way = this.form.controls['way'].value;
    return {
      payment: {
        ...this.form.value,
        tinkoff: way !== 'Tinkoff' ? null : this.dataFieldset._form,
        ameria: way !== 'Ameria' ? null : this.dataFieldset._form,
        crypto: way !== 'Crypto' ? null : this.dataFieldset._form,
        stripe: way !== 'Stripe' ? null : this.dataFieldset._form,
        details: this.dataDetails._form,
        calls: this.dataCalls._form
      }
    }
  }


  set _form(val: Owner){
    this.owner = val
    val.payment.currency = val.payment.currency || 'USD';

    this.form.patchValue({ ...val.payment })
    this.dataDetails._form = val;
    this.dataCalls._form = val;
  }


}
