import { Component, Input, OnInit } from '@angular/core';
import { MonthlyStat } from '../../interfaces/monthly-stat';

@Component({
  selector: 'app-monthly-stat',
  templateUrl: './monthly-stat.component.html',
  styleUrls: ['./monthly-stat.component.scss']
})
export class MonthlyStatComponent implements OnInit {
  stats: MonthlyStat[] = []
  @Input() currency: string = 'USD'

  @Input('stats') set _stats(val: MonthlyStat[]){
    this.stats = val.reverse();
  }

  monthStatIndex: number = 0;

  constructor() { }

  ngOnInit(): void {
  }

}
