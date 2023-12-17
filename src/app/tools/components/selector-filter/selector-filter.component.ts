import { Component, ElementRef, forwardRef, HostListener, Input, OnInit, ViewChild } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { SelectorValue } from '../../interfaces/selector-values';

@Component({
  selector: 'app-selector-filter',
  templateUrl: './selector-filter.component.html',
  styleUrls: ['./selector-filter.component.scss'],
  providers: [{ 
   provide: NG_VALUE_ACCESSOR,
   useExisting: forwardRef(() => SelectorFilterComponent),
   multi: true
  }]
})
export class SelectorFilterComponent implements ControlValueAccessor {
  @ViewChild('showStatus') showInp!: ElementRef;

  @Input()
  label = 'Filter'

  value: any[] = []
  @Input('opt') options: SelectorValue[] = []


  constructor(
    private eRef: ElementRef
  ) { }

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

}
