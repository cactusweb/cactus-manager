import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { RyodanHttpService } from '../common/services/ryodan-http.service';
import { RyodanDataService } from '../common/services/ryodan-data.service';
import { RyodanMetamaskUser } from '../common/interfaces/ryodan-customization.interfaces';
import { BehaviorSubject, Subject, map, takeUntil, withLatestFrom } from 'rxjs';
import { spinnerName } from 'src/app/account/consts';
import { NgxSpinnerService } from 'ngx-spinner';
import { RyodanHeaderService } from '../common/services/ryodan-header.service';
import { User } from 'src/app/licenses/interfaces/user';

@Component({
  selector: 'ryodan-metamasks',
  templateUrl: './metamasks.component.html',
  styleUrls: ['./metamasks.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RyodanMetamasksComponent implements OnInit, OnDestroy {
  readonly mmUsers$ = this.dataService.metamaskUsers$;
  readonly pending$ = this.dataService.metamaskUsersPending$;

  readonly viewingUser$ = new BehaviorSubject<User | null>(null);

  readonly pipeParams = {
    search: [['user', 'full_name']],
  };

  readonly pipeData: any = {
    search: '',
  };

  private readonly destroyed$ = new Subject<void>();

  constructor(
    private http: RyodanHttpService,
    private dataService: RyodanDataService,
    private spinner: NgxSpinnerService,
    private headerService: RyodanHeaderService,
    private cdr: ChangeDetectorRef
  ) {
    this.listenMmUsersLoading();
    this.listenSearchString();
  }

  ngOnInit(): void {
    this.http.getMetamaskUsers();
  }

  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }

  trackByIndex(index: number, item: RyodanMetamaskUser) {
    return item.user.id;
  }

  private listenMmUsersLoading() {
    this.dataService.metamaskUsersPending$
      .pipe(
        withLatestFrom(this.dataService.metamaskUsers$),
        takeUntil(this.destroyed$),
        map(([pending, mmUsers]) => pending && !mmUsers?.length)
      )
      .subscribe((showSpinner) =>
        this.spinner[showSpinner ? 'show' : 'hide'](spinnerName)
      );
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
