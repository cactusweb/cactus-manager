import { Component, forwardRef, Input, OnInit } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-password-inp',
  templateUrl: './password-inp.component.html',
  styleUrls: ['./password-inp.component.scss'],
  providers: [{ 
   provide: NG_VALUE_ACCESSOR,
   useExisting: forwardRef(() => PasswordInpComponent),
   multi: true
  }]
})
export class PasswordInpComponent implements ControlValueAccessor {
  val: string = '';
  @Input() id: string = 'password'
  @Input() placeholder = '';
  @Input() autoComplete = '';

  inpType: 'password' | 'text' = 'password'

  constructor() { }


  onChange(_: any){}
  onTouch(){}

  writeValue(val: any) {
    this.val = val;
    this.onTouch();
    this.onChange(this.val)
  }

  registerOnChange(fn: () => void) {
    this.onChange = fn
  }

  registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }

  onChangeType(){
    this.inpType = this.inpType == 'password' ? 'text' : 'password';
  }

}
