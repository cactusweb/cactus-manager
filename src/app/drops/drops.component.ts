import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { catchError, filter, finalize, map, Observable, Subscription, take, tap, throwError } from 'rxjs';
import { FailedLoadService } from '../failed-load/services/failed-load.service';
import { DropsSpinnerName } from './const';
import { Drop } from './interfaces/drop';
import { DropsService } from './services/drops.service';

@Component({
  selector: 'app-drops',
  templateUrl: './drops.component.html',
  styleUrls: ['./drops.component.scss']
})
export class DropsComponent implements OnInit, OnDestroy {
  spinnerName = DropsSpinnerName
  drops!: Observable<Drop[]>

  showDropForm: boolean = false;

  sub: Subscription | undefined

  constructor(
    private dropsService: DropsService,
    private spinner: NgxSpinnerService,
    private flService: FailedLoadService
  ) { }

  ngOnInit(): void {
    this.getDrops();
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
    this.flService.hide();
  }

  getDrops(){
    this.spinner.show(this.spinnerName)

    let takeCount = 0;

    this.drops = this.dropsService.getDrops(true)
      .pipe(
        tap(() => {
          takeCount++;
          if ( takeCount == 2 )
            this.spinner.hide(this.spinnerName);
        }),
        map(d => d.map(t => t)),
        catchError(err => {
          this.spinner.hide(this.spinnerName);
          this.onFailedLoad();
          return throwError(err)
        })
      )
      // .subscribe({
      //   next: d => this.drops = d,
      //   error: () => this.onFailedLoad(),
      // })
  }


  // onDeleteDrop( id: string ){
  //   this.drops = this.drops.filter(d => d.id != id)
  // }

  // onNewDrop( drop: Drop ){
  //   this.drops = [drop, ...this.drops]
  //   this.drops = this.drops.map(d => d)
  // }


  
  onFailedLoad(){
    this.sub = this.flService.show()
      .pipe(
        filter(r => !r),
        take(1),
      )
      .subscribe(res => this.getDrops())
  }
}
