import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { FailedLoadService } from './services/failed-load.service';

@Component({
  selector: 'failed-load',
  templateUrl: './failed-load.component.html',
  styleUrls: ['./failed-load.component.scss'],
  host : {
      '[style.width]' : "show ? '100%' : '0px'",
      '[style.height]' : "show ? '100%' : '0px'",
      '[style.top]' : "show ? '0px' : 'auto'",
      '[style.left]' : "show ? '0px' : 'auto'",
  }
})
export class FailedLoadComponent implements OnInit, OnDestroy {
  sub!: Subscription
  show: boolean = false

  constructor(
    public flService: FailedLoadService
  ) { }

  ngOnInit(): void {
    this.subOnShowStatus();
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  subOnShowStatus(){
    this.sub = this.flService.viewing.subscribe(res => this.show = res);
  }
  
}
