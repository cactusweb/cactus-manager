import { Component, forwardRef, Input, OnInit } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-checkbox-switcher',
  templateUrl: './checkbox-switcher.component.html',
  styleUrls: ['./checkbox-switcher.component.scss'],
  providers: [{ 
   provide: NG_VALUE_ACCESSOR,
   useExisting: forwardRef(() => CheckboxSwitcherComponent),
   multi: true
  }]
})
export class CheckboxSwitcherComponent implements ControlValueAccessor {
  val: boolean = false;
  disabled: boolean = false;


  @Input('i-id') id: string = '';

  constructor() { }


  onChange(_: any){}

  writeValue(val: any) {
    this.val = val;
    this.onChange(this.val)
  }

  registerOnChange(fn: () => void) {
    this.onChange = fn
  }

  registerOnTouched(fn: any): void {
  }

  setDisabledState(disabled: boolean){
    this.disabled = disabled
  }
}
