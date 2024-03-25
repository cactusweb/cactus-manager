import { Component, OnInit } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { Owner } from 'src/app/account/interfaces/owner';
import { SettingsFieldset } from '../../settings.component';

@Component({
  selector: 'app-tinkoff-fieldset',
  templateUrl: './tinkoff-fieldset.component.html',
  styleUrls: ['./tinkoff-fieldset.component.scss']
})
export class TinkoffFieldsetComponent implements OnInit, SettingsFieldset {
  form!: UntypedFormGroup

  constructor() { }

  ngOnInit(): void {
    this.generateForm();
  }

  generateForm(){
    this.form = new UntypedFormGroup({
      terminal_key: new UntypedFormControl(null, Validators.required),
      password: new UntypedFormControl(null, Validators.required)
    })
  }

  public validate(){
    this.form.markAllAsTouched();
    return this.form.valid
  }

  // @ts-ignore
  get _form(): Record<string, any>{
    return this.form.value
  }

  set _form(val: Owner){
    this.form.patchValue(val.payment.stripe)
  }
}
