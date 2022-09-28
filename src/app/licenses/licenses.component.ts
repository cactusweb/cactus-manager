import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { filter, finalize, map, Subscription, take, tap } from 'rxjs';
import { spinnerName } from '../account/consts';
import { FailedLoadService } from '../failed-load/services/failed-load.service';
import { HttpService } from '../tools/services/http.service';
import { searchLicenseKeys, Requests, nicknameSort, renewDateSort } from './const';
import { License } from './interfaces/license';
import { LicensesService } from './services/licenses.service';

interface PipeData{
  search: string,
  filter: string[],
  sortNickname: 'ascend'|'discend'|null,
  sortRenewDate: 'ascend'|'discend'|null,
}

enum SortType{
  'null' = 0,
  'ascend' = 1,
  'discend' = 2
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
    sortRenewDate: renewDateSort
  }

  pipeData: PipeData = {
    search: '',
    filter: [],
    sortNickname: null,
    sortRenewDate: null
  }

  en = SortType
  
  licenses: License[] = []

  popupType: 'licenseForm' | 'licenseViewing' | null = null;
  popupLicenseId: string | null = null;

  sub: Subscription | undefined

  constructor(
    private http: HttpService,
    private spinner: NgxSpinnerService,
    private licenseService: LicensesService,
    private flService: FailedLoadService
  ) { }

  ngOnInit(): void {
    this.getLicenses();
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
    this.flService.hide();
  }

  getLicenses(fetch: boolean = false){
    this.spinner.show(spinnerName)

    this.licenseService.getLicenses(fetch)
      .pipe(
        take(1),
        finalize(() => this.spinner.hide(spinnerName))
      )
      .subscribe({
        next: val => this.licenses = val,
        error: () => this.onFailedLoad()
      })
  }


  onDeleteLicense( id: string ){
    this.licenses = this.licenses.filter(l => l.id !== id);
  }

  onRenewLicense( data: { id: string, expiresDate: number } ){
    this.licenses = this.licenses.map(l => {
      if ( l.id != data.id ) return l;
      return { ...l, expires_in: data.expiresDate }
    })
  }

  onPostLicense(license: License){
    if ( this.licenses.findIndex(l => l.id == license.id) < 0 ){
      this.licenses.push(license);
      return this.justMap()
    }
    this.licenses = this.licenses.map(l => {
      if ( l.id !== license.id ) return l;
      return license
    })
  }

  onViewLicense(id: string){
    this.popupLicenseId = id;
    this.popupType = 'licenseViewing';
  }

  getLicenseById(id: string): License | null{
    return this.licenses.find(l => l.id == id) || null
  }

  
  trackByFn(index: any, item: License){
    return item.key;
  }

  justMap( ){
    this.licenses = this.licenses.map(l => l)
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
