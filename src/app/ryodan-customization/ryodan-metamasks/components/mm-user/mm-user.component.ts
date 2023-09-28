import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import {
  BehaviorSubject,
  Observable,
  Subject,
  finalize,
  takeUntil,
} from 'rxjs';
import { RyodanMetamask } from 'src/app/ryodan-customization/common/interfaces/ryodan-customization.interfaces';
import { RyodanHttpService } from 'src/app/ryodan-customization/common/services/ryodan-http.service';
import { ToolsService } from 'src/app/tools/services/tools.service';

@Component({
  selector: 'ryodan-mm-user',
  templateUrl: './mm-user.component.html',
  styleUrls: ['./mm-user.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RyodanMmUserComponent implements OnInit, OnDestroy {
  @Input()
  userId!: string;

  @Output()
  close = new EventEmitter<void>();

  metamasks: RyodanMetamask[] | undefined;

  readonly pending$ = new BehaviorSubject(false);

  private readonly destroyed$ = new Subject<void>();

  constructor(
    private http: RyodanHttpService,
    private cdr: ChangeDetectorRef,
    private tools: ToolsService
  ) {}

  ngOnInit(): void {
    this.http
      .getUserMetamasks(this.userId)
      .pipe(
        takeUntil(this.destroyed$),
        finalize(() => this.cdr.markForCheck())
      )
      .subscribe({
        next: (d) => (this.metamasks = d),
        error: () => {},
      });
  }

  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }

  trackByIndex(index: number, item: RyodanMetamask) {
    return item.id;
  }

  deleteAll() {
    this.pending$.next(true);

    this.http
      .deleteMetamasksForUser(this.userId)
      .pipe(finalize(() => this.pending$.next(false)))
      .subscribe({
        next: () => {
          this.metamasks = [];
          this.cdr.markForCheck();
          this.tools.generateNotification('Wallets deleted', 'success');
        },
        error: () => {},
      });
  }

  deleteMm(mmId: string) {
    this.pending$.next(true);

    this.http
      .deleteMetamaskWallet(mmId, this.userId)
      .pipe(finalize(() => this.pending$.next(false)))
      .subscribe({
        next: () => {
          this.metamasks = this.metamasks!.filter((mm) => mm.id !== mmId);
          this.cdr.markForCheck();
        },
        error: () => {},
      });
  }
}
