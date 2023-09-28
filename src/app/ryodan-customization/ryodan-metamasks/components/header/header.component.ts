import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { RyodanMmHeaderService } from './header.service';

@Component({
  selector: 'ryodan-mm-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class RyodanMmHeaderComponent implements OnInit {
  readonly formOpened$ = new BehaviorSubject(false);

  readonly remainingCount$ = this.headerService.remainingWalletCount$;

  constructor(private headerService: RyodanMmHeaderService) {}

  ngOnInit(): void {
    this.headerService.getRemainingWalletCount();
  }
}
