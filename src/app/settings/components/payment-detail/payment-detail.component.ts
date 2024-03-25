import { Component, EventEmitter, forwardRef, OnDestroy, OnInit, Output } from '@angular/core';
import { ControlValueAccessor, UntypedFormControl, UntypedFormGroup, NG_VALUE_ACCESSOR, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { SelectorValue } from 'src/app/tools/interfaces/selector-values';

@Component({
  selector: 'app-payment-detail',
  templateUrl: './payment-detail.component.html',
  styleUrls: ['./payment-detail.component.scss'],
  providers: [{ 
   provide: NG_VALUE_ACCESSOR,
   useExisting: forwardRef(() => PaymentDetailComponent),
   multi: true
  }]
})
export class PaymentDetailComponent implements ControlValueAccessor, OnDestroy {
  val: any

  @Output() onTypeChange = new EventEmitter<string>();
  @Output() onDelete = new EventEmitter();

  form!: UntypedFormGroup
  placeholder: string = 'Data'
  
  typeOpts: SelectorValue[] = [
    { value: 'cryptowallet', display: 'Cryptowallet' },
    { value: 'card', display: 'Card' },
  ]

  sub!: Subscription
  sub1!: Subscription

  constructor() {
    this.generateForm();
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
    this.sub1.unsubscribe();
  }

  onChange(_: any){
  }

  writeValue(val: any): void {
    this.val = val;
    this.onChange(val)
    this.form.patchValue(val, { emitEvent: false })
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {}

  generateForm(){
    this.form = new UntypedFormGroup({
      type: new UntypedFormControl('', Validators.required),
      value: new UntypedFormControl('', Validators.required)
    })

    this.sub1 = this.form.valueChanges.subscribe(res => {
      this.val = res;
      this.onChange(this.val)
    })

    this.subOnType();
  }

  subOnType(){
    this.sub = this.form.controls['type'].valueChanges.subscribe(res => {
                    if ( !res )
                      this.placeholder = 'Data'
                    else
                      this.placeholder = res == 'card' ? 'Card number' : 'Network - Address'
                  })
  }

}
