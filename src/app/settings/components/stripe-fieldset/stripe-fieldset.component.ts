import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { UntypedFormGroup, UntypedFormControl, Validators } from '@angular/forms';
import { Owner } from 'src/app/account/interfaces/owner';
import { SettingsFieldset } from '../../settings.component';

@Component({
  selector: 'app-stripe-fieldset',
  templateUrl: './stripe-fieldset.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StripeFieldsetComponent implements OnInit, SettingsFieldset {
  form!: UntypedFormGroup;

  constructor() {}

  ngOnInit(): void {
    this.generateForm();
  }

  generateForm() {
    this.form = new UntypedFormGroup({
      webhook_secret_key: new UntypedFormControl(null, Validators.required),
      secret_key: new UntypedFormControl(null, Validators.required),
    });
  }

  public validate() {
    this.form.markAllAsTouched();
    return this.form.valid;
  }

  // @ts-ignore
  get _form(): Record<string, any> {
    return this.form.value;
  }

  set _form(val: Owner) {
    this.form.patchValue(val.payment.stripe);
  }
}
