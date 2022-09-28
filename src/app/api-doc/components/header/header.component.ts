import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { filter, map, pipe, take, tap } from 'rxjs';
import { AccountService } from 'src/app/account/services/account.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  accId: string = '';
  @Output() onNewAccId = new EventEmitter<string>();

  constructor(
    private acc: AccountService
  ) { }

  async ngOnInit() {

    this.acc.owner
      .pipe(
        filter(a => !!a),
        map(acc => acc?.id),
        tap(id => this.onNewAccId.emit(id))
      )
      .subscribe(res => this.accId = res || '');

    // this.acc.owner()
  }

}
