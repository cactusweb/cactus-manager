import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { map, Subscription } from 'rxjs';
import { Owner } from 'src/app/account/interfaces/owner';
import { environment } from 'src/environments/environment';
import { SettingsFieldset } from '../../settings.component';

@Component({
  selector: 'app-other-fieldset',
  templateUrl: './other-fieldset.component.html',
  styleUrls: ['./other-fieldset.component.scss']
})
export class OtherFieldsetComponent implements OnInit, SettingsFieldset {
  botInviteUrl = environment.dsBotInvite;
  showPassForm: boolean = false;

  form!: FormGroup
  showPlansForm: boolean = false;

  @ViewChild('PlansFieldset') plansFieldset!: SettingsFieldset

  constructor() { }

  ngOnInit(): void {
    this.form = new FormGroup({
      enabled: new FormControl(false),
    })
  }

  onInvite(){
    window.open(this.botInviteUrl, '_blank')?.focus();
  }

  validate(): boolean{
    return (this.form.get('enabled')!.value && this.plansFieldset.validate() || !this.form.get('enabled')!.value) && this.form.valid;
  }


  // @ts-ignore
  get _form(): Record<string, any>{
    return {
      additional_activations: {
        ...this.form.value,
        ...this.plansFieldset._form,
      }
    };
  }

  set _form(val: Owner){
    this.form.patchValue({ ...val.additional_activations })
    this.plansFieldset._form = val;
  }

}
