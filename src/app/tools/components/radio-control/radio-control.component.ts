import { Component, ElementRef, forwardRef, Input, OnInit } from '@angular/core';
import { AbstractControl, ControlValueAccessor, NG_VALIDATORS, NG_VALUE_ACCESSOR, ValidationErrors, Validator, Validators } from '@angular/forms';
import { SelectorValue } from '../../interfaces/selector-values';

@Component({
  selector: 'app-radio-control',
  templateUrl: './radio-control.component.html',
  styleUrls: ['./radio-control.component.scss'],
  providers: [{ 
   provide: NG_VALUE_ACCESSOR,
   useExisting: forwardRef(() => RadioControlComponent),
   multi: true
  }]
})
export class RadioControlComponent implements ControlValueAccessor {
  val!: string | number | boolean | undefined

  @Input() options: SelectorValue[] = [];

  @Input('name') radioName: string = '';

  isFirstChange: boolean = true;

  constructor(
    private eRef: ElementRef
  ) {}

  setChangableOpt(){
    this.isFirstChange = false;

    this.options = this.options.map(opt => {
      if ( !opt.valueChange || !this.val ) return opt;
      opt.value = this.val;
      return opt
    })
  }

  
  onChange(_: any){}
  onTouch(){}

  writeValue(val: any) {
    this.val = val;
    this.onTouch();
    this.onChange(this.val)
  }

  registerOnChange(fn: () => void) {
    if ( this.isFirstChange ) this.setChangableOpt()
    this.onChange = fn
  }

  registerOnTouched(fn: any) {
    this.onTouch = fn
  }

  focusOnInput(){
    setTimeout(() => {
      this.eRef.nativeElement.querySelector('.radio-wrapper__label input')?.focus()
    }, 1);
  }
}
