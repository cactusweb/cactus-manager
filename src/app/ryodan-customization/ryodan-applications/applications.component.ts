import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { RyodanDataService } from '../common/services/ryodan-data.service';
import { BehaviorSubject, Subject, map, takeUntil, withLatestFrom } from 'rxjs';
import { RyodanApplication } from '../common/interfaces/ryodan-customization.interfaces';
import { RyodanHttpService } from '../common/services/ryodan-http.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { spinnerName } from 'src/app/account/consts';
import { RyodanHeaderService } from '../common/services/ryodan-header.service';

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

  private readonly destroyed$ = new Subject<void>();

  constructor(
    private dataService: RyodanDataService,
    private http: RyodanHttpService,
    private spinner: NgxSpinnerService,
    private headerService: RyodanHeaderService
  ) {
    this.listenAppLoading();
  }

  ngOnInit(): void {
    this.http.getApplications();
    this.listenUpdateData();
  }

  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }

  trackByIndex(index: number, item: any) {
    return index;
  }

  private listenAppLoading() {
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
}
