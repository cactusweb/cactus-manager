import { Component, OnInit } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { Owner } from 'src/app/account/interfaces/owner';
import { environment } from 'src/environments/environment';
import { SettingsFieldset } from '../../settings.component';

@Component({
  selector: 'app-personalization-fieldset',
  templateUrl: './personalization-fieldset.component.html',
  styleUrls: ['./personalization-fieldset.component.scss']
})
export class PersonalizationFieldsetComponent implements OnInit, SettingsFieldset {
  form!: UntypedFormGroup;

  constructor() { }

  ngOnInit(): void {
    this.generateForm();
  }

  generateForm(){
    this.form = new UntypedFormGroup({
      primary_color: new UntypedFormControl(environment.primaryOwnerColor, Validators.required)
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
    this.form.patchValue({ primary_color: val.general.primary_color || environment.primaryOwnerColor })
  }

}
