import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { RyodanDataService } from '../common/services/ryodan-data.service';
import {
  BehaviorSubject,
  Subject,
  map,
  take,
  takeUntil,
  withLatestFrom,
} from 'rxjs';
import { RyodanApplication } from '../common/interfaces/ryodan-customization.interfaces';
import { RyodanHttpService } from '../common/services/ryodan-http.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { spinnerName } from 'src/app/account/consts';
import { RyodanHeaderService } from '../common/services/ryodan-header.service';
import {
  APPLICATIONS_SEARCH_PARAMS,
  APPLICATIONS_UPDATED_SORT_PARAMS,
} from './consts/applications.consts';

@Component({
  selector: 'ryodan-applications',
  templateUrl: './applications.component.html',
  styleUrls: ['./applications.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RyodanApplicationsComponent implements OnInit, OnDestroy {
  readonly applications$ = this.dataService.applications$;

  readonly viewingApplication$ = new BehaviorSubject<null | RyodanApplication>(
    null
  );

  readonly pipeParams = {
    search: APPLICATIONS_SEARCH_PARAMS,
    sortUpdatedAt: APPLICATIONS_UPDATED_SORT_PARAMS,
  };

  readonly pipeData: any = {
    searchi: '',
    sortUpdatedAt: null,
  };

  private readonly destroyed$ = new Subject<void>();

  constructor(
    private dataService: RyodanDataService,
    private http: RyodanHttpService,
    private spinner: NgxSpinnerService,
    private headerService: RyodanHeaderService,
    private cdr: ChangeDetectorRef
  ) {
    this.listenApplicationsLoading();
  }

  ngOnInit(): void {
    this.http.getApplications();
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
    this.dataService.applications$
      .pipe(take(1))
      .subscribe((res) => (this.dataService.applications = res!.map((d) => d)));
  }

  private listenApplicationsLoading() {
    this.dataService.applicationsPending$
      .pipe(
        withLatestFrom(this.dataService.applications$),
        takeUntil(this.destroyed$),
        map(([pending, applications]) => pending && !applications?.length)
      )
      .subscribe((showSpinner) =>
        this.spinner[showSpinner ? 'show' : 'hide'](spinnerName)
      );
  }

  private listenUpdateData() {
    this.headerService.updateData$
      .pipe(takeUntil(this.destroyed$))
      .subscribe(() => this.http.getApplications());
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
