import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
} from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import {
  BehaviorSubject,
  Subject,
  withLatestFrom,
  takeUntil,
  map,
  take,
} from 'rxjs';
import { spinnerName } from 'src/app/account/consts';
import { RyodanShortReport } from '../common/interfaces/ryodan-customization.interfaces';
import { RyodanDataService } from '../common/services/ryodan-data.service';
import { RyodanHttpService } from '../common/services/ryodan-http.service';
import { RyodanHeaderService } from '../common/services/ryodan-header.service';
import {
  REPORTS_SEARCH_PARAMS,
  REPORTS_UPDATED_SORT_PARAMS,
} from './consts/reports.consts';

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

  readonly pipeParams = {
    search: REPORTS_SEARCH_PARAMS,
    sortUpdatedAt: REPORTS_UPDATED_SORT_PARAMS,
  };

  readonly pipeData: any = {
    searchi: '',
    sortUpdatedAt: null,
  };

  constructor(
    private dataService: RyodanDataService,
    private http: RyodanHttpService,
    private spinner: NgxSpinnerService,
    private headerService: RyodanHeaderService,
    private cdr: ChangeDetectorRef
  ) {
    this.listenReportsLoading();
  }

  ngOnInit(): void {
    this.http.getReports();
    this.listenUpdateData();
    this.listenSearchString();
  }

  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }

  trackByIndex(index: number, item: any) {
    return index;
  }

  justMap() {
    this.dataService.reports$
      .pipe(take(1))
      .subscribe((res) => (this.dataService.reports = res!.map((d) => d)));
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

  private listenSearchString() {
    this.headerService.searchString$
      .pipe(takeUntil(this.destroyed$))
      .subscribe((res) => {
        this.pipeData.search = res;
        this.cdr.markForCheck();
      });
  }
}
