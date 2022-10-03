import { AfterViewChecked, Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Owner } from 'src/app/account/interfaces/owner';
import { paymentWays, currencies } from '../../const';
import { SettingsFieldset } from '../../settings.component';
import { AmeriaFieldsetComponent } from '../ameria-fieldset/ameria-fieldset.component';
import { PaymentDetailsFieldsetComponent } from '../payment-details-fieldset/payment-details-fieldset.component';
import { TinkoffFieldsetComponent } from '../tinkoff-fieldset/tinkoff-fieldset.component';

@Component({
  selector: 'app-payment-fieldset',
  templateUrl: './payment-fieldset.component.html',
  styleUrls: ['./payment-fieldset.component.scss']
})
export class PaymentFieldsetComponent implements OnInit, OnDestroy, SettingsFieldset {
  @ViewChild('PaymentWayData') dataFieldset!: TinkoffFieldsetComponent | AmeriaFieldsetComponent
  @ViewChild('PaymentDetails') dataDetails!: PaymentDetailsFieldsetComponent

  form!: FormGroup;

  paymentOpts = paymentWays
  currencyOpts = currencies

  sub!: Subscription

  owner!: Owner
  showPaymentDetails: boolean = false;

  constructor() { }

  ngOnInit(): void {
    this.generateForm()
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }
  


  generateForm(){
    this.form = new FormGroup({
      way: new FormControl(''),
      currency: new FormControl('USD', Validators.required),
      kick: new FormControl({ value: false, disabled: true }, Validators.required),
    })

    this.sub = this.form.controls['way'].valueChanges
      .subscribe(res => {
        this.form.controls['kick'][res === '' ? 'disable' : 'enable']()
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
        details: this.dataDetails._form
      }
    }
  }


  set _form(val: Owner){
    this.owner = val
    val.payment.currency = val.payment.currency || 'USD';

    this.form.patchValue({ ...val.payment })
    this.dataDetails._form = val;
  }


}
