import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import {
  FormControl,
  UntypedFormControl,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { map, Subscription } from 'rxjs';
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

  readonly whGuide = environment.guideURL + '/webhooks'

  constructor() {}

  get enabledControlValue() {
    return this.form.get('additional_activations')!.get('enabled')!.value;
  }

  ngOnInit(): void {
    this.form = new UntypedFormGroup({
      additional_activations: new UntypedFormGroup({
        enabled: new UntypedFormControl(false),
      }),
      webhookUrl: new FormControl<string | undefined>(undefined),
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
      additional_activations: {
        ...this.form.value.additional_activations,
        ...this.plansFieldset._form,
      },
      webhookUrl: this.form.value.webhookUrl,
    };
  }

  set _form(val: Owner) {
    this.form.patchValue(val);
    this.plansFieldset._form = val;
  }
}
