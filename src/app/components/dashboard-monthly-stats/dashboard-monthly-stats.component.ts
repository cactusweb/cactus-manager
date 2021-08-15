import { Component, Input, OnInit } from '@angular/core';
import { MonthlyStats } from 'src/app/interfaces/monthly-stats';

@Component({
  selector: 'app-dashboard-monthly-stats',
  templateUrl: './dashboard-monthly-stats.component.html',
  styleUrls: ['./dashboard-monthly-stats.component.scss']
})
export class DashboardMonthlyStatsComponent implements OnInit {
  @Input() monthlyStats: MonthlyStats[] = [];
  @Input() currency: string = 'usd';
  currentMonthIndex = 0;

  constructor() { }

  ngOnInit(): void {
  }

}
