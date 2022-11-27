import { Component, forwardRef, Input, OnDestroy, OnInit } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { MethodControl } from '../../interfaces/method-control';
import { MethodData } from '../../interfaces/method-data';

@Component({
  selector: 'payment-method',
  templateUrl: './payment-method.component.html',
  styleUrls: ['./payment-method.component.scss'],
  providers: [{ 
   provide: NG_VALUE_ACCESSOR,
   useExisting: forwardRef(() => PaymentMethodComponent),
   multi: true
  }],
  host: {
    '[style.position]' : "method ? 'static' : 'relative'",
  }
})
export class PaymentMethodComponent implements ControlValueAccessor, OnInit, OnDestroy {
  @Input() method: MethodControl|undefined;
  showAddressForm: boolean = false;

  _val: MethodData = { enabled: false, address: '' };
  get val(): MethodData{
    return this._val;
  }
  set val(value: MethodData){
    this._val = value;
    if ( this.onChange )
      this.onChange(value)
  }

  onChange!: (_: any) => void

  constructor(
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit(): void {
    if ( !this.method )
      this.spinner.show()
  }

  ngOnDestroy(): void {
    if ( !this.method )
      this.spinner.hide()
  }


  onSaveAddress(address: string){
    if ( !this._val.address )
      this._val.enabled = true;

    this._val.address = address; 
    this.val = this._val; 
    this.showAddressForm = false;
  }

  onStatusChange(enabled: boolean){
    this._val.enabled = enabled;
    this.val = this._val;
  }


  writeValue(obj: MethodData): void {
    if ( !obj ) return;
    this.val = obj
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {}

}
