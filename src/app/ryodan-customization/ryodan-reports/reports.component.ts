import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { BehaviorSubject, Subject, withLatestFrom, takeUntil, map } from 'rxjs';
import { spinnerName } from 'src/app/account/consts';
import { RyodanShortReport } from '../common/interfaces/ryodan-customization.interfaces';
import { RyodanDataService } from '../common/services/ryodan-data.service';
import { RyodanHttpService } from '../common/services/ryodan-http.service';
import { RyodanHeaderService } from '../common/services/ryodan-header.service';

@Component({
  selector: 'ryodan-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RyodanReportsComponent {
  readonly reports$ = this.dataService.reports$;

  readonly viewingReport$ = new BehaviorSubject<null | RyodanShortReport>(null);

  private readonly destroyed$ = new Subject<void>();

  constructor(
    private dataService: RyodanDataService,
    private http: RyodanHttpService,
    private spinner: NgxSpinnerService,
    private headerService: RyodanHeaderService
  ) {
    this.listenReportsLoading();
  }

  ngOnInit(): void {
    this.http.getReports();
    this.listenUpdateData();
  }

  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }

  trackByIndex(index: number, item: any) {
    return index;
  }

  private listenReportsLoading() {
    this.dataService.reportsPending$
      .pipe(
        withLatestFrom(this.dataService.reports$),
        takeUntil(this.destroyed$),
        map(([pending, reports]) => pending && !reports?.length)
      )
      .subscribe((showSpinner) =>
        this.spinner[showSpinner ? 'show' : 'hide'](spinnerName)
      );
  }

  private listenUpdateData() {
    this.headerService.updateData$
      .pipe(takeUntil(this.destroyed$))
      .subscribe(() => this.http.getReports());
  }
}
