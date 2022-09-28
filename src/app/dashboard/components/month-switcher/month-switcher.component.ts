import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MonthlyStat } from '../../interfaces/monthly-stat';

@Component({
  selector: 'app-month-switcher',
  templateUrl: './month-switcher.component.html',
  styleUrls: ['./month-switcher.component.scss']
})
export class MonthSwitcherComponent implements OnInit {
  months: string[] = [];
  currentMonthIndex: number = 11;

  @Input('stat') set  _months(val: MonthlyStat[]){
    this.months = val.map(s => s.name);
    this.currentMonthIndex =  this.months.length-1;
    this.onChangeMonthIndex.emit(this.currentMonthIndex);
  }

  @Output() onChangeMonthIndex = new EventEmitter<number>();

  constructor() { }

  ngOnInit(): void {
  }

  changeMonthIndex( delta: number ){
    this.currentMonthIndex+=delta;

    if ( this.currentMonthIndex < 0 ) this.currentMonthIndex = this.months.length - 1;
    if ( this.currentMonthIndex > this.months.length-1 ) this.currentMonthIndex = 0;

    this.onChangeMonthIndex.emit(this.currentMonthIndex)
  }

}
