import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { BehaviorSubject, Observable, finalize, tap } from 'rxjs';
import {
  RyodanReport,
  RyodanReportStates,
} from 'src/app/ryodan-customization/common/interfaces/ryodan-customization.interfaces';
import { RyodanHttpService } from 'src/app/ryodan-customization/common/services/ryodan-http.service';
import { SelectorValue } from 'src/app/tools/interfaces/selector-values';
import { ToolsService } from 'src/app/tools/services/tools.service';

const ReportStates = [
  RyodanReportStates.PENDING,
  RyodanReportStates.REVISION,
  RyodanReportStates.CHECK,
  RyodanReportStates.CONFIRMED,
  RyodanReportStates.REJECTED,
];

@Component({
  selector: 'ryodan-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RyodanReportComponent implements OnInit {
  @Input()
  reportId!: string;

  report$!: Observable<RyodanReport>;

  readonly viewingImg$ = new BehaviorSubject<null | string>(null);

  readonly loading$ = new BehaviorSubject(false);

  readonly form = new FormGroup({
    adminComment: new FormControl(''),
    state: new FormControl('', Validators.required),
  });

  readonly reportStates: SelectorValue[] = ReportStates.map((state) => ({
    display: state.charAt(0) + state.slice(1).toLowerCase(),
    value: state.toUpperCase(),
  }));

  constructor(
    private http: RyodanHttpService,
    private tools: ToolsService,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit(): void {
    this.spinner.show('reportSpinner');
    this.report$ = this.http.getReportById(this.reportId).pipe(
      tap((d) => {
        this.spinner.show('reportSpinner');
        this.form.patchValue(d);
      })
    );
  }

  putReport() {
    this.form.markAllAsTouched();

    if (this.form.invalid) return;

    this.loading$.next(true);
    this.http
      .putReport(this.form.value, this.reportId)
      .pipe(finalize(() => this.loading$.next(false)))
      .subscribe({
        next: () =>
          this.tools.generateNotification('Report changed', 'success'),
        error: () => {},
      });
  }

  getDescriptionPoints(description: string) {
    return JSON.parse(description) as string[];
  }

  trackByIndex(index: number, item: any) {
    return index;
  }
}
