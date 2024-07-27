import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
  signal,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { AccountService } from '../../services/account.service';

@Component({
  selector: 'app-org-info',
  templateUrl: './org-info.component.html',
  styleUrls: ['./org-info.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrgInfoComponent implements OnInit, OnDestroy {
  readonly logo= signal('');
  readonly name= signal('');

  sub: Subscription;

  constructor(private acc: AccountService) {
    this.sub = this.acc.owner.subscribe((res) => {
      this.logo.set(res?.uploads.avatar || '');
      this.name.set(res?.general.name || '');
    });
  }

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }
}
