import { Component, forwardRef, OnInit } from '@angular/core';
import { ControlValueAccessor, UntypedFormControl, UntypedFormGroup, NG_VALUE_ACCESSOR, Validators } from '@angular/forms';
import { Owner } from 'src/app/account/interfaces/owner';
import { SettingsFieldset } from '../../settings.component';

@Component({
  selector: 'app-project-fieldset',
  templateUrl: './project-fieldset.component.html',
  styleUrls: ['./project-fieldset.component.scss'],
})
export class ProjectFieldsetComponent implements SettingsFieldset {
  form!: UntypedFormGroup

  constructor() { }

  ngOnInit(): void {
    this.generateForm();
  }


  generateForm(){
    this.form = new UntypedFormGroup({
      discordId: new UntypedFormControl(null, Validators.required),
      site_url: new UntypedFormControl(null)
    })
  }
  
  validate(){
    this.form.markAllAsTouched();
    return this.form.valid;
  }

  // @ts-ignore
  get _form(): Record<string, any>{
    return this.form.value;
  }

  set _form(val: Owner){
    this.form.patchValue({ ...val.general, discordId: val.discord.id })
  }

}
