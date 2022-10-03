import { Component, ElementRef, forwardRef, HostListener, Input, OnInit, ViewChild } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { SelectorValue } from '../../interfaces/selector-values';

@Component({
  selector: 'app-selector-multiply',
  templateUrl: './selector-multiply.component.html',
  styleUrls: ['./selector-multiply.component.scss'],
  providers: [{ 
   provide: NG_VALUE_ACCESSOR,
   useExisting: forwardRef(() => SelectorMultiplyComponent),
   multi: true
  }]
})
export class SelectorMultiplyComponent implements ControlValueAccessor {
  @ViewChild('showStatus') showInp!: ElementRef;
  
  value: any[] = [];

  @Input('opt') options: SelectorValue[] = []
  @Input() placeholder: string = 'Click to add'

  @Input() search: boolean = false;

  constructor(
    private eRef: ElementRef
  ) { }

  @HostListener('document:click', ['$event'])
  clickout(event: any) {
    if(!this.eRef.nativeElement.contains(event.target) && this.showInp.nativeElement.value == '1')
      this.showInp.nativeElement.value = '-1'
  }

  onChange(_: any){}

  writeValue(val: any[]): void {
    this.value = val;
    this.onChange(this.value)
  }

  registerOnChange(fn: any): void {
    this.onChange = fn
  }

  registerOnTouched(fn: any): void {}

  getSelectedValues(): SelectorValue[]{
    return this.options.filter( opt => this.value.includes(opt.value) )
  }

  removeValue( val: any ){
    let indexOf = this.value.findIndex(v => v == val)
    if ( indexOf < 0 ) return
    this.value.splice(indexOf, 1);
  }

  onClickControl( e: MouseEvent ){
    // @ts-ignore
    let el: HTMLElement | null = e.target;

    if ( el?.classList.contains('form-control__value') ) return;

    this.showInp.nativeElement.value = this.showInp.nativeElement.value == '-1' ? '1' : '-1'
  }
}
