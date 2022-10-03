import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Owner } from 'src/app/account/interfaces/owner';
import { SettingsFieldset } from '../../settings.component';

@Component({
  selector: 'app-ameria-fieldset',
  templateUrl: './ameria-fieldset.component.html',
  styleUrls: ['./ameria-fieldset.component.scss']
})
export class AmeriaFieldsetComponent implements OnInit, SettingsFieldset {
  form!: FormGroup

  constructor() { }

  ngOnInit(): void {
    this.generateForm()
  }

  generateForm(){
    this.form = new FormGroup({
      merchant_id: new FormControl(null, Validators.required),
      merchant_username: new FormControl(null, Validators.required),
      merchant_password: new FormControl(null, Validators.required),
    })
  }

  validate(){
    this.form.markAllAsTouched();
    return this.form.valid
  }

  // @ts-ignore
  get _form(): Record<string, any>{
    return this.form.value
  }

  set _form(val: Owner){
    this.form.patchValue(val.payment.ameria)
  }
}
