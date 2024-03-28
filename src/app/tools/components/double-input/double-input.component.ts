import { Component, EventEmitter, forwardRef, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { ControlValueAccessor, UntypedFormControl, UntypedFormGroup, NG_VALUE_ACCESSOR, Validators } from '@angular/forms';
import { map, Subscription } from 'rxjs';

interface Structure{
  name: string,
  placeholder: string,
  icon?: string
}

@Component({
  selector: 'app-double-input',
  templateUrl: './double-input.component.html',
  styleUrls: ['./double-input.component.scss'],
  providers: [{ 
   provide: NG_VALUE_ACCESSOR,
   useExisting: forwardRef(() => DoubleInputComponent),
   multi: true
  }]
})
export class DoubleInputComponent implements OnInit, ControlValueAccessor, OnDestroy {
  form!: UntypedFormGroup
  sub!: Subscription

  @Input() struct!: { param1: Structure, param2: Structure }
  @Output() onDelete = new EventEmitter();

  onChange!: (_: any) => void

  constructor() { }

  ngOnInit(): void {
    this.form = new UntypedFormGroup({
      param1: new UntypedFormControl(null, Validators.required),
      param2: new UntypedFormControl(null, Validators.required)
    })

    this.sub = this.form.valueChanges
      .pipe(
        map( d => {
          return {
            [this.struct.param1.name]: d['param1'],
            [this.struct.param2.name]: d['param2']
          }
        })
      )
      .subscribe( res => this.onChange(res) )
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }


  writeValue(val: any): void {
    if ( !val ) return
    
    this.form.patchValue({
      param1: val[this.struct.param1.name],
      param2: val[this.struct.param2.name],
    }, { emitEvent: false })
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {}

}
