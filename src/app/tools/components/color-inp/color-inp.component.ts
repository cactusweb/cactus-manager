import { Component, forwardRef, Input, OnInit } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-color-inp',
  templateUrl: './color-inp.component.html',
  styleUrls: ['./color-inp.component.scss'],
  providers: [{ 
   provide: NG_VALUE_ACCESSOR,
   useExisting: forwardRef(() => ColorInpComponent),
   multi: true
  }]
})
export class ColorInpComponent implements ControlValueAccessor {
  val: any;
  focused: boolean = false;

  @Input() placeholder: string = 'Press to select'
  @Input('i-id') id: string = 'color';

  constructor() {
  }


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

}
