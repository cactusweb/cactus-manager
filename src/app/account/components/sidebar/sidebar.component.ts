import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription, map } from 'rxjs';
import { AuthService } from 'src/app/auth/services/auth.service';
import { AccountService } from '../../services/account.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit, OnDestroy {
  referralSystem: boolean = false;

  sub!: Subscription

  readonly isRyodanCustomization$ = this.acc.owner.pipe(
    map(d => d?.id === environment.customization.ryodan.id)
  );

  constructor(
    public auth: AuthService,
    private acc: AccountService
  ) {
  }

  ngOnInit(): void {
    this.sub = this.acc.owner.subscribe(acc => this.referralSystem = acc?.referral.enabled || false)
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe()
  }
  
}
