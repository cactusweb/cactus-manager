import { AfterViewInit, Component, HostListener, OnDestroy, OnInit, QueryList, ViewChild, ViewChildren, ViewEncapsulation } from '@angular/core';
import { Owner } from '../account/interfaces/owner';
import { AccountService } from '../account/services/account.service';
import { filter, finalize, first, Observable, Subject, Subscription, take, tap } from 'rxjs'
import { FailedLoadService } from '../failed-load/services/failed-load.service';
import { ComponentCanDeactivate } from './guards/pending-changes.guard';
import { SettingsService } from './services/settings.service';
import { UntypedFormGroup } from '@angular/forms';

export interface SettingsFieldset{
  validate: () => boolean,
  _form: Record<string, any>,
  form?: UntypedFormGroup
}

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SettingsComponent implements OnInit, OnDestroy, ComponentCanDeactivate {
  @ViewChildren('fieldset') fieldsets!: QueryList<SettingsFieldset>

  account!: Owner | null
  sub1: Subscription | undefined

  unloadWarning: boolean = false;
  initialData: Record<any, any> = {}
  $deactivating = new Subject<boolean>();

  loading: boolean = false;

  constructor(
    private acc: AccountService,
    private flService: FailedLoadService,
    private settings: SettingsService
  ) { 
  }


  ngOnInit(): void {
    this.getAcc()
  }

  ngOnDestroy(): void {
    this.sub1?.unsubscribe();
    this.flService.hide();
  }

  getAcc(){

    this.acc.getOwnerData();

    this.acc.owner
      .pipe(filter(a => !!a), take(1))
      .subscribe({
        next: a => {
          this.account = a

          setTimeout(() => {
            this.patchFormValue()
          }, 10);
        },
        error: () => this.onFailedLoad(),
      })
  }

  patchFormValue(){
    this.fieldsets?.forEach(f => {
      if ( !this.account ) return
      
      f._form = this.account;
    })

    setTimeout(() => {
      this.initialData = {};
      this.fieldsets.toArray().forEach(f => {
        this.initialData = { ...this.initialData, ...f._form }
      })
    }, 10);
  }
  
  onFailedLoad(){
    this.sub1 = this.flService.show()
      .pipe(
        filter(r => !r),
        take(1),
      )
      .subscribe(res => this.getAcc())
  }

  onSubmit(){
    let valid = true;
    let data: any = {}
    this.fieldsets.toArray().forEach(f => {
      f.validate() ? null : valid = false;
      data = { ...data, ...f._form }
    })

    if ( !valid ) return;

    this.loading = true;

    this.settings.putSettings(data)
      .pipe(
        take(1),
        finalize(() => this.loading = false)
      )
      .subscribe({
        next: (d: Owner) => {this.account = d, this.patchFormValue()},
        error: () => {}
      })
      
  }



  
  canDeactivate(): Observable<boolean> | boolean {
    let data = {}

    this.fieldsets.toArray().forEach(f => {
      data = { ...data, ...f._form }
    })

    if ( JSON.stringify(data) != JSON.stringify(this.initialData) )
      this.unloadWarning = true;
    else return true;

    return this.$deactivating.asObservable();
  }
  
}
