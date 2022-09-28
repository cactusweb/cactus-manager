import { AfterViewInit, Component, HostListener, OnDestroy, OnInit, QueryList, ViewChild, ViewChildren, ViewEncapsulation } from '@angular/core';
import { Owner } from '../account/interfaces/owner';
import { AccountService } from '../account/services/account.service';
import { filter, first, Observable, Subscription, take, tap } from 'rxjs'
import { FailedLoadService } from '../failed-load/services/failed-load.service';
import { ComponentCanDeactivate } from './guards/pending-changes.guard';

export interface SettingsFieldset{
  validate: () => boolean,
  _form: Record<string, any>
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

  constructor(
    private acc: AccountService,
    private flService: FailedLoadService
  ) { 
  }

  @HostListener('window:beforeunload')
  canDeactivate(): Observable<boolean> | boolean {
    return true
    // insert logic to check if there are pending changes here;
    // returning true will navigate without confirmation
    // returning false will show a confirm dialog before navigating away
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

    console.log( valid, data )
  }
  
}
