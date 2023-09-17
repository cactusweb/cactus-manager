import { ChangeDetectionStrategy, Component, OnDestroy } from '@angular/core';
import { FormControl } from '@angular/forms';
import {
  Subject,
  combineLatest,
  debounceTime,
  distinctUntilChanged,
  filter,
  map,
  takeUntil,
} from 'rxjs';
import { RyodanHeaderService } from '../../services/ryodan-header.service';
import { RyodanDataService } from '../../services/ryodan-data.service';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'ryodan-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class RyodanHeaderComponent implements OnDestroy {
  readonly searchControl = new FormControl('');

  readonly updateDisabled$ = combineLatest([
    this.dataService.reportsPending$,
    this.dataService.applicationsPending$,
  ]).pipe(map(([repPending, appPending]) => repPending || appPending));

  private readonly destroyed$ = new Subject<void>();

  constructor(
    private headerService: RyodanHeaderService,
    private dataService: RyodanDataService,
    private router: Router
  ) {
    this.searchControl.valueChanges
      .pipe(
        distinctUntilChanged(),
        debounceTime(500),
        takeUntil(this.destroyed$)
      )
      .subscribe((res) => (this.headerService.searchString = res));

    this.resetSearchOnRoute();
  }

  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }

  updateData() {
    this.headerService.updateData();
  }

  private resetSearchOnRoute() {
    this.router.events
      .pipe(
        takeUntil(this.destroyed$),
        filter((val) => val instanceof NavigationEnd)
      )
      .subscribe(() => {
        this.searchControl.setValue('', { emitEvent: false });
        this.headerService.searchString = '';
      });
  }
}
