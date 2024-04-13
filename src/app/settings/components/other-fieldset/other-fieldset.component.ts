import { Component, OnInit, ViewChild } from '@angular/core';
import {
  FormControl,
  UntypedFormControl,
  UntypedFormGroup,
} from '@angular/forms';
import { Owner } from 'src/app/account/interfaces/owner';
import { environment } from 'src/environments/environment';
import { SettingsFieldset } from '../../settings.component';

@Component({
  selector: 'app-other-fieldset',
  templateUrl: './other-fieldset.component.html',
  styleUrls: ['./other-fieldset.component.scss'],
})
export class OtherFieldsetComponent implements OnInit, SettingsFieldset {
  botInviteUrl = environment.dsBotInvite;
  showPassForm: boolean = false;

  form!: UntypedFormGroup;
  showPlansForm: boolean = false;

  @ViewChild('PlansFieldset') plansFieldset!: SettingsFieldset;

  constructor() {}

  get enabledControlValue() {
    return this.form.get('additional_activations')!.get('enabled')!.value;
  }

  ngOnInit(): void {
    this.form = new UntypedFormGroup({
      additional_activations: new UntypedFormGroup({
        enabled: new UntypedFormControl(false),
      }),
      webhook_url: new FormControl<string | undefined>(undefined),
    });
  }

  onInvite() {
    window.open(this.botInviteUrl, '_blank')?.focus();
  }

  validate(): boolean {
    return (
      ((this.enabledControlValue && this.plansFieldset.validate()) ||
        !this.enabledControlValue) &&
      this.form.valid
    );
  }

  // @ts-ignore
  get _form(): Record<string, any> {
    return {
      // additional_activations: {
      //   ...this.form.value.additional_activations,
      //   ...this.plansFieldset._form,
      // },
      // webhook_url: this.form.value.webhook_url,
    };
  }

  set _form(val: Owner) {
    this.form.patchValue(val);
    this.plansFieldset._form = val;
  }
}
