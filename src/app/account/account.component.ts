import { Component, OnInit } from '@angular/core';
import { spinnerName } from './consts';
import { AccountService } from './services/account.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {
  spinnerName = spinnerName;

  constructor(
    private acc: AccountService
  ) { 
    this.acc.getOwnerData();
  }

  ngOnInit(): void {
  }

}
