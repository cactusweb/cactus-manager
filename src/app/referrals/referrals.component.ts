import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { catchError, filter, finalize, map, Observable, Subscription, take, tap, throwError } from 'rxjs';
import { spinnerName } from '../account/consts';
import { FailedLoadService } from '../failed-load/services/failed-load.service';
import { nicknameSort, refScoreSort, searchLicenseKeys } from '../licenses/const';
import { License } from '../licenses/interfaces/license';
import { LicensesService } from '../licenses/services/licenses.service';


interface PipeData{
  search: string,
  nickname: 'ascend'|'discend'|null,
  refScore: 'ascend'|'discend'|null,
}


@Component({
  selector: 'app-referrals',
  templateUrl: './referrals.component.html',
  styleUrls: ['./referrals.component.scss']
})
export class ReferralsComponent implements OnInit, OnDestroy {
  licenses!: Observable<License[]>

  popupLicense: License | null = null;
  scoreEditLicense: License|null = null;
  sub: Subscription | undefined

  pipeParams = {
    search: searchLicenseKeys,
    nickname: nicknameSort,
    refScore: refScoreSort
  }

  pipeData: PipeData = {
    search: '',
    nickname: null,
    refScore: null
  }

  constructor(
    public lic: LicensesService,
    private spinner: NgxSpinnerService,
    private flService: FailedLoadService
  ) { }

  ngOnInit(): void {
    this.getLicenses();
  }

  ngOnDestroy(){
    this.sub?.unsubscribe();
    this.flService.hide();
  }

  getLicenses(){
    this.spinner.show(spinnerName)

    this.licenses = this.lic.getLicenses(true)
      .pipe(
        filter(d => !!d),
        map(d => d ? d.map(l => l) : []),
        tap(() => this.spinner.hide(spinnerName)),
        catchError(err => {
          this.spinner.hide(spinnerName)
          this.onFailedLoad();
          return throwError(err)
        })
      )
  }


  
  trackByFn(index: any, item: License){
    return item.key;
  }

  
  onFailedLoad(){
    this.sub = this.flService.show()
      .pipe(
        filter(r => !r),
        take(1),
      )
      .subscribe(res => this.getLicenses())
  }


}
