import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Owner } from 'src/app/account/interfaces/owner';
import { environment } from 'src/environments/environment';
import { SettingsFieldset } from '../../settings.component';

@Component({
  selector: 'app-personalization-fieldset',
  templateUrl: './personalization-fieldset.component.html',
  styleUrls: ['./personalization-fieldset.component.scss']
})
export class PersonalizationFieldsetComponent implements OnInit, SettingsFieldset {
  form!: FormGroup;

  constructor() { }

  ngOnInit(): void {
    this.generateForm();
  }

  generateForm(){
    this.form = new FormGroup({
      primary_color: new FormControl(environment.primaryOwnerColor, Validators.required)
    })
  }

  validate(){
    this.form.markAllAsTouched();
    return this.form.valid;
  }

  // @ts-ignore
  get _form(): Record<string, any>{
    return this.form.value
  }

  set _form(val: Owner){
    this.form.patchValue({ primary_color: val.settings.primary_color || environment.primaryOwnerColor })
  }

}
