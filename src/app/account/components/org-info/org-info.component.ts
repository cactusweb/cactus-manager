import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AccountService } from '../../services/account.service';

@Component({
  selector: 'app-org-info',
  templateUrl: './org-info.component.html',
  styleUrls: ['./org-info.component.scss']
})
export class OrgInfoComponent implements OnInit, OnDestroy {
  logo: string = '';
  name: string = '';

  sub: Subscription

  constructor(
    private acc: AccountService
  ) {
    this.sub = this.acc.owner.subscribe(res => {
      this.logo = res?.uploads.avatar || '';
      this.name = res?.name || '';
    })
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }

}
