import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import {
  catchError,
  filter,
  finalize,
  map,
  Subscription,
  take,
  tap,
  throwError,
} from 'rxjs';
import { spinnerName } from '../account/consts';
import { FailedLoadService } from '../failed-load/services/failed-load.service';
import { HttpService } from '../tools/services/http.service';
import {
  searchLicenseKeys,
  Requests,
  nicknameSort,
  renewDateSort,
} from './const';
import { License } from './interfaces/license';
import { LicensesService } from './services/licenses.service';
import { Observable } from 'rxjs';

interface PipeData {
  search: string;
  licTypesFilter: string[];
  dsRolesFilter: string[];
  sortNickname: 'ascend' | 'discend' | null;
  sortRenewDate: 'ascend' | 'discend' | null;
}

enum SortType {
  'null' = 0,
  'ascend' = 1,
  'discend' = 2,
}

@Component({
  selector: 'app-licenses',
  templateUrl: './licenses.component.html',
  styleUrls: ['./licenses.component.scss'],
})
export class LicensesComponent implements OnInit, OnDestroy {
  pipeParams = {
    search: searchLicenseKeys,
    filter: ['type'],
    sortNickname: nicknameSort,
    sortRenewDate: renewDateSort,
  };

  pipeData: PipeData = {
    search: '',
    licTypesFilter: [],
    dsRolesFilter: [],
    sortNickname: null,
    sortRenewDate: null,
  };

  en = SortType;

  licenses!: Observable<License[]>;

  popupType: 'licenseForm' | 'licenseViewing' | null = null;
  popupLicense: License | null = null;

  sub: Subscription | undefined;

  constructor(
    private spinner: NgxSpinnerService,
    public lic: LicensesService,
    private flService: FailedLoadService
  ) {}

  ngOnInit(): void {
    this.getLicenses();
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
    this.flService.hide();
  }

  getLicenses() {
    this.spinner.show(spinnerName);

    this.licenses = this.lic.getLicenses(true).pipe(
      filter((d) => !!d),
      map((d) => (d ? d.map((l) => l) : [])),
      tap(() => this.spinner.hide(spinnerName)),
      catchError((err) => {
        this.spinner.hide(spinnerName);
        this.onFailedLoad();
        return throwError(err);
      })
    );
  }

  updLicenses() {
    this.spinner.show(spinnerName);

    this.lic
      .updateLicenses()
      .pipe(finalize(() => this.spinner.hide(spinnerName)))
      .subscribe({
        next: () => {},
        error: () => this.onFailedLoad(true),
      });
  }

  onViewLicense(lic: License) {
    this.popupLicense = lic;
    this.popupType = 'licenseViewing';
  }

  trackByFn(index: any, item: License) {
    return item.key;
  }

  onFailedLoad(upd: boolean = false) {
    this.sub = this.flService
      .show()
      .pipe(
        filter((r) => !r),
        take(1)
      )
      .subscribe((res) => (!upd ? this.getLicenses() : this.updLicenses()));
  }
}
