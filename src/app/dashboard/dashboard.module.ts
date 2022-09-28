import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GeneralStatComponent } from './components/general-stat/general-stat.component';
import { LicenseStatComponent } from './components/license-stat/license-stat.component';
import { MonthlyStatComponent } from './components/monthly-stat/monthly-stat.component';
import { DashboardComponent } from './dashboard.component';
import { RouterModule, Routes } from '@angular/router';
import { MonthSwitcherComponent } from './components/month-switcher/month-switcher.component';
import * as echarts from 'echarts';
import { NgxEchartsModule } from 'ngx-echarts';
import { NgxSpinnerModule } from 'ngx-spinner';

const routes: Routes = [
  { path: '', component: DashboardComponent, data: {
      title: 'Dashboard - CactusManager',
      descript: 'Dashboard - Cactus Manager. View statistics of your business in the current time and for the past months.' 
    } 
  }
]

@NgModule({
  declarations: [
    GeneralStatComponent,
    LicenseStatComponent,
    MonthlyStatComponent,
    DashboardComponent,
    MonthSwitcherComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    NgxEchartsModule.forRoot({echarts,}),
    NgxSpinnerModule
  ]
})
export class DashboardModule { }
