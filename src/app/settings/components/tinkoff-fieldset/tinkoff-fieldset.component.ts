import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Owner } from 'src/app/account/interfaces/owner';
import { SettingsFieldset } from '../../settings.component';

@Component({
  selector: 'app-tinkoff-fieldset',
  templateUrl: './tinkoff-fieldset.component.html',
  styleUrls: ['./tinkoff-fieldset.component.scss']
})
export class TinkoffFieldsetComponent implements OnInit, SettingsFieldset {
  form!: FormGroup

  constructor() { }

  ngOnInit(): void {
    this.generateForm();
  }

  generateForm(){
    this.form = new FormGroup({
      terminal_key: new FormControl(null, Validators.required),
      password: new FormControl(null, Validators.required)
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
    this.form.patchValue(val.settings.tinkoff)
  }
}
