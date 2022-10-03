import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { finalize, map, Subscription, take } from 'rxjs';
import { spinnerName } from 'src/app/account/consts';
import { AccountService } from 'src/app/account/services/account.service';
import { ToolsService } from 'src/app/tools/services/tools.service';
import { Requests } from '../../const';
import { SettingsService } from '../../services/settings.service';

@Component({
  selector: 'app-avatar-inp',
  templateUrl: './avatar-inp.component.html',
  styleUrls: ['./avatar-inp.component.scss']
})
export class AvatarInpComponent implements OnInit, OnDestroy {
  ownerName: string = '';
  logoUrl: string = '';

  sub!: Subscription

  constructor(
    private tools: ToolsService,
    private acc: AccountService,
    private spinner: NgxSpinnerService,
    private settings: SettingsService
  ) { }

  ngOnInit(): void {
    this.sub = this.acc.owner
      .subscribe(res => {
        this.ownerName = res?.general.name || ''
        this.logoUrl = res?.uploads.avatar || '';
      })
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }

  
  onAddFile(event: Event){
    let file = this.tools.getFormData( event, this.ownerName);
    if ( !file ) return;

    this.spinner.show(spinnerName);
    
    this.settings.postAvatar( file )
      .pipe( 
        take(1), 
        finalize( () => this.spinner.hide(spinnerName) ) 
      )
      .subscribe({
        next: () => {},
        error: () => {},
        complete: () => this.tools.generateNotification('Logo changed', 'success')
      })
  }

}
