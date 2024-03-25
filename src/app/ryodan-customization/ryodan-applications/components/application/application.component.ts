import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import {
  RyodanApplication,
  RyodanApplicationStates,
} from '../../../common/interfaces/ryodan-customization.interfaces';
import { BehaviorSubject, finalize } from 'rxjs';
import { RyodanHttpService } from 'src/app/ryodan-customization/common/services/ryodan-http.service';
import { ToolsService } from 'src/app/tools/services/tools.service';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { SelectorValue } from 'src/app/tools/interfaces/selector-values';

const ApplicationStates = [
  RyodanApplicationStates.PENDING,
  RyodanApplicationStates.CONFIRMED,
  RyodanApplicationStates.REJECTED,
];

@Component({
  selector: 'ryodan-application',
  templateUrl: './application.component.html',
  styleUrls: ['./application.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RyodanApplicationComponent implements OnInit {
  @Input()
  application!: RyodanApplication;

  readonly loading$ = new BehaviorSubject(false);

  readonly form = new UntypedFormGroup({
    adminComment: new UntypedFormControl(''),
    state: new UntypedFormControl('', Validators.required),
  });

  readonly applicationStates: SelectorValue[] = ApplicationStates.map(
    (state) => ({
      display: state.charAt(0) + state.slice(1).toLowerCase(),
      value: state.toUpperCase(),
    })
  );

  readonly RyodanApplicationStates = RyodanApplicationStates;

  constructor(private http: RyodanHttpService, private tools: ToolsService) {}

  ngOnInit(): void {
    this.form.patchValue(this.application);
  }

  putApplication() {
    this.form.markAllAsTouched();

    if (this.form.invalid) return;

    this.loading$.next(true);
    this.http
      .putApplication(this.form.value, this.application.id)
      .pipe(finalize(() => this.loading$.next(false)))
      .subscribe({
        next: (updatedApp) => {
          this.tools.generateNotification('Application changed', 'success');
          this.application = updatedApp;
        },
        error: () => {},
      });
  }
}
