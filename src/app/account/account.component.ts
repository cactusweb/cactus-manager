import { Component, OnInit } from '@angular/core';
import { ACCOUNT_SPINNER_NAME } from './consts';
import { AccountService } from './services/account.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss'],
})
export class AccountComponent implements OnInit {
  readonly ACCOUNT_SPINNER_NAME = ACCOUNT_SPINNER_NAME;

  constructor(private acc: AccountService) {
    this.acc.getOwnerData();
  }

  ngOnInit(): void {}
}
