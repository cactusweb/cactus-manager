import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReferralsComponent } from './referrals.component';
import { RouterModule, Routes } from '@angular/router';
import { LicenseViewingModule } from '../licenses/screens/license-viewing/license-viewing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { ToolsModule } from '../tools/tools.module';
import { HeadComponent } from './components/header/header.component';
import { LicenseComponent } from './components/license/license.component';

const routes: Routes = [
  { path: '', component: ReferralsComponent, data: {
      pageName: 'Referral stats', title: 'Referral statistic - CactusManager',
      descript: 'Referral stats - Cactus Manager. Info about referral system. Get started now!'
    }
  }
]

@NgModule({
  declarations: [
    ReferralsComponent,
    HeadComponent,
    LicenseComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    LicenseViewingModule,
    FormsModule,
    ReactiveFormsModule,
    ScrollingModule,
    ToolsModule
  ]
})
export class ReferralsModule { }
