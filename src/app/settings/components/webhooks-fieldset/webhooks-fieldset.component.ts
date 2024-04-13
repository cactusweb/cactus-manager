import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { SettingsFieldset } from '../../settings.component';
import { Owner } from 'src/app/account/interfaces/owner';

@Component({
  selector: 'cm-webhooks-fieldset',
  templateUrl: './webhooks-fieldset.component.html',
  styleUrls: ['./webhooks-fieldset.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WebhooksFieldsetComponent implements SettingsFieldset {
  readonly form = new FormGroup({
    api: new FormControl<string | undefined>(undefined),
    discord: new FormControl<string | undefined>(undefined),
  });

  readonly whGuide = environment.guideURL + '/webhooks';

  validate(): boolean {
    return this.form.valid;
  }

  get _form(): Record<string, any> {
    return {
      webhooks: this.form.value,
    };
  }

  set _form(val: Owner) {
    if (val.webhooks) {
      this.form.patchValue(val.webhooks);
    }
  }
}
