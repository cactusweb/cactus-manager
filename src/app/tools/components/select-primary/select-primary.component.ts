import { Component, ElementRef, forwardRef, HostListener, Input, OnInit, ViewChild } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { SelectorValue } from '../../interfaces/selector-values';

@Component({
  selector: 'app-select-primary',
  templateUrl: './select-primary.component.html',
  styleUrls: ['./select-primary.component.scss'],
  providers: [{ 
   provide: NG_VALUE_ACCESSOR,
   useExisting: forwardRef(() => SelectPrimaryComponent),
   multi: true
  }]
})
export class SelectPrimaryComponent implements ControlValueAccessor {
  @ViewChild('showStatus') showInp!: ElementRef;
  @Input() disabled!: boolean

  value!: string|number|null
  @Input('opt') options: SelectorValue[] = []

  @Input() placeholder: string = 'Click to choose';


  constructor(
    private eRef: ElementRef
  ) {}

  @HostListener('document:click', ['$event'])
  clickout(event: any) {
    if(!this.eRef.nativeElement.contains(event.target) && this.showInp.nativeElement.value == '1')
      this.showInp.nativeElement.value = '-1'
  }

  onChange(_: any){}

  writeValue(obj: any) {
    this.value = obj
    this.onChange(this.value)
  }

  registerOnChange(fn: () => void) {
    this.onChange = fn
  }

  registerOnTouched(fn: any) {
  }
  
  setDisabledState(isDisabled: boolean) {
    this.disabled = isDisabled;
  }

  getValueDisplay(){
    let opt = this.options.find(o => o.value == this.value)
    return !opt ? '' : (opt.display || opt.value)
  }

}
