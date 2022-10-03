import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/services/auth.service';
import { AccountService } from '../../services/account.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit, OnDestroy {
  referralSystem: boolean = false;

  sub!: Subscription

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
